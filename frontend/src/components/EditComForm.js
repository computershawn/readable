import React from 'react';
import PropTypes from 'prop-types';




class EditComForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commText: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static propTypes = {
    onSubmitComment: PropTypes.func.isRequired,
    onCancelComment: PropTypes.func.isRequired,
    defaultText: PropTypes.string
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
    let { onSubmitComment, onCancelComment } = this.props
    let { commText } = this.state
    return (
      <div>
        <h4>Edit Comment</h4>
        <form onSubmit={(e)=>{e.preventDefault(); return onSubmitComment(commText)}}>
          {/* Enter Text */}
          <div className="form-item">
            <label>
              <span className="item-label">Text</span>
              <textarea className="form-input" name="commText" defaultValue={this.props.defaultText} onChange={this.handleInputChange} required />
            </label>
          </div>

          <div className="form-item">
            <div className="form-buttons">
              <button type="button" onClick={(e)=>{e.preventDefault(); return onCancelComment()}}>Cancel</button>
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}




export default EditComForm
