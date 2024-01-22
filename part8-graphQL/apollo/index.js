const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1:uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const { mongoose } = require('mongoose')
const Author = require('./models/author')
const Book   = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('connect to MongoDB')
})
.catch((error) => {
  console.log('error during connecting', error.message)
})

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    me: User
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book
  {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]! 
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors(refreshCache: Boolean): [Author!]!
  }
  type Mutation {
    createUser (
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addAuthor(
      name: String!,
      born: Int,
    ): Author
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
  }
`

let bookCountCache = null
const getBookCountCache = async () => {
  let bookCounts = {}
  const books = await Book.find({}).populate('author')
  for( let b of books) {
    bookCounts[b.author.name] = (bookCounts[b.author.name] ?? 0) + 1 
  }
  return bookCounts
}
const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: async (root, { refreshCache = true }) => {
      if (refreshCache) {
        bookCountCache = await getBookCountCache()
      }

      const authors = await Author.find({})
      const newObjs = authors.map(a => {
        const t = a.toJSON()
        return { ...t, bookCount: bookCountCache?.[a.name]??0 }
      })
      return newObjs 
    },
    allBooks: async (root, args) => {
      const conditions = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author})
        if (author) {
          conditions["author"] = author._id.toString() 
        }
      }
      if (args.genre) {
        conditions["genres"] = {"$all" : [args.genre]}
      }
      const books = await Book.find(conditions)
      return books
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return user.save() 
        .catch(error => {
          throw new GraphQLError('create new user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user||args.password!=='secret') {
        throw new GraphQLError('wrong credential', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value : jwt.sign(userForToken, process.env.SECRET) }
    },
    addAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      console.log(args)
      const newAuthor = new Author({ ...args })
      try {
        await newAuthor.save()
        return newAuthor
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    },
    addBook: async (root, args) => {
      const author = await Author.findOne({name: args.author})
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
        args.author = newAuthor
      } else {
        args.author = author
      }
      const newBook = new Book({ ...args })
      return newBook.save()
    },
    editAuthor: (root, args) => {
      let result = null
      for(let i = 0; i < authors.length; ++i) {
        if (authors[i].name === args.name) {
          authors[i] = { ...authors[i], born: args.setBornTo}
          result = authors[i]
        }
      }
      return result
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})