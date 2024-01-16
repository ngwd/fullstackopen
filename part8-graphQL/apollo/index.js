const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1:uuid } = require('uuid')

let authors = [
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
]

/*
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
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
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
  }
  type Author1 {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book
  {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]! 
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors1: [Author1!]!
    allAuthors: [Author!]!
  }
  type Mutation {
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

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allAuthors: () => authors,
    allAuthors1: () => {
      const bookCount = {}
      for( let b of books) {
        bookCount[b.author] = (bookCount[b.author] ?? 0) + 1 
      }
      return authors.map(a => ({ ...a, bookCount: bookCount[a.name] ?? 0 }))
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
    addBook: (root, args) => {
      const author = args.author
      if (!authors.find(a => a.name === author)) {
        authors = authors.concat({ name: author, id:uuid() })
      }
      const newBook = { ...args, id:uuid() }
      books = books.concat(newBook)
      return newBook
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
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})