import React from 'react';
import StarIcon from 'react-icons/lib/md/star-outline'
import UserIcon from 'react-icons/lib/md/account-circle'
import CalendarIcon from 'react-icons/lib/md/date-range'
import UpvoteIcon from 'react-icons/lib/md/thumb-up'
import DownvoteIcon from 'react-icons/lib/md/thumb-down'
import DeleteIcon from 'react-icons/lib/md/delete'
import EditIcon from 'react-icons/lib/md/edit'
import PropTypes from 'prop-types';
import { convertDate } from '../utils/helpers'




export default function Comment ({ comment, onVoteCom, onDeleteCom, onEditCom }) {
  return (
    <div className="comment-wrapper">
      <div key={comment.id} className="comment-block">
        <h4 className="comment-author"><UserIcon className="post-icon" size={'1em'} />{comment.author}</h4>
        <p>{comment.body}</p>
        <div className="comment-icon-bar">
          <CalendarIcon className="post-icon" size={'1em'} /><span className="info-style">{convertDate(comment.timestamp)}</span>
          <StarIcon className="post-icon" size={'1em'} /><span className="vote-style">{comment.voteScore}</span>
          <a href="/" onClick={(e) => {e.preventDefault(); onVoteCom(true)}}>
            <UpvoteIcon className="post-icon" size={'1em'} style={{marginRight:'.3em'}} />
          </a>
          <a href="/" onClick={(e) => {e.preventDefault(); onVoteCom(false)}}>
            <DownvoteIcon className="post-icon" size={'1em'} />
          </a>
          <div className="delete-icon-cont">
            <a href="/" onClick={(e) => {e.preventDefault(); return onDeleteCom()}}>
              <DeleteIcon className="delete-icon-btn action-icon-btn-delete" />
            </a>
            <a href="/" onClick={(e) => {e.preventDefault(); return onEditCom(comment.id)}}>
              <EditIcon className="edit-icon-btn action-icon-btn-edit" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onVoteCom: PropTypes.func.isRequired
}
