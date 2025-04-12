import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'


const BlogModal = ({reload, setReload, setBlog, blog, isUpdate, setIsUpdate}) => {

  
  const handleChange = (e)=>{
    const {name, value} = e.target
    setBlog({ ...blog, [name]: value })
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setBlog({ ...blog, image: reader.result })
        console.log('render-image', reader.result)// base64 string
      };
      reader.readAsDataURL(file); // converts file to base64
    }
  };
  
  const decideAction = ()=>{
    if(isUpdate){
      updateBlog()
      setIsUpdate(false)
    }
    else{
      createBlog()
    }
  }
  const createBlog = async () => {
    const { title, description, image} = blog
    // if (!title || !description ) {
    //   alert('Please fill all the fields')
    //   return
    // }

    try {
      const response = await fetch('https://blogit-0mif.onrender.com/api/blogs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify(blog)
      })

      const data = await response.json()
      console.log('response', data)
      setReload(true)
      setBlog({})
      // localStorage.setItem('user', JSON.stringify(data?.newUser))
      // localStorage.setItem('token', data?.token)
      // navigate('/')
    } catch (error) {
      console.log(error)
      // alert('Error while creating blog')
    }
  }
  
  const updateBlog = async () => {
    const { title, description, image} = blog
    // if (!title || !description ) {
    //   alert('Please fill all the fields')
    //   return
    // }

    try {
      const response = await fetch(`https://blogit-0mif.onrender.com/api/blogs/update/${blog?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify(blog)
      })

      const data = await response.json()
      console.log('response', data)
      setReload(true)
      // localStorage.setItem('user', JSON.stringify(data?.newUser))
      // localStorage.setItem('token', data?.token)
      // navigate('/')
    } catch (error) {
      console.log(error)
      // alert('Error while creating blog')
    }
  }

  
  
  return (
    <div className='border border-black p-3 mb-3 rounded' style={{ width: '50%', backgroundColor: 'rgb(238 241 241)' }}>
      <h3>{isUpdate ? 'Update Blog': 'Create a New Blog'}</h3>
      <Form>
      <div className="d-flex flex-column align-items-center gap-2 ">
      {blog?.image && (
          <div style={{}} className='rounded-circle'>
            <img className='rounded-circle' src={blog?.image} alt="Preview" style={{ width: '200px', height: '200px' }} />
          </div>
        )}
        <Form.Group className="d-flex" controlId="formImage">
              {/* <div className="d-flex"> */}
                
              <Form.Label className='btn btn-primary btn-sm'> {!blog?.image ? 'Upload ProfilePic' : 'Update'} </Form.Label>
              <input
                style={{ display: 'none' }}
                id='formImage'
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {/* </div> */}
        
            </Form.Group>
        </div>
      <Form.Group className="mb-3" controlId="blogTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control value={blog?.title} name='title'  onChange={handleChange} type="email" placeholder="Enter Title" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="blogDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control value={blog?.description} name='description' onChange={handleChange} type="text" placeholder="Enter description" />
      </Form.Group>
      
      <Button onClick={decideAction} variant="primary">
        {isUpdate? 'Update' : 'Create'}
      </Button>
    </Form>
    </div>
  )
}

export default BlogModal
