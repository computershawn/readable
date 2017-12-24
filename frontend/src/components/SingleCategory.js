import React, { Component } from 'react'
// import StarIcon from 'react-icons/lib/md/star-outline'
// import UserIcon from 'react-icons/lib/md/account-circle'
// import CalendarIcon from 'react-icons/lib/md/date-range'
// import CommentIcon from 'react-icons/lib/md/comment'
// import UpvoteIcon from 'react-icons/lib/md/thumb-up'
// import DownvoteIcon from 'react-icons/lib/md/thumb-down'
import SinglePost from './SinglePost'
import PropTypes from 'prop-types';
// import { convertDate } from '../utils/helpers'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import { capitalize } from '../utils/helpers'

class SingleCategory extends Component {
  state = {
    sortMethod: '-timestamp',
  }

  // static propTypes = {
  //   post: PropTypes.object.isRequired,
  //   onVote: PropTypes.func.isRequired,
  //   onSelectPost: PropTypes.func.isRequired
  // }
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    categoryPosts: PropTypes.array.isRequired
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

  render() {
    //let { post, onVote, onSelectPost } = this.props
    let { categoryName } = this.props
    let { sortMethod } = this.state
    return (
      <div className="posts-wrapper">
        <h3 className="category-title">
            <span className="category-prefix">Category | </span>{capitalize(categoryName)}
        </h3>
        <div className="nav-options">
          <Link to={"/"}><strong>Show All Categories</strong></Link>
        </div>
        <div className="nav-options">
          <span>Sort By | </span>
          <a href="/" onClick={this.sortByDate}><strong>DATE</strong></a>&nbsp;|&nbsp;
          <a href="/" onClick={this.sortByPop}><strong>POPULARITY</strong></a>
        </div>
        <div>
           {
            this.props.categoryPosts
            .sort(sortBy((sortMethod)))
            .map((post) => <SinglePost key={post.id} className="post-block" post={post}
              onVote={(postID, option, direction)=>this.placeVote(postID, option, direction)}
              onSelectPost={(event,postID)=>this.getPostComments(event,postID)}></SinglePost>)
            }
        </div>
      </div>
    )
  }
}

export default SingleCategory
