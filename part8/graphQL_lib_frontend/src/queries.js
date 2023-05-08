import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($author: String!, $title: String!, $published: Int!, $genres: [String!]) {
    addBook(author: $author, title: $title, published: $published, genres: $genres) {
      title
      published
      genres
      author
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($author: String!, $setBornTo: Int!) {
    editAuthor(author: $author, setBornTo: $setBornTo) {
      name
      born
    }
  }
`
