import React from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '../utils/helpers'
import { Route } from 'react-router-dom'


class EditPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postCategory: null,
      postAuthor: null,
      postTitle: null,
      postText: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static propTypes = {
    onSubmitEdit: PropTypes.func.isRequired,
    onCancelEdit: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    });
  }

  render() {
    const { postText } = this.state
    const { posts, onSubmitEdit, onCancelEdit } = this.props

    return (
        <Route render={(props) => {
          let thisPost = posts.find((post)=>((props.location.pathname).split('/')[2]===post.id))
          let postID = thisPost.id
          let category = thisPost.category
          let title = thisPost.title
          let text = thisPost.body
          let author = thisPost.author

          return (
          <form onSubmit={event=>onSubmitEdit(event, postID, postText)}>
            <h3>Edit Post<span style={{fontWeight:'400'}}> {title}</span></h3>
            <small>Category: {capitalize(category)}&nbsp;&nbsp;|&nbsp;&nbsp;Author: {capitalize(author)}</small>


            {/* Enter Text */}
            <div className="form-item">
              <label>
                <span className="item-label">Text</span>
                <textarea className="form-input" name="postText" defaultValue={text} onChange={this.handleInputChange} required />
              </label>
            </div>

            <div className="form-item">
              <div className="form-buttons">
                <button type="button" onClick={(event)=>onCancelEdit(event)}>Cancel</button>
                <input type="submit" value="Submit" />
              </div>
            </div>
          </form> )}
              }/>
    );
  }
}

export default EditPostForm
