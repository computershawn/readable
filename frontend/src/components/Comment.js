import React from 'react';
import StarIcon from 'react-icons/lib/md/star-outline'
import UserIcon from 'react-icons/lib/md/account-circle'
import CalendarIcon from 'react-icons/lib/md/date-range'
import UpvoteIcon from 'react-icons/lib/md/thumb-up'
import DownvoteIcon from 'react-icons/lib/md/thumb-down'
import DeleteIcon from 'react-icons/lib/md/delete'
import PropTypes from 'prop-types';
import { convertDate } from '../utils/helpers'




export default function Comment ({ comment, onVoteCom }) {
  return (
    <div className="comment-wrapper">
      <div key={comment.id} className="comment-block">
        <h4 className="comment-author"><UserIcon className="post-icon" size={'1em'} />{comment.author}</h4>
        <p>{comment.body}</p>
        <div className="post-icon-bar">
          <CalendarIcon className="post-icon" size={'1em'} /><span className="info-style">{convertDate(comment.timestamp)}</span>
          <StarIcon className="post-icon" size={'1em'} /><span className="vote-style">{comment.voteScore}</span>
          <UpvoteIcon className="post-icon" size={'1em'} style={{marginRight:'.3em'}} onClick={() => onVoteCom(true)} />
          <DownvoteIcon className="post-icon" size={'1em'} onClick={() => onVoteCom(false)} />
          <DeleteIcon className="post-icon" size={'1em'} onClick={() => {console.log("about to delete this")}} />          
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onVoteCom: PropTypes.func.isRequired
}
