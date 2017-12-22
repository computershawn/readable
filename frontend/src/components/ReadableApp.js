import React, { Component } from 'react';
import Modal from 'react-modal'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import './App.css';
import { addPost, removePost, postsFetchData,
  commentsFetchData, votePost, voteComment,
  addComment, removeComment, adjustCommentCount} from '../actions'
import SinglePost from './SinglePost'
import PostDetail from './PostDetail'
import PostForm from './PostForm'
import { capitalize } from '../utils/helpers'
import AddIcon from 'react-icons/lib/md/add-circle-outline'
import sortBy from 'sort-by'

const uuidv4 = require('uuid/v4');




class ReadableApp extends Component {
  state = {
    currentCategory: null,
    selectedPost: null,
    postModalOpen: false,
    sortMethod: '-timestamp',
    postIsNew: false
  }

  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired
  }

  componentDidMount() {
    // Begin process of getting application data from the API
    this.props.fetchData();
  }

  getPostComments = (postID) => {
    let index = this.props.comments.findIndex(item=>(item.parentId===postID))
    if(index === -1)
      this.props.fetchComments(postID)
    this.setState({
      selectedPost: postID
    })
  }

  handleDeletePost = (postID, category) => {
    // First, delete that post
    this.props.store.dispatch(removePost({ "id" : postID }))
    // Then go back to the category view
    this.setState({
      currentCategory: category,
      selectedPost: null
    })
  }

  // handleEditPost = (postID) => {
  //   //console.log("Editing post " + postID)
  //   //let p = this.props.posts.find((post) => (post.id===postID))
  //   //console.log(p.body)
  //
  // }

  // getEditStatus = () => {
  //   if(this.state.postIsNew) {
  //     console.log("pressed new post button")
  //     return null
  //   } else {
  //     console.log("pressed edit post button")
  //     let existingPost = this.props.posts.find((post) => (post.id===this.state.selectedPost))
  //     return existingPost
  //   }
  // }

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
    this.props.store.dispatch(removeComment({ "id" : comID }))
    this.props.store.dispatch(adjustCommentCount({ "id" : postID, "up" : false }))
  }

  selectCategoryByName = (e) => {
    this.setState({
      currentCategory: e.target.id
    })
  }

  linkBackToCategory = (category) => {
    this.setState({
      currentCategory: category,
      selectedPost: null
    })
  }

  showAllCategories = (e) => {
    this.setState({
      currentCategory: null,
      selectedPost: null
    })
  }

  sortByDate = (event) => {
    event.preventDefault()
    this.setState({
      sortMethod: "-timestamp"
    })
  }

  sortByPop = (event) => {
    event.preventDefault()
    this.setState({
      sortMethod: "-voteScore"
    })
  }

  // openPostModal = (isPostNew) => this.setState(() => ({
  //   postModalOpen: true,
  //   postIsNew: isPostNew
  // }))
  // openPostModal = (isPostNew) => {
  //   this.setState({
  //     postModalOpen: true,
  //     postIsNew: isPostNew
  //   })
  // }
  openPostModal = () => this.setState(() => ({ postModalOpen: true }))
  closePostModal = () => this.setState(() => ({ postModalOpen: false }))
  processNewPost = (evt, postCategory, postAuthor, postTitle, postText) => {
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
    evt.preventDefault()
    this.closePostModal()
  }
  cancelPost = (evt) => {
    this.closePostModal()
    evt.preventDefault()
  }


  processNewComm = (commentData) => {
    console.log('creating new comment:\n' +
      'parent: ' + commentData.parentID +
      '\nauthor: ' + commentData.author +
      '\ntext: ' + commentData.content)

    this.props.store.dispatch(addComment({
      "id" : uuidv4(),
      "parentId" : commentData.parentID,
      "timestamp" : Date.now(),
      "body" : commentData.content,
      "author" : commentData.author
      })
    )
    this.props.store.dispatch(adjustCommentCount({ "id" : commentData.parentID, "up" : true }))
  }

  render() {
    let { categories, posts, comments } = this.props
    let { currentCategory, selectedPost, postModalOpen, sortMethod } = this.state
    return (
      <div className="Readable-App" style={{paddingLeft:'24px', paddingRight:'24px'}}>
        <h2>readable</h2>
        <div className="temp-style">
          <button onClick={this.openPostModal(true)} className="icon-btn">New Post <AddIcon style={{verticalAlign:'-.1em'}}/></button>
        </div>
        <div className="sort-options">
          <span>Sort By | </span>
          <a href="/" onClick={this.sortByDate} className="method">DATE</a>&nbsp;|&nbsp;
          <a href="/" onClick={this.sortByPop} className="method">POPULARITY</a>
        </div>
        <div>
          <div className="posts-wrapper">
            {selectedPost===null && currentCategory===null && <h3>Categories</h3>}
            {
              (selectedPost===null) &&
              categories
                .filter(function(cat) {
                  // If no current category selected, the filter
                  // will allow all categories to display
                  if(currentCategory===null) {
                    return true
                  }
                  // If there is a currently selected category, the
                  // filter will allow only that one to be displayed
                  return (cat.name===currentCategory)
                })
                .map((cat) =>
                  <div key={cat.name} className="cat-container">
                    <h3 className="category-title" id={cat.name} onClick={this.selectCategoryByName}>
                      {currentCategory!==null && <span className="category-prefix">Category | </span>}
                      {capitalize(cat.name)}
                    </h3>
                    {
                      (posts.findIndex(post => (post.category===cat.name && post.deleted===false))===-1) &&
                      <div className="show-all-link"><small>No posts for category <strong>{cat.name}</strong></small></div>
                    }
                    {
                      currentCategory!==null &&
                      <div className="show-all-link"><small onClick={this.showAllCategories}>Show all categories</small></div>
                    }
                    <div>
                      {
                        posts
                        .filter((post) => (post.category===cat.name && post.deleted===false))
                        .sort(sortBy((sortMethod)))
                        .map((post) => <SinglePost key={post.id} className="post-block" post={post}
                          onVote={(postID, option, direction)=>this.placeVote(postID, option, direction)}
                          onSelectPost={postID=>this.getPostComments(postID)}></SinglePost>)
                      }
                    </div>
                  </div>
                )
            }
          </div>
            {
              (posts.length && selectedPost!==null) &&
              <div>
                <PostDetail key={selectedPost} className="post-block"
                  post={posts.find(item=>(item.id===selectedPost))}
                  onVote={(postID, option, v)=>this.placeVote(postID, option, v)}
                  onBackToCat={this.linkBackToCategory}
                  onShowAllCats={this.showAllCategories}
                  postComments={comments.filter(comment=>(comment.parentId===selectedPost&&comment.deleted===false))}
                  handleVoteCom={(comID, option, v)=>this.placeVote(comID, option, v)}
                  handleDeleteCom={(comID, postID)=>this.deleteCom(comID, postID)}
                  onEditPost={this.openPostModal(false)}
                  onDeletePost={(postCategory)=>this.handleDeletePost(selectedPost, postCategory)}
                  onGetCommentData={this.processNewComm}></PostDetail>
              </div>
            }
        </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={postModalOpen}
          contentLabel='Modal'
        >
          {postModalOpen &&
            <PostForm
              // content={this.getEditStatus}
              cats={categories}
              onSubmitNewPost={this.processNewPost}
              onCancelPost={this.cancelPost}></PostForm>}
        </Modal>
      </div>
    );
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
        fetchData: () => dispatch(postsFetchData()),
        fetchComments: (postID) => dispatch(commentsFetchData(postID))
    };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadableApp)
