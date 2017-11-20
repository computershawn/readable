import React, { Component } from 'react';
import StarIcon from 'react-icons/lib/md/star-outline'
import UserIcon from 'react-icons/lib/md/account-circle'
import CalendarIcon from 'react-icons/lib/md/date-range'
import CommentIcon from 'react-icons/lib/md/comment'
import UpvoteIcon from 'react-icons/lib/md/thumb-up'
import DownvoteIcon from 'react-icons/lib/md/thumb-down'
import PropTypes from 'prop-types';
import { convertDate } from '../utils/helpers'
import Comment from './Comment'

class PostDetail extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    postComments: PropTypes.array.isRequired,
    onVote: PropTypes.func.isRequired,
    onBackToCat: PropTypes.func.isRequired,
    onShowAllCats: PropTypes.func.isRequired,
  }

  render() {
    let { post, postComments, onVote, handleVoteCom, onBackToCat, onShowAllCats } = this.props
    return (
      <div className="post-wrapper">
        {<div className="back-links">
          <small onClick={()=>onShowAllCats()}>All Categories</small>&nbsp;&nbsp;|&nbsp;&nbsp;
          <small onClick={()=>onBackToCat(post.category)}>All {post.category} posts</small>
        </div>}
        <div key={post.id} className="post-block">
          <h2 className="post-detail-title">{post.title}</h2>
          <p>{post.body}</p>
          <div className="post-icon-bar">
            <UserIcon className="post-icon" size={'1em'} /><span className="info-style">{post.author}</span>
            <CalendarIcon className="post-icon" size={'1em'} /><span className="info-style">{convertDate(post.timestamp)}</span>
            <CommentIcon className="post-icon" size={'1em'} /><span className="vote-style">{post.commentCount}</span>
            <StarIcon className="post-icon" size={'1em'} /><span className="vote-style">{post.voteScore}</span>
            <UpvoteIcon className="post-icon" size={'1em'} style={{marginRight:'.3em'}} onClick={() => onVote(post.id, 0, true)} />
            <DownvoteIcon className="post-icon" size={'1em'} onClick={() => onVote(post.id, 0, false)} />
          </div>
        </div>
        <div style={{marginLeft:'36px'}}>
          <p><CommentIcon className="post-icon" size={'1.5em'} /></p>
          {
            (postComments.length===0)
              ? <small>There are no comments for this post. And it makes me sad :(</small>
              : postComments.map((comment) => <Comment
                  key={comment.id}
                  className="comment-block"
                  comment={comment}
                  onVoteCom={direction=>handleVoteCom(comment.id, 1, direction)}>{comment.body}</Comment>)
          }
        </div>
      </div>
    )
  }
}

export default PostDetail
