import React from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '../utils/helpers'
import { Route } from 'react-router-dom'


class PostForm extends React.Component {
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
    cats: PropTypes.array.isRequired,
    onSubmitPost: PropTypes.func.isRequired,
    onCancelPost: PropTypes.func.isRequired
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
    const { postCategory, postAuthor, postTitle, postText } = this.state
    const { cats, onSubmitPost, onCancelPost } = this.props

    return (
        <Route render={(props) =>
          <form onSubmit={event=>onSubmitPost(event, postCategory, postAuthor, postTitle, postText)}>
            <h3>New Post</h3>
            {/* Select Category */}
            <div className="form-item">
              <label>
                <span className="item-label">Category</span>
                <select className="form-input" name="postCategory" value={this.state.value} onChange={this.handleInputChange} required>
                  <option value="">--Select--</option>
                  {
                    cats.map((cat) => <option value={cat.name} key={cat.name}>{capitalize(cat.name)}</option>)
                  }
                </select>
              </label>
            </div>

            {/* Enter Name */}
            <div className="form-item">
              <label>
                <span className="item-label">Username</span>
                <input className="form-input" name="postAuthor" placeholder="Your username" type="text" onChange={this.handleInputChange} required />
              </label>
            </div>

            {/* Enter Title */}
            <div className="form-item">
              <label>
                <span className="item-label">Title</span>
                <input className="form-input" name="postTitle" placeholder="Title of your post" type="text" onChange={this.handleInputChange} required />
              </label>
            </div>

            {/* Enter Text */}
            <div className="form-item">
              <label>
                <span className="item-label">Text</span>
                <textarea className="form-input" name="postText" placeholder="Text of your post" onChange={this.handleInputChange} required />
              </label>
            </div>

            <div className="form-item">
              <div className="form-buttons">
                <button type="button" onClick={(event)=>onCancelPost(event)}>Cancel</button>
                <input type="submit" value="Submit" />
              </div>
            </div>
          </form>
              }/>
    );
  }
}

export default PostForm
