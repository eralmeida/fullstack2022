var _ = require('lodash')

const dummy = () => 1
const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}
const favoriteBlog = (blogs) => {
  let blog = blogs.reduce((max, curr) => (max.likes > curr.likes ? max : curr), {})
  const subset = (({ title, author, likes }) => ({ title, author, likes }))(blog)
  return subset
}

const mostBlogs = (blogs) => {
  if (blogs && blogs.length) {
    let result = _.chain(blogs)
      .countBy(function (x) {
        return x.author
      })
      .map((v, k) => ({
        author: k,
        blogs: v,
      }))
      .sortBy('blogs')
      .last()
      .value()

    return result
  } else {
    return {}
  }
}

const mostLikes = (blogs) => {
  if (blogs && blogs.length) {
    let result = _.chain(blogs)
      .reduce((result, value) => {
        result[value.author] = result[value.author] ? result[value.author] + value.likes : value.likes
        return result
      }, {})
      .map((v, k) => ({ author: k, likes: v }))
      .sortBy('likes')
      .last()
      .value()

    return result
  } else {
    return {}
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
