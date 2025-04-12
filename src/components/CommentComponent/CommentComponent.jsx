import React, { useState } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { Button, Form } from 'react-bootstrap';
import ReplyComponent from '../ReplyComponent/ReplyComponent';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
const CommentComponent = ({ comment, setReload }) => {
  const timeAgo = dayjs(comment.commentedAt).fromNow();
  const [isReply, setIsReply] = useState(false)
  const [reply, setReply] = useState('')
  const [showReplies, setShowReplies] = useState(false)

  const handleReply = () => {
    setIsReply(true)
  }
  const handleChange = (e) => {
    setReply(e.target.value)
  }
  const cancelReply = () => {
    setIsReply(false)
  }

  const handleShowReplies = () => {
    setShowReplies(!showReplies)
  }

  const addReplytoComment = async () => {
    try {
      const response = await fetch(`https://blogit-0mif.onrender.com/api/comments/${comment?._id}/reply/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify({ reply })
      })

      const data = await response.json()
      console.log('response', data)
      setReload(true)
      setReply('')
      // setReload(true)
      // localStorage.setItem('user', JSON.stringify(data?.newUser))
      // localStorage.setItem('token', data?.token)
      // navigate('/')
    } catch (error) {
      console.log(error)
      alert('Error while creating blog')
    }
  }
  return (
    <div className='d-flex flex-column border border-black rounded p-2 gap-2 m-2'>
      <div className="d-flex gap-2 align-items-center">
        {comment?.userImage && comment?.userImage !== 'pic' ? <img className='rounded-circle' style={{ 'width': '50px', 'height':'50px' }} src={comment?.userImage} alt="" /> : <FaRegCircleUser size={25} />}
        <span><b>{comment?.userName}</b></span>
      </div>
      <div className="d-flex flex-column gap-2">
        <span m-0>{comment?.comment}</span>
      </div>
      <div className="d-flex flex-column gap-2">
        <span style = {{"color": "grey"}} >{timeAgo}</span>
      </div>
      {comment?.canReply  && <div className="d-flex justify-content-start gap-2">
        {comment?.replies && comment?.replies.length > 0 && !showReplies && <button onClick={handleShowReplies} className="btn btn-primary btn-sm">View Replies</button>}
        {showReplies && <button onClick={handleShowReplies} className="btn btn-primary btn-sm">Hide Replies</button>}
        {!isReply && <button onClick={handleReply} className="btn btn-primary btn-sm">Reply</button>}
      </div>}
      {isReply && <div className="d-flex flex-column p-2 border border-black rounded">
        <Form>
          <Form.Group className="mb-3" controlId="replyText">
            <Form.Label>Reply</Form.Label>
            <Form.Control value={reply} onChange={handleChange} type="text" placeholder="Whats in your mind" />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button onClick={cancelReply} className='btn-sm' variant="danger">
              Cancel
            </Button>
            <Button onClick={addReplytoComment} disabled={reply === ""} className='btn-sm' variant="primary">
              Send
            </Button>
          </div>

        </Form>
      </div>}
      {showReplies && comment?.replies && comment?.replies.length > 0 && <div className="d-flex flex-column gap-2">
        {comment?.replies.map((reply, ind) => {
          return (<ReplyComponent key={ind} reply={reply} />)
        })}
      </div>
      }
      

    </div>
  )
}

export default CommentComponent
