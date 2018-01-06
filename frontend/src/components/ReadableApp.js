import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './App.css'
import { addPost, editPost, removePost, catsFetchData,
  votePost, voteComment, addComment, editComment,
  removeComment, adjustCommentCount} from '../actions'
import PostDetail from './PostDetail'
import PostForm from './PostForm'
import EditPostForm from './EditPostForm'
import SingleCategory from './SingleCategory'
import CategoryNav from './CategoryNav'
import AddIcon from 'react-icons/lib/md/add-circle-outline'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const uuidv4 = require('uuid/v4')




class ReadableApp extends Component {
  state = {
    postModalOpen: false,
    editModalOpen: false,
    currentPost: null
  }

  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired
  }

  componentDidMount() {
    // Getting application data from the API
    this.props.fetchData()
  }

  // Delete the post
  handleDeletePost = (postID) => {
    this.props.store.dispatch(removePost({ "id" : postID }))
  }

  placeVote = (itemID, option, updown) => {
    switch (option) {
      case 0 :
        this.props.store.dispatch(votePost({ "id" : itemID, "up" : updown }))
        break;
      case 1 :
        this.props.store.dispatch(voteComment({ "id" : itemID, "up" : updown }))
        break;
      default:
        console.log("no vote")
    }
  }

  deleteCom = (comID, postID) => {
    this.props.store.dispatch(adjustCommentCount({ "id" : postID, "up" : false }))
    this.props.store.dispatch(removeComment({ "id" : comID }))
  }

  // Control the New Post modal
  openPostModal = () => this.setState(() => ({ postModalOpen: true }))
  closePostModal = () => this.setState(() => ({ postModalOpen: false }))
  processNewPost = (evt, postCategory, postAuthor, postTitle, postText) => {
    evt.preventDefault()
    let newPostID = uuidv4();  // Generate a UUID
    this.props.store.dispatch(addPost({
      "id" : newPostID,
      "timestamp" : Date.now(),
      "category" : postCategory,
      "author" : postAuthor,
      "title" : postTitle,
      "body" : postText
      })
    )
    this.closePostModal()
  }
  cancelPost = (evt) => {
    this.closePostModal()
    evt.preventDefault()
  }

  // Control the Edit Post modal
  openEditModal = (pID) => this.setState(() => ({
    currentPost: this.props.posts.find((post)=>post.id === pID),
    editModalOpen: true }))
  closeEditModal = () => this.setState(() => ({ editModalOpen: false }))
  processEditPost = (evt, postID, title, body) => {
    evt.preventDefault()
    this.props.store.dispatch(editPost({
      "id" : postID,
      "timestamp" : Date.now(),
      "title" : title,
      "body" : body
      })
    )
    this.closeEditModal()
  }

  cancelEdit = (evt) => {
    evt.preventDefault()
    this.closeEditModal()
  }

  // Submit the New Comment
  processNewComment = (author, text, parentID) => {
    this.props.store.dispatch(addComment({
      "id" : uuidv4(),
      "parentId" : parentID,
      "timestamp" : Date.now(),
      "body" : text,
      "author" : author
    })
  )
  this.props.store.dispatch(adjustCommentCount({ "id" : parentID, "up" : true }))
  }

  // Submit the Edited Comment
  processEditedComment = (commentID, text) => {
    this.props.store.dispatch(editComment({
        "id" : commentID,
        "timestamp" : Date.now(),
        "body" : text,
      })
    )
  }


  render() {
    let { categories, posts, comments } = this.props
    let { postModalOpen, editModalOpen } = this.state
    return (
      <Router>
        <div>
          <div style={{marginLeft:24+'px'}}>
            <h1 className="app-title">Readable</h1>
            <div className="temp-style">
              <button onClick={()=>this.openPostModal()} className="icon-btn">New Post <AddIcon style={{verticalAlign:'-.1em'}}/></button>
            </div>
          </div>

          <Switch>
          {/* -------- App Home Screen -------- */}
          <Route exact path="/" render = {({history}) => (
            categories.map(cat=>(
              <SingleCategory
                key={cat.name}
                cats={categories}
                categoryName={cat.name}
                categoryPosts={posts.filter((post) => (post.category===cat.name && post.deleted===false))}
                viewingAll={true}
                sendVoteUpstream={(postID, option, direction)=>this.placeVote(postID, option, direction)}
                sendUpDeletePost={(postID)=>this.handleDeletePost(postID)}
                sendUpEditPost={(postID)=>this.openEditModal(postID)}
                >
              </SingleCategory>
            ))
          )}/>

          {/* -------- Viewing a Single Category -------- */}
          {
            categories.map(cat=>(
              <Route exact key={cat.name} path={"/"+cat.name} render = {() => (
                <SingleCategory
                  cats={categories}
                  categoryName={cat.name}
                  categoryPosts={posts.filter((post) => (post.category===cat.name && post.deleted===false))}
                  viewingAll={false}
                  sendVoteUpstream={(postID, option, direction)=>this.placeVote(postID, option, direction)}
                  sendUpDeletePost={(postID)=>this.handleDeletePost(postID)}
                  sendUpEditPost={(postID)=>this.openEditModal(postID)}
                  >
                </SingleCategory>
              )}/>
            ))
          }

          {/* -------- Post Detail Screen -------- */}
          {
            posts.map(post=>(
              <Route exact key={post.id} path={"/"+post.category+"/"+post.id} render = {() => (
                <PostDetail key={post.id} className="post-block"
                  cats={categories}
                  post={post}
                  onVote={(option, v)=>this.placeVote(post.id, option, v)}
                  postComments={comments.filter(comment=>(comment.parentId===post.id&&comment.deleted===false))}
                  handleVoteCom={(comID, option, v)=>this.placeVote(comID, option, v)}
                  onDeletePost={()=>this.handleDeletePost(post.id)}
                  handleDeleteCom={(comID, postID)=>this.deleteCom(comID, postID)}
                  onEditPost={(postID)=>this.openEditModal(postID)}
                  handleNewCom={this.processNewComment}
                  handleEditCom={this.processEditedComment}
                  >
                </PostDetail>
              )}/>
            ))
          }
          <Route render={() => (
            <div className="post-wrapper">
              <CategoryNav categoryList={categories} />
              <div className="not-found">
                <h3>¯\_(ツ)_/¯</h3>
                <h3 className="sorry">Sorry, there's nothing here</h3>
                <p className="nothing-here">
                  Click one of the above categories to browse other posts.
                </p>
              </div>
            </div>
          )}/>

          </Switch>
          {/* -------- New Post Modal -------- */}
            <Modal
              className='modal'
              overlayClassName='overlay'
              isOpen={postModalOpen}
              ariaHideApp={false}
              contentLabel='Modal'>
              {postModalOpen &&
                <PostForm
                  cats={categories}
                  onSubmitPost={this.processNewPost}
                  onCancelPost={this.cancelPost}>
                </PostForm>}
            </Modal>

          {/* -------- Edit Post Modal -------- */}
            <Modal
              className='modal'
              overlayClassName='overlay'
              isOpen={editModalOpen}
              ariaHideApp={false}
              contentLabel='Modal'>
              {editModalOpen &&
                <EditPostForm
                  onSubmitEdit={this.processEditPost}
                  onCancelEdit={this.cancelEdit}
                  post={this.state.currentPost}>
                </EditPostForm>}
            </Modal>

        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      categories: state.categories,
      posts: state.posts,
      comments: state.comments,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(catsFetchData()),
    };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadableApp)
