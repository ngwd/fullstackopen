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

let authors = [
  /*
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
  */
]

/*
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  /*
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
  */
]

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
    authorCount: () => authors.length,
    bookCount: () => books.length,
    // allAuthors: (_, { refreshCache = false }) => {
    // allAuthors: (_, { refreshCache }) => {
    allAuthors: (root, args) => {
      console.log(args)
      if (args.refreshCache) {
        bookCountCache = getBookCountCache()
      }
      return authors.map(a => ({ ...a, bookCount: bookCountCache?.[a.name]??0 }))
    },
    allBooks: (root, args) => {
      return books.filter(b => 
        (!args.author || b.author === args.author) && 
        (!args.genre  || b.genres.includes(args.genre)))

      /*
      if (!args.author && !args.genre)
        return books
      else if (args.author && !args.genre)
        return books.filter(b => b.author === args.author)
      else if (!args.author && args.genres)
        return books.filter(b => b.genres.includes(args.genre))
      else 
        return books.filter(b => b.genres.includes(args.genre) && b.author === args.author)
      */
    }
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