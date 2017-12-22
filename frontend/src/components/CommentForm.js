import React from 'react';
import PropTypes from 'prop-types';




class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commAuthor: null,
      commText: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static propTypes = {
    onSubmitComm: PropTypes.func.isRequired,
    onCancelComm: PropTypes.func.isRequired
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
    let { onSubmitComm, onCancelComm } = this.props
    let { commAuthor, commText } = this.state
    return (
      <div>
        <h4>New Comment</h4>
        <form onSubmit={(event)=>onSubmitComm(event, commAuthor, commText)}>
          {/* Enter Name */}
          <div className="form-item">
            <label>
              <span className="item-label">Username</span>
              <input className="form-input" name="commAuthor" placeholder="Your username" type="text" onChange={this.handleInputChange} required />
            </label>
          </div>

          {/* Enter Text */}
          <div className="form-item">
            <label>
              <span className="item-label">Text</span>
              <textarea className="form-input" name="commText" placeholder="Text of your comment" onChange={this.handleInputChange} required />
            </label>
          </div>

          <div className="form-item">
            <div className="form-buttons">
              <button type="button" onClick={(event)=>onCancelComm(event)}>Cancel</button>
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}


// const mapStateToProps = (state) => {
//     return {
//       categories: state.categories,
//       posts: state.posts,
//       comments: state.comments,
//     };
// };
// 
// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchData: () => dispatch(postsFetchData()),
//         fetchComments: (postID) => dispatch(commentsFetchData(postID))
//     };
// };
//
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ReadableApp)




export default CommentForm
