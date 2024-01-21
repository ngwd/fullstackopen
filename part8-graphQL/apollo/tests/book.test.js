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
      author {
        name
      }
      published
      genres
    }
  }
`
describe('add books in db', ()=> {
  beforeEach( async () => {
    const mutationPromises = helper.books.map(book => {
      return client.mutate({
        mutation: ADD_BOOK,
        variables: (({ id, ...rest }) => rest)(book)
      })
    })

    await Promise.all(mutationPromises)
      .then(results => {
        const addedBooks = results.map( r => r.data.addBook) 
        console.log('mutation results: ', addedBooks)
      })
      .catch((error) => {
        console.error('Mutation Error:', error);
      });
  })
  test('beforeEach', ()=>{ })
})

afterAll(async() => {
  await mongoose.connection.close()
})