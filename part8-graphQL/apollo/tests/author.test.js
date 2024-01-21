const mongoose = require('mongoose')
const helper = require('./test_helper')
const Author = require('../models/author')
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
      born: $born,
    ) {
      name 
      born
    }
  }
`
describe('add author in db', ()=> {
  beforeEach( async () => {
    // await Author.deleteMany({})
    const mutationPromises = helper.authors.map(author => {
      return client.mutate({
        mutation: ADD_AUTHOR,
        variables: (({id, ...rest})=>rest)(author),
      })
    }) 

    await Promise.all(mutationPromises).then(results => {
      const addedAuthors = results.map( r => r.data.addAuthor) 
      console.log('mutation results: ', addedAuthors)
    })
    .catch(error => {
      console.error('mutation errror', error)
    })
  })
  test('before1Each', ()=>{ })
})
describe('validation for author name length ', () => {
  test ('validation', () => {
    client
    .mutate({
      mutation: ADD_AUTHOR,
      variables: {
        name: "Abe",
        born: 1940,
      }
    })
    .then (result => {
      console.log('mutate result', result)
    })
    .catch (error => {
      console.error('mutate failed', error)
    })
  })
})
afterAll(async() => {
  await mongoose.connection.close()
})