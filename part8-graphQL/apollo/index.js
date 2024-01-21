const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1:uuid } = require('uuid')
const { mongoose } = require('mongoose')
const Author = require('./models/author')
const Book   = require('./models/book')
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
const getBookCountCache = () => {
  let bookCounts = {}
  for( let b of books) {
    bookCounts[b.author] = (bookCounts[b.author] ?? 0) + 1 
  }
  return bookCounts
}
const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: (root, args) => {
      console.log(args)
      if (args.refreshCache) {
        bookCountCache = getBookCountCache()
      }
      return authors.map(a => ({ ...a, bookCount: bookCountCache?.[a.name]??0 }))
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
    addAuthor: (root, args) => {
      console.log(args)
      const newAuthor = new Author({ ...args })
      return newAuthor.save()
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
  context: async ({ req, res}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('')
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})