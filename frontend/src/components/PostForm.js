import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from '../utils/helpers'




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
    onSubmitNewPost: PropTypes.func.isRequired,
    onCancelPost: PropTypes.func.isRequired,
    content: PropTypes.object
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
    let { onSubmitNewPost, onCancelPost, cats } = this.props
    let { postCategory, postAuthor, postTitle, postText } = this.state
    let author = this.props.content ? this.props.content.author : ""
    let title = this.props.content ? this.props.content.title : ""
    let body = this.props.content ? this.props.content.body : ""
    let cat = this.props.content ? this.props.content.category : ""
    //let author = this.props.content ? this.props.content.author : ""

    return (
      <div>
        <h4>New Post</h4>
        <form onSubmit={(event)=>onSubmitNewPost(event, postCategory, postAuthor, postTitle, postText)}>
          {/* Select Category */}
          <div className="form-item">
            <label>
              <span className="item-label">Category</span>
              <select className="form-input" name="postCategory" value={cat} onChange={this.handleInputChange} required>
              {/* <select className="form-input" name="postCategory" value={this.state.value} onChange={this.handleInputChange} required> */}
                <option value="">--Select--</option>
                {
                  cats.map((cat) => <option value= {cat.name} key={cat.name}>{capitalize(cat.name)}</option>)
                }
              </select>
            </label>
          </div>

          {/* Enter Name */}
          <div className="form-item">
            <label>
              <span className="item-label">Username</span>
              <input className="form-input"
                name="postAuthor"
                placeholder="Your username"
                value={author}
                type="text"
                onChange={this.handleInputChange}
                required />
            </label>
          </div>

          {/* Enter Title */}
          <div className="form-item">
            <label>
              <span className="item-label">Title</span>
              <input className="form-input"
                name="postTitle"
                placeholder="Title of your post"
                value={title}
                type="text"
                onChange={this.handleInputChange}
                required />
            </label>
          </div>

          {/* Enter Text */}
          <div className="form-item">
            <label>
              <span className="item-label">Text</span>
              <textarea className="form-input"
                name="postText"
                placeholder="Text of your post"
                value={body}
                onChange={this.handleInputChange}
                required />
            </label>
          </div>

          <div className="form-item">
            <div className="form-buttons">
              <button type="button" onClick={(event)=>onCancelPost(event)}>Cancel</button>
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}




export default PostForm
