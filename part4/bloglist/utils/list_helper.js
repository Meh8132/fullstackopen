/* eslint-disable no-unused-vars */
const dummy = (blogEntries) => 1

const totalLikes = blogEntries => blogEntries.reduce((likesTotal, { likes }) => likesTotal + likes, 0)

const favoriteBlog = (blogEntries) => {
  if (blogEntries.length === 0) {
    return null
  }

  const favorite = blogEntries.reduce((currentFavorite, candidateBlog) => (
    candidateBlog.likes > currentFavorite.likes ? candidateBlog : currentFavorite
  ), blogEntries[0])

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogEntries) => {
  if (blogEntries.length === 0) {
    return null
  }

  const authorBlogs = {}

  blogEntries.forEach(({ author }) => {
    authorBlogs[author] = (authorBlogs[author] ?? 0) + 1
  })

  const authors = Object.keys(authorBlogs)
  const mostFrequentAuthor = authors.reduce((previousAuthor, currentAuthor) => (
    authorBlogs[currentAuthor] > authorBlogs[previousAuthor] ? currentAuthor : previousAuthor
  ), authors[0])

  return {
    author: mostFrequentAuthor,
    blogs: authorBlogs[mostFrequentAuthor],
  }
}

const mostLikes = (blogEntries) => {
  if (blogEntries.length === 0) {
    return null
  }

  const authorLikes = {}

  blogEntries.forEach(({ author, likes }) => {
    authorLikes[author] = (authorLikes[author] ?? 0) + likes
  })

  const authors = Object.keys(authorLikes)
  const topLikeAuthor = authors.reduce((previousAuthor, currentAuthor) => (
    authorLikes[currentAuthor] > authorLikes[previousAuthor] ? currentAuthor : previousAuthor
  ), authors[0])

  return {
    author: topLikeAuthor,
    likes: authorLikes[topLikeAuthor],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}