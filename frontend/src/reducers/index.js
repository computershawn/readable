import { combineReducers } from 'redux'

 import {
   POSTS_FETCH_DATA_SUCCESS,
   ADD_POST,
   REMOVE_POST,
   // UPVOTE_ITEM,
   // DOWNVOTE_ITEM,
   VOTE_POST,
   CATS_FETCH_DATA_SUCCESS,
   COMMENTS_FETCH_DATA_SUCCESS,
   ADD_COMMENT,
   REMOVE_COMMENT,
   // UPVOTE_COMMENT,
   // DOWNVOTE_COMMENT,
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

    // case UPVOTE_ITEM :
    //   console.log(action)
    //   index = state.findIndex((item)=>(item.id===id))
    //   tempCopy = state.slice()
    //   tempCopy[index]["voteScore"] += 1
    //   return tempCopy
    //
    // case DOWNVOTE_ITEM :
    //   index = state.findIndex(function(item){return item.id===id})
    //   tempCopy = state.slice()
    //   tempCopy[index]["voteScore"] -= 1
    //   return tempCopy

    case VOTE_POST :
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
      return [...state, {[id] : { id,parentId,timestamp,body,author,voteScore,deleted,parentDeleted }}]

    case REMOVE_COMMENT :
      index = state.findIndex(item=>(item.id===id))
      tempCopy = state.slice()
      tempCopy[index]["deleted"] = true
      return tempCopy

    // case UPVOTE_COMMENT :
    //   index = state.findIndex(item=>(item.id===id))
    //   tempCopy = state.slice()
    //   tempCopy[index]["voteScore"] += 1
    //   return tempCopy
    //
    // case DOWNVOTE_COMMENT :
    //   index = state.findIndex(item=>(item.id===id))
    //   tempCopy = state.slice()
    //   tempCopy[index]["voteScore"] -= 1
    //   return tempCopy

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


// function calendar (state = initialCalendarState, action) {
//   const { day, recipe, meal } = action
//
//   switch (action.type) {
//     case ADD_RECIPE :
//       return {
//         ...state,
//         [day]: {
//           ...state[day],
//           [meal]: recipe.label,
//         }
//       }
//     case REMOVE_FROM_CALENDAR :
//       return {
//         ...state,
//         [day]: {
//           ...state[day],
//           [meal]: null,
//         }
//       }
//     default :
//       return state
//   }
// }
//
// export default combineReducers ({
//   food,
//   calendar
// })


//
// function food (state = {}, action) {
//   switch (action.type) {
//     case ADD_RECIPE :
//       const { recipe } = action
//
//       return {
//         ...state,
//         [recipe.label]: recipe,
//       }
//     default :
//       return state
//   }
// }
//
// const initialCalendarState = {
//   sunday: {
//     breakfast: null,
//     lunch: null,
//     dinner: null,
//   },
//   monday: {
//     breakfast: null,
//     lunch: null,
//     dinner: null,
//   },
//   tuesday: {
//     breakfast: null,
//     lunch: null,
//     dinner: null,
//   },
//   wednesday: {
//     breakfast: null,
//     lunch: null,
//     dinner: null,
//   },
//   thursday: {
//     breakfast: null,
//     lunch: null,
//     dinner: null,
//   },
//   friday: {
//     breakfast: null,
//     lunch: null,
//     dinner: null,
//   },
//   saturday: {
//     breakfast: null,
//     lunch: null,
//     dinner: null,
//   },
// }

// const initialPostsStateTEMP2 = {
//   "react": {
//     path: 'react',
//     posts: {
//       "8xf0y6ziyjabvozdd253nd": {
//         id: '8xf0y6ziyjabvozdd253nd',
//         timestamp: 1467166872634,
//         title: 'Hey suckas, Udacity is the best place to learn React',
//         body: 'Everyone says so after all.',
//         author: 'thingtwo',
//         category: 'react',
//         voteScore: 6,
//         deleted: false,
//         commentCount: 2,
//         comments: {
//             "894tuq4ut84ut8v4t8wun89g": {
//               id: '894tuq4ut84ut8v4t8wun89g',
//               parentId: "8xf0y6ziyjabvozdd253nd",
//               timestamp: 1468166872634,
//               body: 'Hi there! I am a COMMENT.',
//               author: 'thingtwo',
//               voteScore: 6,
//               deleted: false,
//               parentDeleted: false
//             },
//             "8tu4bsun805n8un48ve89": {
//               id: '8tu4bsun805n8un48ve89',
//               parentId: "8xf0y6ziyjabvozdd253nd",
//               timestamp: 1469479767190,
//               body: 'Comments. Are. Cool.',
//               author: 'thingone',
//               voteScore: -5,
//               deleted: false,
//               parentDeleted: false
//             },
//         },
//       },
//     },
//   },
//   "redux": {
//     path: 'redux',
//     posts: {
//       "6ni6ok3ym7mf1p33lnez": {
//         id: '6ni6ok3ym7mf1p33lnez',
//         timestamp: 1468479767190,
//         title: 'Learn Redux in 10 minutes!',
//         body: 'Just kidding. It takes more than 10 minutes to learn technology.',
//         author: 'thingone',
//         category: 'redux',
//         voteScore: -5,
//         deleted: false,
//         commentCount: 0,
//         comments: null,
//       },
//       "7mi6ok3ym7mf1p33lnez": {
//         id: '7mi6ok3ym7mf1p33lnez',
//         timestamp: 1468479767270,
//         title: 'This Is Another Post',
//         body: 'Body text for this post WTF',
//         author: 'J-Dilla',
//         category: 'redux',
//         voteScore: 259,
//         deleted: false,
//         commentCount: 0,
//         comments: null,
//       },
//     },
//   },
//   "udacity": {
//     path: 'udacity',
//     posts: {
//       "8li6ok3ym7mf1p33lnez": {
//         id: '8li6ok3ym7mf1p33lnez',
//         timestamp: 1468479767370,
//         title: 'This Is a Post About Udacity',
//         body: 'Body text for this udacity post',
//         author: 'Shigeto',
//         category: 'udacity',
//         voteScore: 100,
//         deleted: false,
//         commentCount: 0,
//         comments: null,
//       },
//     },
//   },
//   "design": {
//     path: 'design',
//     posts: {
//       "9ki6ok3ym7mf1p33lnez": {
//         id: '9ki6ok3ym7mf1p33lnez',
//         timestamp: 1468479767470,
//         title: 'This Is a Post About Design',
//         body: 'Body text for this design post',
//         author: 'Nosaj Thing',
//         category: 'design',
//         voteScore: 1000,
//         deleted: false,
//         commentCount: 0,
//         comments: null,
//       },
//     }
//   },
//   "music": {
//     path: 'music',
//     posts: {
//       "0ji6ok3ym7mf1p33lnez": {
//         id: '0ji6ok3ym7mf1p33lnez',
//         timestamp: 1468479767570,
//         title: 'This Is a Post About Music',
//         body: 'Body text for this music post',
//         author: 'the Steoples',
//         category: 'music',
//         voteScore: 6969,
//         deleted: false,
//         commentCount: 0,
//         comments: null,
//       },
//     },
//   }
// }


// const initialPostsStateTEMP = {
//   posts: {
//     "8xf0y6ziyjabvozdd253nd": {
//       id: '8xf0y6ziyjabvozdd253nd',
//       timestamp: 1467166872634,
//       title: 'Udacity is the best place to learn React!',
//       body: 'Everyone says so after all.',
//       author: 'thingtwo',
//       category: 'react',
//       voteScore: 6,
//       deleted: false,
//       commentCount: 20000,
//     },
//     "6ni6ok3ym7mf1p33lnez": {
//       id: '6ni6ok3ym7mf1p33lnez',
//       timestamp: 1468479767190,
//       title: 'Learn Redux in 10 minutes!',
//       body: 'Just kidding. It takes more than 10 minutes to learn technology.',
//       author: 'thingone',
//       category: 'redux',
//       voteScore: -5,
//       deleted: false,
//       commentCount: 0,
//     },
//   }
// }
