import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogComponent from '../../components/BlogComponent/BlogComponent'
import BlogsTable from '../../components/BlogsTable/BlogsTable'
import BlogModal from '../../components/BlogModal/BlogModal'
import BlogsNavbar from '../../components/Navbar/Navbar'
const Dashboard = () => {
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()
  const [reload, setReload] = useState(false)
  const [ isUpdate, setIsUpdate] = useState(false)
  const[blog, setBlog] = useState({})

  const fetchBlogs = async () => {
    try {
      const response = await fetch('https://blogit-0mif.onrender.com/api/blogs/allBlogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const data = await response.json()
      console.log('response', data)
      setBlogs(data?.Blogs)
      // localStorage.setItem('user', JSON.stringify(data?.newUser))
      // localStorage.setItem('token', data?.token)
      // navigate('/')
    } catch (error) {
      console.log(error)
      // alert('Error while registering user')

    }
  }
  useEffect(() => {
    if (reload === true) {
      fetchBlogs()
      setReload(false)
    }
    
  }, [reload])
  
  useEffect(()=>{
    if(!localStorage.getItem('token') || localStorage.getItem('token') === undefined){
      navigate('/login')
    }
  },[navigate])

  useEffect(() => {
    fetchBlogs()

  }, [navigate])
  return (
    <div>
      <BlogsNavbar/>
    
    <div className='p-2 container-fluid'>
      <h2>Dashboard</h2>
      <BlogModal isUpdate={isUpdate} setIsUpdate={setIsUpdate} setBlog={setBlog} blog={blog} setReload={setReload} reload={reload} />
      <h4>Blogs</h4>
      {/* <div className="d-flex gap-2 flex-wrap justify-content-start">
        
        {blogs?.map((blog, index)=>{
          return (<BlogComponent key={blog?._id} blog={blog} />)
        })}
      </div> */}
      <BlogsTable setBlog={setBlog} setIsUpdate={setIsUpdate} isUpdate={isUpdate} blogs={blogs} setReload={setReload} />
    </div>
    </div>
  )
}

export default Dashboard
