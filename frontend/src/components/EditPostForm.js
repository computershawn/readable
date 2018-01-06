import React from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '../utils/helpers'
import { Route } from 'react-router-dom'


class EditPostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postCategory: this.props.post.category,
      postAuthor: this.props.post.author,
      postTitle: this.props.post.title,
      postText: this.props.post.body,
    };

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static propTypes = {
    onSubmitEdit: PropTypes.func.isRequired,
    onCancelEdit: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
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
    const { postText, postTitle } = this.state
    const { post, onSubmitEdit, onCancelEdit } = this.props

    return (
        <Route render={(props) => {
          let postID = post.id
          let category = post.category
          let title = post.title
          let text = post.body
          let author = post.author

          return (
          <form onSubmit={event=>onSubmitEdit(event, postID, postTitle, postText)}>
            <h3>Edit<span style={{fontWeight:'400'}}> {title}</span></h3>
            <small>Category: {capitalize(category)}&nbsp;&nbsp;|&nbsp;&nbsp;Author: {capitalize(author)}</small>


            {/* Enter Title */}
            <div className="form-item">
              <label>
                <span className="item-label">Title</span>
                <input className="form-input" name="postTitle" defaultValue={title} type="text" onChange={this.handleInputChange} required />
              </label>
            </div>

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
