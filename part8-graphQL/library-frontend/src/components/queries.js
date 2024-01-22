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
    $published: String!,
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