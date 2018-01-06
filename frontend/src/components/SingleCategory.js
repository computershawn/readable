import React, { Component } from 'react'
import SinglePost from './SinglePost'
import CategoryNav from './CategoryNav'
import SortToggle from './SortToggle'
import PropTypes from 'prop-types';
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import { capitalize } from '../utils/helpers'

class SingleCategory extends Component {
  state = {
    sortMethod: '-timestamp',
  }

  static propTypes = {
    cats: PropTypes.array.isRequired,
    categoryName: PropTypes.string.isRequired,
    categoryPosts: PropTypes.array.isRequired,
    viewingAll: PropTypes.bool.isRequired,
    sendVoteUpstream: PropTypes.func.isRequired,
    sendUpDeletePost: PropTypes.func.isRequired,
    sendUpEditPost: PropTypes.func.isRequired
  }

  sortByDate = (option) => {
    this.setState({
      sortMethod: (option==0) ? 'timestamp' : '-timestamp'
    })    
  }

  sortByPop = (option) => {
    this.setState({
      sortMethod: (option==0) ? 'voteScore' : '-voteScore'      
    })
  }

  isCurrent = () => {
    return "cat-not-current"
  }

  render() {
    let { cats, categoryName, viewingAll, sendVoteUpstream, sendUpDeletePost, sendUpEditPost } = this.props
    let { sortMethod } = this.state
    return (
      <div className="posts-wrapper">
        {viewingAll &&
          <h3 className="category-title"><Link to={"/"+categoryName}>{capitalize(categoryName)}</Link></h3>
        }
        {!viewingAll &&
          <CategoryNav categoryList={cats} />
        }
        
        {(this.props.categoryPosts.length > 0)
          ?
          <div className="nav-options">
            <span>Sort By&nbsp;&nbsp;&nbsp;</span>
            <SortToggle 
              isCurrent={sortMethod.replace('-','')==='timestamp'}
              method='DATE'
              onChangeSort={(updown)=>this.sortByDate(updown)} />
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <SortToggle
              isCurrent={sortMethod.replace('-','')==='voteScore'}
              method='POPULARITY'
              onChangeSort={(updown)=>this.sortByPop(updown)} />              
          </div>          
          :
          <div className="no-posts">
            <em>No posts for this category</em>
          </div>
        }

        <div>
           {
            this.props.categoryPosts
            .sort(sortBy((sortMethod)))
            .map((post) => <SinglePost key={post.id} className="post-block" post={post}
              onVote={(option, direction)=>sendVoteUpstream(post.id, option, direction)}
              onDelete={()=>sendUpDeletePost(post.id)}
              onEdit={()=>sendUpEditPost(post.id)}></SinglePost>)
            }
        </div>
      </div>
    )
  }
}

export default SingleCategory
