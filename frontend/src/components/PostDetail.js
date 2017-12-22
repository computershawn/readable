import React, { Component } from 'react';
import Modal from 'react-modal'
import StarIcon from 'react-icons/lib/md/star-outline'
import UserIcon from 'react-icons/lib/md/account-circle'
import CalendarIcon from 'react-icons/lib/md/date-range'
import CommentIcon from 'react-icons/lib/md/comment'
import UpvoteIcon from 'react-icons/lib/md/thumb-up'
import DownvoteIcon from 'react-icons/lib/md/thumb-down'
import DeleteIcon from 'react-icons/lib/md/delete'
import EditIcon from 'react-icons/lib/md/edit'
import AddIcon from 'react-icons/lib/md/add-circle-outline'
import PropTypes from 'prop-types';
import { convertDate } from '../utils/helpers'
import Comment from './Comment'
import CommentForm from './CommentForm'

class PostDetail extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    postComments: PropTypes.array.isRequired,
    onVote: PropTypes.func.isRequired,
    onBackToCat: PropTypes.func.isRequired,
    onShowAllCats: PropTypes.func.isRequired,
    onEditPost: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired,
    onGetCommentData: PropTypes.func.isRequired
  }

  state = {
    commModalOpen: false
  }

  openCommentModal = () => this.setState(() => ({ commModalOpen: true }))
  closeCommenttModal = () => this.setState(() => ({ commModalOpen: false }))

  handleSubmitComm = (evt, commAuthor, commText) => {
    this.closeCommenttModal()
    evt.preventDefault()
    //console.log("author: " + commAuthor)
    this.props.onGetCommentData(
      {
        "parentID" : this.props.post.id,
        "content" : commText,
        "author" : commAuthor
      })
    // return {
    //   "parentID" : this.props.post.id,
    //   "content" : commText,
    //   "author" : commAuthor
    // }
  }

  cancelComm = (evt) => {
    console.log('cancel this comment')
    this.closeCommenttModal()
    evt.preventDefault()
  }

  render() {
    let { post, postComments, onVote, handleVoteCom, handleDeleteCom, onBackToCat, onShowAllCats, onEditPost, onDeletePost } = this.props
    let { commModalOpen } = this.state
    return (
      <div className="post-wrapper">
        {<div className="back-links">
          <small onClick={()=>onShowAllCats()}>All Categories</small>&nbsp;&nbsp;|&nbsp;&nbsp;
          <small onClick={()=>onBackToCat(post.category)}>All {post.category} posts</small>
        </div>}
        <div key={post.id} className="post-block">
          <h2 className="post-detail-title">
            {post.title}
            <div className="action-icons-cont">
              <div className="action-icon-cont" onClick={()=>onDeletePost(post.category)}>
                <DeleteIcon className="action-icon-btn action-icon-btn-delete" />
              </div>
              <div className="action-icon-cont" onClick={()=>onEditPost(post.category)}>
                <EditIcon className="action-icon-btn action-icon-btn-edit" />
              </div>
            </div>
          </h2>
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
          <p className="comments-sec-title">Comments</p>
          <div>
            <button onClick={()=>this.openCommentModal()} className="icon-btn">Leave a Comment <AddIcon style={{verticalAlign:'-.1em'}}/></button>
          </div>
          {
            (postComments.length===0)
              ? <small>There are no comments for this post. And it makes me sad :(</small>
              : postComments.map((comment) => <Comment
                  key={comment.id}
                  className="comment-block"
                  comment={comment}
                  onVoteCom={direction=>handleVoteCom(comment.id, 1, direction)}
                  onDeleteCom={()=>handleDeleteCom(comment.id, post.id)}>{comment.body}</Comment>)
          }
        </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={commModalOpen}
          contentLabel='Modal'
        >
          {commModalOpen &&
            <CommentForm onSubmitComm={this.handleSubmitComm} onCancelComm={this.cancelComm}></CommentForm>
          }
        </Modal>
      </div>
    )
  }
}

export default PostDetail
