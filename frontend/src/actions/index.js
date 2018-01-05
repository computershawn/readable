export const ADD_POST = 'ADD_POST'
//export const ADD_POST_FETCH_SUCCESS = 'ADD_POST_FETCH_SUCCESS'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const VOTE_POST = 'VOTE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADJUST_COUNT = 'ADJUST_COUNT'
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'
export const CATS_FETCH_DATA_SUCCESS = 'CATS_FETCH_DATA_SUCCESS'
export const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS'




const headers = {
  'Accept': 'application/json',
  'Authorization': 'hi-my-name-is-shawn',
  'Content-Type': 'application/json'
}


// ------------ CATEGORIES-SPECIFIC ACTIONS ------------>
// export function catsFetchData() {
//   const catsURL = `${process.env.REACT_APP_BACKEND}/categories`;
//   return (dispatch) => {
//       fetch(catsURL, { headers: { 'Authorization': 'hi-my-name-is-shawn' }} )
//         .then((res) => { return res.json() })
//         .then((catsData) => dispatch(catsFetchDataSuccess(catsData.categories)));
//   };
// }
export function catsFetchData() {
  const catsURL = `${process.env.REACT_APP_BACKEND}/categories`;
  return (dispatch) => {
      fetch(catsURL, { headers: { 'Authorization': 'hi-my-name-is-shawn' }} )
        .then(res => res.json())
        .then(catsData => dispatch(catsFetchDataSuccess(catsData.categories)))
        .then(() => dispatch(postsFetchData()));
  };
}

export function catsFetchDataSuccess(categories) {
    return {
        type: CATS_FETCH_DATA_SUCCESS,
        categories
    };
}




// ------------ POST-SPECIFIC ACTIONS ------------>
// export function postsFetchData() {
//   const postsURL = `${process.env.REACT_APP_BACKEND}/posts`;
//   return (dispatch) => {
//       fetch(postsURL, { headers: { 'Authorization': 'hi-my-name-is-shawn' }} )
//         .then(res => res.json())
//         .then(posts => {
//            for(let post of posts) { dispatch(commentsFetchData(post.id)); return posts }
//          })
//         .then(posts => dispatch(postsFetchDataSuccess(posts)))
//         .then(() => dispatch(catsFetchData()));
//   };
// }
// 
// export function postsFetchDataSuccess(posts) {
//     return {
//         type: POSTS_FETCH_DATA_SUCCESS,
//         posts
//     };
// }

// Get all posts
// Get all comments
export function postsFetchData() {
  const postsURL = `${process.env.REACT_APP_BACKEND}/posts`;
  return (dispatch) => {
      fetch(postsURL, { headers: { 'Authorization': 'hi-my-name-is-shawn' }} )
        .then(res => res.json())
        //.then(posts => {dispatch(postsFetchDataSuccess(posts)); return posts})
        // .then(posts => {
        //   let postsWithComments = posts.filter(post=>(post.commentCount > 0)).map(post=>post.id)
        // //   dispatch(allCommentsFetchData(postsWithComments))
        // //    //for(let post of posts) { dispatch(commentsFetchData(post.id)); return posts }
        // })
        //.then(posts => posts.filter(post=>(post.commentCount > 0)).map(post=>post.id))
        //.then(postsWithComments => dispatch(allCommentsFetchData(postsWithComments)))
        //   dispatch(allCommentsFetchData(postsWithComments))
        //    //for(let post of posts) { dispatch(commentsFetchData(post.id)); return posts }
        //}
        //.then(() => dispatch(catsFetchData()));
        .then(posts => {dispatch(postsFetchDataSuccess(posts)); return posts})
        .then(posts => dispatch(allCommentsFetchData(posts)));        
      }
}

// export function allCommentsFetchData(posts) {
//   let postsWithComments = posts.filter(post=>(post.commentCount > 0)).map(post=>post.id)
//   let commentURLs = postsWithComments.map((postID)=> `${process.env.REACT_APP_BACKEND}/posts/${postID}/comments`)
//   let fetches = commentURLs.map(url => fetch(url, {headers: headers}).then(res => res.json()))
// 
//   // We have to fetch from multiple URLs to get comments from each post
//   Promise.all(fetches)
//     .then(allComments => {
//       let allCommentsFlat = allComments.reduce(
//         (acc, cur) => acc.concat(cur),
//         []
//       );
//       console.log(allCommentsFlat)
//       return allCommentsFlat
//     })
//     //.then((allCommentsFlat) => {return dispatch(commentsFetchDataSuccess(allCommentsFlat))});
// 
//   const catsURL = `${process.env.REACT_APP_BACKEND}/categories`;
//   return (dispatch) => {
//       fetch(catsURL, { headers: { 'Authorization': 'hi-my-name-is-shawn' }} )
//         .then((res) => { return res.json() })
//         .then((catsData) => dispatch(catsFetchDataSuccess(catsData.categories)));
//   };
// }
export function allCommentsFetchData(posts) {
  let postsWithComments = posts.filter(post=>(post.commentCount > 0)).map(post=>post.id)
  let commentURLs = postsWithComments.map((postID)=> `${process.env.REACT_APP_BACKEND}/posts/${postID}/comments`)
  let fetches = commentURLs.map(url => fetch(url, {headers: headers}).then(res => res.json()))
  
  return (dispatch) => {
    // We have to fetch from multiple URLs to get comments from each post
    Promise.all(fetches)
      .then(allComments => 
        allComments.reduce((acc, cur) => 
          acc.concat(cur), [])
      )
      .then(allCommentsFlat => dispatch(commentsFetchDataSuccess(allCommentsFlat)));
  }
}

export function postsFetchDataSuccess(posts) {
    return {
        type: POSTS_FETCH_DATA_SUCCESS,
        posts
    };
}

// export function allCommentsFetchData(postsWithComments) {
//   const postsURL = `${process.env.REACT_APP_BACKEND}/posts`;
//   return (dispatch) => {
//       fetch(postsURL, { headers: { 'Authorization': 'hi-my-name-is-shawn' }} )
//         .then(res => res.json())
//         .then(posts => {
//            for(let post of posts) { dispatch(commentsFetchData(post.id)); return posts }
//          })
//         .then(posts => dispatch(postsFetchDataSuccess(posts)))
//         .then(() => dispatch(catsFetchData()));
//   };
// }



export function addPost({ id,timestamp,title,body,author,category }) {
  const postsURL = `${process.env.REACT_APP_BACKEND}/posts`;
  return (dispatch) => {
      fetch(postsURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          "id": id,
          "timestamp":timestamp,
          "title": title,
          "body": body,
          "author": author,
          "category": category}),
        })
        .then(()=>dispatch(addPostSuccess({ id,timestamp,title,body,author,category })))
  };  
}

export function addPostSuccess ({ id,timestamp,title,body,author,category }) {
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

// export function editPostORIG ({ id,body }) {
//      return {
//        type: EDIT_POST,
//        id,
//        body
//      }
// }

//export function editPost ({ id, timestamp, body }) {
export function editPost ({ id, body }) {
     return {
       type: EDIT_POST,
       id,
       body
     }
}

//export function editPostSuccess ({ id, timestamp, body }) {
export function editPostSuccess ({ id, body }) {
     return {
       type: EDIT_POST,
       id,
       //timestamp,
       body
     }
}

export function removePost({ id }) {
  const postsURL = `${process.env.REACT_APP_BACKEND}/posts/` + id;
  return (dispatch) => {
    fetch(postsURL, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ "id": id }),
      })
      .then(()=>dispatch(removePostSuccess({ id })))
  };  
}

export function removePostSuccess ({ id }) {
     return {
       type: REMOVE_POST,
       id
     }
}

export function votePost ({ id, up }) {
  let option = up ? "upVote" : "downVote"
  const postsURL = `${process.env.REACT_APP_BACKEND}/posts/` + id;
  
  return (dispatch) => {
    fetch(postsURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ "id": id, "option": option }),
      })
      .then(()=>dispatch(votePostSuccess({ id, up })))
  };  
}

export function votePostSuccess ({ id, up }) {
  return {
    type: VOTE_POST,
    id,
    up
  }
}




// ------------ COMMENTS-SPECIFIC ACTIONS ------------>
export function adjustCommentCount ({ id, up }) {
  return {
    type: ADJUST_COUNT,
    id,
    up
  }
}

// export function commentsFetchData(postID) {
//   const commentsURL = `${process.env.REACT_APP_BACKEND}/posts/${postID}/comments`;
//   return (dispatch) => {
//       fetch(commentsURL, { headers: { 'Authorization': 'hi-my-name-is-shawn' }} )
//         .then((res) => { return res.json() })
//         .then((comments) => dispatch(commentsFetchDataSuccess(comments)));
//   };
// }
export function commentsFetchData(postID) {
  const commentsURL = `${process.env.REACT_APP_BACKEND}/posts/${postID}/comments`;
  return (dispatch) => {
      fetch(commentsURL, { headers: { 'Authorization': 'hi-my-name-is-shawn' }} )
        .then((res) => { return res.json() })
        .then((comments) => {return dispatch(commentsFetchDataSuccess(comments))});
  };
}

export function commentsFetchDataSuccess(comments) {
  return {
      type: COMMENTS_FETCH_DATA_SUCCESS,
      comments
  };
}

// export function addCommentORIG ({ id,parentId,timestamp,body,author }) {
//   return {
//     type: ADD_COMMENT,
//     id,
//     parentId,
//     timestamp,
//     body,
//     author,
//     voteScore:0,
//     deleted:false,
//     parentDeleted:false
//   }
// }

export function addComment({ id,parentId,timestamp,body,author }) {
  const postsURL = `${process.env.REACT_APP_BACKEND}/comments`;
  return (dispatch) => {
      fetch(postsURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          "id": id,
          "parentId": parentId,
          "timestamp":timestamp,
          "body": body,
          "author": author}),
        })
        .then(()=>dispatch(addCommentSuccess({ id,parentId,timestamp,body,author })))
  };  
}

export function addCommentSuccess ({ id,parentId,timestamp,body,author }) {
  return {
    type: ADD_COMMENT,
    id,
    parentId,
    timestamp,
    body,
    author,
    voteScore:0,
    deleted:false,
    parentDeleted:false
  }
}

// export function editComment ({ id,body }) {
//   return {
//     type: EDIT_COMMENT,
//     id,
//     body
//   }
// }

export function editComment({ id, timestamp, body }) {
  const postsURL = `${process.env.REACT_APP_BACKEND}/comments/` + id;
  return (dispatch) => {
    fetch(postsURL, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ "timestamp": timestamp, "body": body }),
      })
      .then(()=>dispatch(editCommentSuccess({ id, timestamp, body })))
  };  
}

export function editCommentSuccess ({ id, timestamp, body }) {
  return {
    type: EDIT_COMMENT,
    id,
    timestamp,
    body
  }
}

export function removeComment({ id }) {
  const postsURL = `${process.env.REACT_APP_BACKEND}/comments/` + id;
  return (dispatch) => {
    fetch(postsURL, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ "id": id }),
      })
      .then(()=>dispatch(removeCommentSuccess({ id })))
  };  
}

export function removeCommentSuccess ({ id }) {
     return {
       type: REMOVE_COMMENT,
       id
     }
}

// export function removeComment ({ id }) {
//   return {
//     type: REMOVE_COMMENT,
//     id
//   }
// }

export function voteComment ({ id, up }) {
  let option = up ? "upVote" : "downVote"
  const postsURL = `${process.env.REACT_APP_BACKEND}/comments/` + id;
  
  return (dispatch) => {
    fetch(postsURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ "id": id, "option": option }),
      })
      .then(()=>dispatch(voteCommentSuccess({ id, up })))
  };  
}

export function voteCommentSuccess ({ id, up }) {
  return {
    type: VOTE_COMMENT,
    id,
    up
  }
}
