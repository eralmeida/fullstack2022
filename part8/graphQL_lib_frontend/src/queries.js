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
      author {
        name
      }
      published
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation addBook($author: String!, $title: String!, $published: Int!, $genres: [String!]) {
    addBook(author: $author, title: $title, published: $published, genres: $genres) {
      title
      published
      genres
      author {
        name
        bookCount
        born
      }
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
