import React, { Component } from 'react'
import StarIcon from 'react-icons/lib/md/star-outline'
import UserIcon from 'react-icons/lib/md/account-circle'
import CalendarIcon from 'react-icons/lib/md/date-range'
import CommentIcon from 'react-icons/lib/md/comment'
import UpvoteIcon from 'react-icons/lib/md/thumb-up'
import DownvoteIcon from 'react-icons/lib/md/thumb-down'
import DeleteIcon from 'react-icons/lib/md/delete'
import EditIcon from 'react-icons/lib/md/edit'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { convertDate } from '../utils/helpers'




class SinglePost extends Component {
  state = {
  }

  static propTypes = {
    post: PropTypes.object.isRequired,
    onVote: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
  }

  render() {
    let { post, onVote, onDelete, onEdit } = this.props
    return (
        <div>
          <div key={post.id} className="post-block">
            <h4 className="post-title"><Link to={"/" + post.category + "/" + post.id}>{post.title}</Link>            
              <div className="action-icons-cont">
                <div className="action-icon-cont">
                  <a href="/" onClick={e=>{e.preventDefault(); onDelete()}}>
                    <DeleteIcon className="action-icon-btn action-icon-btn-delete" />
                  </a>
                </div>
                <div className="action-icon-cont">
                  <a href="/" onClick={e=>{e.preventDefault(); onEdit()}}>
                    <EditIcon className="action-icon-btn action-icon-btn-edit" />
                  </a>
                </div>
              </div>
            </h4>            
            <div className="post-icon-bar">
              <UserIcon className="post-icon" size={'1em'} /><span className="info-style">{post.author}</span>
              <CalendarIcon className="post-icon" size={'1em'} /><span className="info-style">{convertDate(post.timestamp)}</span>
              <CommentIcon className="post-icon" size={'1em'} /><span className="vote-style">{post.commentCount}</span>
              <StarIcon className="post-icon" size={'1em'} /><span className="vote-style">{post.voteScore}</span>
              <UpvoteIcon className="post-icon" size={'1em'} style={{marginRight:'.3em'}} onClick={() => onVote(0, true)} />
              <DownvoteIcon className="post-icon" size={'1em'} onClick={() => onVote(0, false)} />
            </div>
          </div>
        </div>
    )
  }
}

export default SinglePost
