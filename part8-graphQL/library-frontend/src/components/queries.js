import { gql } from '@apollo/client'
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      author,
      published,
    }
  }
`
export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
  ){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author,
      published,
      genres,
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!,
    $password: String!
    ) {
      login(username: $username, password: $password) {
        value
      }
    }
`
export const SET_AUTHOR_BORN = gql`
  mutation setAuthorBorn(
    $id: String!,
    $born: Int!
  ){
    editAuthor(
      id: $id,
      setBornTo: $born 
    ) {
      id,
      name,
      born,
    }
  }
`
export const ALL_AUTHORS = gql`
  query ($refreshCache: Boolean){
    allAuthors (refreshCache: $refreshCache) {
      id,
      name,
      born,
      bookCount,
    }
  }
`