const mongoose = require('mongoose')
const helper = require('./test_helper')
const Author = require('../models/book')
const { ApolloClient, InMemoryCache, gql, createHttpLink } = require('@apollo/client/core')
const { fetch } = require('node-fetch')

const client = new ApolloClient({
  link:createHttpLink({
    uri:'http://localhost:4000',
    fetch,
  }),
  cache: new InMemoryCache(),
})

const ADD_AUTHOR= gql`
  mutation addAuthor(
    $name: String!, 
    $born: Int,
  )
  {
    addAuthor(
      name: $name, 
      born: $born
    ) {
      name 
      born
    }
  }
`
describe('add author in db', ()=> {
  beforeEach( async () => {
    /*
    const bookObjs = helper.books.map(b => new Book((({ id, ...rest }) => rest)(b)))
    const promiseArray = bookObjs.map(b => client.mutate({
      mutation: ADD_BOOK,
      variables: {...b}
    }))
    await Promise.all(promiseArray)
    */
    await client
      .mutate({
        mutation: ADD_AUTHOR,
        variables: {
          name: 'Costa Cuta',
          // born: 2000,
        },
      })
      .then((result) => {
        console.log('Mutation Result:', result.data.addBook);
      })
      .catch((error) => {
        console.error('Mutation Error:', error);
      });
  })
  test('beforeEach1', ()=>{ })
})

afterAll(async() => {
  await mongoose.connection.close()
})