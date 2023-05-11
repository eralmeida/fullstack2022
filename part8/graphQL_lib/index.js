const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const jwt = require('jsonwebtoken')

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
type Book {
   title: String!
   published: Int!
   author: Author!
   genres: [String!]
   id: ID!
}

type Author {
  name: String!
  bookCount: Int!
  born: Int
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

  type Query {
    bookCount: Int!
    authorCount: Int    
    allBooks(genre: String, author: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation{
    addBook(
      author: String!
      title: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      author: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      return books.filter((book) => book.author.name === root.name).length
    },
  },
  Query: {
    bookCount: async () => await Book.countDocuments({}),
    authorCount: async () => await Author.countDocuments({}),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      const books = await Book.find({ ...(author ? { author: author._id } : {}), ...(args.genre ? { genres: args.genre } : {}) }).populate('author')
      return books
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let book = await Book.findOne({ title: args.title })

      if (book) {
        throw new GraphQLError('Book title is not unique', {
          extensions: {
            code: 'GRAPHQL_VALIDATION_FAILED',
          },
        })
      }

      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
        book = new Book({ ...args, author: author })
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (author) {
        author.born = args.setBornTo
        author.save()
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
