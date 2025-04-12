import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { formatDistanceToNow } from 'date-fns';
import CommentComponent from '../CommentComponent/CommentComponent';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import BlogsNavbar from '../Navbar/Navbar'

dayjs.extend(relativeTime);


const BlogComponent = ({ blog }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [reload, setReload] = useState(false)
  const [isComment, setIsComment] = useState(false)
  const [canOthersReply, setCanOthersReply] = useState(false)
  const [canSeeReplies, setCanSeeReplies] = useState(false)
  const timeAgo = dayjs(blog.createdAt).fromNow();

  useEffect(() => {
    if (reload === true) {
      fetchComments()
      setReload(false)
    }
  }, [reload])

  useEffect(() => {
    fetchComments()
  }, [navigate])

  const addComment = async () => {
    try {
      const response = await fetch(`https://blogit-0mif.onrender.com/api/comments/blog/${id}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify({ comment, canReply: canOthersReply })
      })

      const data = await response.json()
      console.log('response', data)
      setReload(true)
      setComment('')
      setIsComment(false)
      // localStorage.setItem('user', JSON.stringify(data?.newUser))
      // localStorage.setItem('token', data?.token)
      // navigate('/')
    } catch (error) {
      console.log(error)
      // alert('Error while creating blog')
    }
  }
  const handleToggleCanReply = (e) => {
    const { checked } = e.target
    setCanOthersReply(checked)
  }
  const fetchComments = async () => {
    try {
      console.log('blog', blog?._id)
      const response = await fetch(`https://blogit-0mif.onrender.com/api/comments/blog/${id}/getcomments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const data = await response.json()
      console.log('its this', data)
      setComments(data?.comments)
      // setComments(data?.Blogs)
      // localStorage.setItem('user', JSON.stringify(data?.newUser))
      // localStorage.setItem('token', data?.token)
      // navigate('/')
    } catch (error) {
      console.log(error)
      // alert('Error while registering user')

    }

  }
  return (
    <div className='p-2 border border-black rounded'>
      <div className="d-flex justify-content-center">
      <img className='mb-3' style={{ 'width': '99%','height':'500px','objectFit':'cover' }} src={blog?.image} alt="" />
        
        </div>
      <h5>{blog?.title}</h5>
      <p>{blog?.description} </p>
      <p style={{ "color": "grey" }}>{timeAgo}</p>
      <div className="d-flex flex-column">
        <p className='text-secondary'>Comments ({comments?.length}) </p>

        <div className='d-flex gap-2 align-items-center'>
          {comments.length > 0 && ((!canSeeReplies) ? <button className="btn btn-primary btn-sm" onClick={() => { setCanSeeReplies(true) }}>View Comments</button>
            : <button className="btn btn-danger btn-sm" onClick={() => { setCanSeeReplies(false) }}>Hide Comments</button>)}
          {
            !isComment && <button onClick={() => { setIsComment(true) }} className="btn btn-primary btn-sm">Add Comment</button>
          }

        </div>

        {isComment && <Form>
          <Form.Group className="mb-3" controlId="replyText">
            <Form.Label>Comment</Form.Label>
            <Form.Control style={{ 'width': '30vw' }} value={comment} onChange={(e) => { setComment(e.target.value) }} type="text" placeholder="Whats in your mind" />
          </Form.Group>
        </Form>}
        {isComment && <div className="form-check form-switch">
          <input onChange={handleToggleCanReply} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
          <label className="form-check-label mb-2" for="flexSwitchCheckChecked">Can others reply?</label>
        </div>}
        {isComment && <div className="d-flex gap-2">
          <button onClick={() => { setIsComment(false) }} className="btn btn-small btn-danger">Cancel</button>
          <button disabled={comment === ""} onClick={addComment} className="btn btn-small btn-primary">Send</button>
        </div>}

        {canSeeReplies && comments?.map((comment, index) => {
          return (<CommentComponent setReload={setReload} key={comment?._id} comment={comment} />)
        })}
        {/* <div className="d-flex">
        <input type="text" className="m-2" placeholder='Whats in your mind..' />
      </div> */}


      </div>
      {/* <p>{formatDistanceToNow(blog?.createdAt, { addSuffix: true })}</p> */}
    </div>
  )
}

export default BlogComponent
