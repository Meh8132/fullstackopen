import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const BlogListApp = () => {
  const [blogs, setBlogs] = useState([])
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(setBlogs)
  }, [])

  useEffect(() => {
    const storedLogin = localStorage.getItem('loggedInUser')
    if (storedLogin) {
      const parsedUser = JSON.parse(storedLogin)
      blogService.setToken(parsedUser.token)
      setUser(parsedUser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const storedLogin = await loginService.login({ username, password })
      localStorage.setItem('loggedInUser', JSON.stringify(storedLogin))
      blogService.setToken(storedLogin.token)
      setUser(storedLogin)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.create({ title, author, url })
      setBlogs(current => current.concat(createdBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.log(error.message)
    }
  }

  if (user === null) {
    return (
      <>
        <h2>login</h2>
        <form onSubmit={handleLogin}>
          username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)
          } /><br />
          password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)
          } /><br />
          <input type="submit" value="login" />
        </form>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <input type="button" value="logout" onClick={handleLogout} />
      </p>

      <h2>create blog</h2>
      <form onSubmit={handleBlogCreation}>
        title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        /><br />
        author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        /><br />
        url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        /><br />
        <input type="submit" value="create" />
      </form>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
