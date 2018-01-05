import React, { Component } from 'react'
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
import PropTypes from 'prop-types'
import { convertDate } from '../utils/helpers'
import Comment from './Comment'
import CommentForm from './CommentForm'
import EditComForm from './EditComForm'
import CategoryNav from './CategoryNav'
import { Route } from 'react-router-dom'
import sortBy from 'sort-by'


class PostDetail extends Component {
  state = {
    commentNewModalOpen: false,
    commentEditModalOpen: false,
    commentBeingEdited: null
  }

  static propTypes = {
    cats: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    postComments: PropTypes.array.isRequired,
    onVote: PropTypes.func.isRequired,
    onEditPost: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired,
    }

  // Control the New Comment modal
  openCommentModal = () => this.setState(() => ({ commentNewModalOpen: true }))
  closeCommentModal = () => this.setState(() => ({ commentNewModalOpen: false }))

  // Control the Edit Comment modal
  openEditComModal = (commentID) => {this.setState(() => ({
    commentBeingEdited: commentID,
    commentEditModalOpen: true }))}
  closeEditComModal = () => this.setState(() => ({ commentEditModalOpen: false }))


  render() {
    let { cats, post, postComments, onVote, onDeletePost, handleVoteCom, handleDeleteCom, handleNewCom, handleEditCom, onEditPost } = this.props
    let { commentNewModalOpen, commentEditModalOpen, commentBeingEdited } = this.state
    return (
      <Route render={({history}) => (
        <div className="post-wrapper">
          <CategoryNav categoryList={cats} />
          {post.deleted === false && <div><div key={post.id} className="post-block">
            <h2 className="post-detail-title">
              {post.title}
              <div className="action-icons-cont">
                <div className="action-icon-cont">
                  <a href="/" onClick={e=>{e.preventDefault(); onDeletePost(); history.push("/" + post.category)}}>
                    <DeleteIcon className="action-icon-btn action-icon-btn-delete" />
                  </a>
                </div>
                <div className="action-icon-cont">
                  <a href="/" onClick={e=>{e.preventDefault(); onEditPost(post.id)}}>
                    <EditIcon className="action-icon-btn action-icon-btn-edit" />
                  </a>
                </div>
              </div>
            </h2>
            <p>{post.body}</p>
            <div className="post-icon-bar">
              <UserIcon className="post-icon" size={'1em'} /><span className="info-style">{post.author}</span>
              <CalendarIcon className="post-icon" size={'1em'} /><span className="info-style">{convertDate(post.timestamp)}</span>
              <CommentIcon className="post-icon" size={'1em'} /><span className="vote-style">{post.commentCount}</span>
              <StarIcon className="post-icon" size={'1em'} /><span className="vote-style">{post.voteScore}</span>
              <UpvoteIcon className="post-icon" size={'1em'} style={{marginRight:'.3em'}} onClick={() => onVote(0, true)} />
              <DownvoteIcon className="post-icon" size={'1em'} onClick={() => onVote(0, false)} />
            </div>
          </div>
          <div style={{marginLeft:'36px'}}>
            <p className="comments-sec-title">Comments</p>
            <div>
              <button onClick={(e)=>{e.preventDefault(); this.openCommentModal()}} className="icon-btn">Leave a Comment <AddIcon style={{verticalAlign:'-.1em'}}/></button>
            </div>
            {
              (postComments.length===0)
                ? <p>This post has no comments :(</p>
                : postComments.sort(sortBy(("-timestamp")))
                  .map((comment) =>
                    <Comment
                      key={comment.id}
                      className="comment-block"
                      comment={comment}
                      onVoteCom={direction=>handleVoteCom(comment.id, 1, direction)}
                      onDeleteCom={()=>handleDeleteCom(comment.id, post.id)}
                      onEditCom={(commentID)=>this.openEditComModal(commentID)}>
                      {comment.body}
                    </Comment>)
            }
          </div>
        </div>
        }


        {post.deleted && <div><p className="post-deleted">This post has been deleted</p></div>}


        {/* -------- New Comment Modal -------- */}
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={commentNewModalOpen}
          ariaHideApp={false}
          contentLabel='Modal'>
          {commentNewModalOpen &&
            <CommentForm
              cats={cats}
              onSubmitComment={(author, text)=>{this.closeCommentModal(); return handleNewCom(author, text, post.id)}}
              onCancelComment={this.closeCommentModal}>
            </CommentForm>}
        </Modal>


        {/* -------- Edit Comment Modal -------- */}
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={commentEditModalOpen}
          ariaHideApp={false}
          contentLabel='Modal'>
          {commentEditModalOpen &&
            <EditComForm
              cats={cats}
              defaultText={postComments.find((com)=>(com.id===commentBeingEdited)).body}
              onSubmitComment={(text)=>{this.closeEditComModal(); return handleEditCom(commentBeingEdited, text)}}
              onCancelComment={this.closeEditComModal}>
            </EditComForm>}
        </Modal>
        </div>
      )}/>
    )
  }
}




export default PostDetail
