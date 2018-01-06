import React, { Component } from 'react'
import PropTypes from 'prop-types';




class SortToggle extends Component {
  static propTypes = {
    method: PropTypes.string.isRequired,
    onChangeSort: PropTypes.func.isRequired,
    isCurrent: PropTypes.bool.isRequired
  }
  
  state = {
    direction: 0,
  }
  
  toggleDirection = () => {
    let temp = (this.state.direction == 0) ? 1 : 0
    this.setState({
      direction: temp
    })
  }

  render() {
    let { method, onChangeSort, isCurrent } = this.props
    let { direction } = this.state
    return (
      <span className={!isCurrent ? 'faded' : null}>
        <a href='/' onClick={(e)=>{ e.preventDefault(); this.toggleDirection(); onChangeSort(direction) }}>
          { method }&nbsp;
          {
            ( direction==0 ) ? <span>&#8675;</span> : <span>&#8673;</span>
          }
        </a>
      </span>
    )
  }
}

export default SortToggle
