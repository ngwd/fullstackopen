import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token-books')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const httplink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httplink)
})

/*
const client = new ApolloClient({
  link:createHttpLink({
    uri:'http://localhost:4000',
    fetch,
  }),
  cache: new InMemoryCache(),
})
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)