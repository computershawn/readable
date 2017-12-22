import { combineReducers } from 'redux'

 import {
   POSTS_FETCH_DATA_SUCCESS,
   ADD_POST,
   REMOVE_POST,
   VOTE_POST,
   ADJUST_COUNT,
   CATS_FETCH_DATA_SUCCESS,
   COMMENTS_FETCH_DATA_SUCCESS,
   ADD_COMMENT,
   REMOVE_COMMENT,
   VOTE_COMMENT
 } from '../actions'


function posts (state = [], action) {
  let index, tempCopy

  const { id, timestamp, title, body, author, category,
          voteScore, deleted, commentCount, up } = action

  switch (action.type) {
    case POSTS_FETCH_DATA_SUCCESS :
      return action.posts

    case ADD_POST :
      return [...state, { id,timestamp,title,body,author,category,voteScore,deleted,commentCount }]

    case REMOVE_POST :
      index = state.findIndex((item)=>(item.id===id))
      tempCopy = state.slice()
      tempCopy[index]["deleted"] = true
      return tempCopy

    case VOTE_POST :
      index = state.findIndex(function(item){return item.id===id})
      tempCopy = state.slice()
      if(up) {
        tempCopy[index]["voteScore"] += 1
      } else {
        tempCopy[index]["voteScore"] -= 1
      }
      return tempCopy

    case ADJUST_COUNT :
      index = state.findIndex(function(item){return item.id===id})
      tempCopy = state.slice()
      if(up) {
        tempCopy[index]["commentCount"] += 1
      } else {
        tempCopy[index]["commentCount"] -= 1
      }
      return tempCopy

    default:
      return state
  }
}

function categories (state = {}, action) {
  switch (action.type) {
    case CATS_FETCH_DATA_SUCCESS :
      return action.categories

    default:
      return state
  }
}


function comments (state = [], action) {
  let index, tempCopy

  const { id, parentId, timestamp, body, author,
    voteScore, deleted, parentDeleted, up } = action

  switch (action.type) {
    case COMMENTS_FETCH_DATA_SUCCESS :
      return [...state, ...action.comments]


    case ADD_COMMENT :
      return [...state, { id,parentId,timestamp,body,author,voteScore,deleted,parentDeleted }]

    case REMOVE_COMMENT :
      index = state.findIndex(item=>(item.id===id))
      tempCopy = state.slice()
      tempCopy[index]["deleted"] = true
      return tempCopy

    case VOTE_COMMENT :
      index = state.findIndex(function(item){return item.id===id})
      tempCopy = state.slice()
      if(up) {
        tempCopy[index]["voteScore"] += 1
      } else {
        tempCopy[index]["voteScore"] -= 1
      }
      return tempCopy

    default:
      return state
  }
}


export default combineReducers ({
  categories,
  posts,
  comments
})
