import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ReplyComponent = ({ reply }) => {
  const timeAgo = dayjs(reply.repliedAt).fromNow();
  return (
    <div className='d-flex flex-column border border-black rounded p-2 gap-1 m-1'>
      <div className="d-flex gap-2">
        {reply?.userImage && reply?.userImage !== 'pic' ? <img className='rounded-circle' style={{ 'width': '35px', 'height':'35px' }} src={reply?.userImage} alt="" /> : <FaRegCircleUser size={25} />}
        <span><b> {reply?.userName}</b></span>
      </div>
      <div className="d-flex flex-column gap-2">
        <span m-0>{reply?.reply}</span>
      </div>
      <div style = {{"color": "grey"}}>
        {timeAgo}
      </div>
    </div>
  )
}

export default ReplyComponent
