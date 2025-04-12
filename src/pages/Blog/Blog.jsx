import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlogComponent from '../../components/BlogComponent/BlogComponent'
import BlogsNavbar from '../../components/Navbar/Navbar'
const Blog = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [blog, setBlog] = useState({})

  const fetchBlog = async () => {
    try {
      const response = await fetch(`https://blogit-0mif.onrender.com/api/blogs/getBlog/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      console.log('response', data)
      setBlog(data)
      // setBlog(data?.Blogs)
      // localStorage.setItem('user', JSON.stringify(data?.newUser))
      // localStorage.setItem('token', data?.token)
      // navigate('/')
    } catch (error) {
      console.log(error)
      // alert('Error while registering user')

    }
  }

  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('token') === undefined) {
      navigate('/login')
    }
  }, [navigate])
  
  useEffect(() => {
    fetchBlog()
  }, [navigate])
  return (
    <div className='p-2 container-fluid'>
      <BlogsNavbar />
      {/* <h2>Blog</h2> */}
      <BlogComponent blog={blog} />

    </div>
  )
}

export default Blog
