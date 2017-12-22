import React, { Component } from 'react'
import StarIcon from 'react-icons/lib/md/star-outline'
import UserIcon from 'react-icons/lib/md/account-circle'
import CalendarIcon from 'react-icons/lib/md/date-range'
import CommentIcon from 'react-icons/lib/md/comment'
import UpvoteIcon from 'react-icons/lib/md/thumb-up'
import DownvoteIcon from 'react-icons/lib/md/thumb-down'
import PropTypes from 'prop-types';
import { convertDate } from '../utils/helpers'




class SinglePost extends Component {
  state = {
  }

  static propTypes = {
    post: PropTypes.object.isRequired,
    onVote: PropTypes.func.isRequired,
    onSelectPost: PropTypes.func.isRequired
  }

  render() {
    let { post, onVote, onSelectPost } = this.props
    return (
      <div key={post.id} className="post-block">
        <h4 className="post-title"><a href="/" onClick={()=>onSelectPost(post.id)}>{post.title}</a></h4>
        <div className="post-icon-bar">
          <UserIcon className="post-icon" size={'1em'} /><span className="info-style">{post.author}</span>
          <CalendarIcon className="post-icon" size={'1em'} /><span className="info-style">{convertDate(post.timestamp)}</span>
          <CommentIcon className="post-icon" size={'1em'} /><span className="vote-style">{post.commentCount}</span>
          <StarIcon className="post-icon" size={'1em'} /><span className="vote-style">{post.voteScore}</span>
          <UpvoteIcon className="post-icon" size={'1em'} style={{marginRight:'.3em'}} onClick={() => onVote(post.id, 0, true)} />
          <DownvoteIcon className="post-icon" size={'1em'} onClick={() => onVote(post.id, 0, false)} />
        </div>
      </div>
    )
  }
}

export default SinglePost
