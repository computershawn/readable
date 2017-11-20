//export const ADD_RECIPE = 'ADD_RECIPE'
//export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
// export const UPVOTE_ITEM = 'UPVOTE_ITEM'
// export const DOWNVOTE_ITEM = 'DOWNVOTE_ITEM'
export const VOTE_POST = 'VOTE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
// export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
// export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'
export const CATS_FETCH_DATA_SUCCESS = 'CATS_FETCH_DATA_SUCCESS'
export const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS'




// Example code from https://codepen.io/stowball/post/a-dummy-s-guide-to-redux-and-thunk-in-react
// export function itemsFetchData(url) {
//     return (dispatch) => {
//         dispatch(itemsIsLoading(true));
//
//         fetch(url)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw Error(response.statusText);
//                 }
//
//                 dispatch(itemsIsLoading(false));
//
//                 return response;
//             })
//             .then((response) => response.json())
//             .then((items) => dispatch(itemsFetchDataSuccess(items)))
//             .catch(() => dispatch(itemsHasErrored(true)));
//     };
// }




export function postsFetchData() {
  const postsURL = `${process.env.REACT_APP_BACKEND}/posts`;
  return (dispatch) => {
      fetch(postsURL, { headers: { 'Authorization': 'hi-my-name-is-shawn' }} )
        .then((res) => { return res.json() })
        .then((posts) => dispatch(postsFetchDataSuccess(posts)))
        .then(() => dispatch(catsFetchData()));
  };
}

export function postsFetchDataSuccess(posts) {
    return {
        type: POSTS_FETCH_DATA_SUCCESS,
        posts
    };
}

export function catsFetchData() {
  //console.log("getting categories")
  const catsURL = `${process.env.REACT_APP_BACKEND}/categories`;
  return (dispatch) => {
      fetch(catsURL, { headers: { 'Authorization': 'hi-my-name-is-shawn' }} )
        .then((res) => { return res.json() })
        .then((catsData) => dispatch(catsFetchDataSuccess(catsData.categories)));
  };
}

export function catsFetchDataSuccess(categories) {
    return {
        type: CATS_FETCH_DATA_SUCCESS,
        categories
    };
}

export function commentsFetchData(postID) {
  const commentsURL = `${process.env.REACT_APP_BACKEND}/posts/${postID}/comments`;
  return (dispatch) => {
      fetch(commentsURL, { headers: { 'Authorization': 'hi-my-name-is-shawn' }} )
        .then((res) => { return res.json() })
        .then((comments) => dispatch(commentsFetchDataSuccess(comments)));
  };
}

export function commentsFetchDataSuccess(comments) {
  return {
      type: COMMENTS_FETCH_DATA_SUCCESS,
      comments
  };
}

export function addPost ({ id,timestamp,title,body,author,category }) {
     return {
       type: ADD_POST,
       id,
       timestamp,
       title,
       body,
       author,
       category,
       voteScore:0,
       deleted:false,
       commentCount:0
     }
}

export function removePost ({ id }) {
     return {
       type: REMOVE_POST,
       id
     }
}

// export function upVoteItem ({ id }) {
//   return {
//     type: UPVOTE_ITEM,
//     id
//   }
// }
//
// export function downVoteItem ({ id }) {
//   return {
//     type: DOWNVOTE_ITEM,
//     id
//   }
// }

export function votePost ({ id, up }) {
  return {
    type: VOTE_POST,
    id,
    up
  }
}

// export function votePost ({ id, direction }) {
//   return {
//     type: DOWNVOTE_ITEM,
//     id: id,
//     direction: direction
//   }
// }


export function addComment ({ id,parentId,timestamp,body,author,voteScore,deleted,parentDeleted }) {
  return {
    type: ADD_COMMENT,
    id,
    parentId,
    timestamp,
    body,
    author,
    voteScore,
    deleted,
    parentDeleted
  }
}

export function removeComment ({ id }) {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

// export function upVoteComment ({ id }) {
//   return {
//     type: UPVOTE_COMMENT,
//     id
//   }
// }
//
// export function downVoteComment ({ id }) {
//   return {
//     type: DOWNVOTE_COMMENT,
//     id
//   }
// }

export function voteComment ({ id, up }) {
  return {
    type: VOTE_COMMENT,
    id,
    up
  }
}
