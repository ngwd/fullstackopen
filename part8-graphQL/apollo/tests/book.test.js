const mongoose = require('mongoose')
const helper = require('./test_helper')
const Book = require('../models/book')
const { ApolloClient, InMemoryCache, gql, createHttpLink } = require('@apollo/client/core')
const { fetch } = require('node-fetch')

const client = new ApolloClient({
  link:createHttpLink({
    uri:'http://localhost:4000',
    fetch,
  }),
  cache: new InMemoryCache(),
})

const ADD_BOOK = gql`
  mutation addBook (
    $title: String!, 
    $author: String!, 
    $published: Int!, 
    $genres: [String!]!,
  ) 
  {
    addBook(
      title: $title, 
      author: $author, 
      published: $published, 
      genres: $genres,
    ) {
      title
      author
      published
      genres
    }
  }
`
describe('add books in db', ()=> {
  beforeEach( async () => {
    await client
      .mutate({
        mutation: ADD_BOOK,
        variables: {
          title: 'Sample Book',
          author: 'Joshua Kerievsky',
          published: 2022,
          genres: ['Fiction', 'Adventure'],
        },
      })
      .then((result) => {
        console.log('Mutation Result:', result.data.addBook);
      })
      .catch((error) => {
        console.error('Mutation Error:', error);
      });
  })
  test('beforeEach2', ()=>{ })
})

afterAll(async() => {
  await mongoose.connection.close()
})