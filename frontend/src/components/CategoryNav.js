import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom'
import { capitalize } from '../utils/helpers'

class CategoryNav extends Component {
  static propTypes = {
    categoryList: PropTypes.array.isRequired,
  }

  isCurrent = (pathName, category) => {
    if(pathName.split('/')[1] === category) {
      return "cat-current"
    }
    return "cat-not-current"
  }

  render() {
    let { categoryList } = this.props
    return (
      <Route render={(props) =>
        <h3 className="category-title">
            {
            categoryList.map((cat, index)=>(
              <span key={cat.name} className={this.isCurrent(props.location.pathname, cat.name)}>
                <Link to={"/"+cat.name}>
                  {capitalize(cat.name)}
                </Link>
                {(index !== categoryList.length+100) && "  |  "}
              </span>
            ))
          }
          <span className="cat-not-current">
            <Link to={"/"}>
              View All
            </Link>
          </span>
        </h3>
      }/>
    )
  }
}

export default CategoryNav
