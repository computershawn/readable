export const ADD_POST = 'ADD_POST'
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




// ------------ CATEGORIES-SPECIFIC ACTIONS ------------>
export function catsFetchData() {
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




// ------------ POST-SPECIFIC ACTIONS ------------>
export function postsFetchData() {
  const postsURL = `${process.env.REACT_APP_BACKEND}/posts`;
  return (dispatch) => {
      fetch(postsURL, { headers: { 'Authorization': 'hi-my-name-is-shawn' }} )
        .then(res => res.json())
        .then(posts => {
           for(let post of posts) { dispatch(commentsFetchData(post.id)); return posts }
         })
        .then(posts => dispatch(postsFetchDataSuccess(posts)))
        .then(() => dispatch(catsFetchData()));
  };
}

export function postsFetchDataSuccess(posts) {
    return {
        type: POSTS_FETCH_DATA_SUCCESS,
        posts
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

export function editPost ({ id,body }) {
     return {
       type: EDIT_POST,
       id,
       body
     }
}

export function removePost ({ id }) {
     return {
       type: REMOVE_POST,
       id
     }
}

export function votePost ({ id, up }) {
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

export function addComment ({ id,parentId,timestamp,body,author }) {
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

export function editComment ({ id,body }) {
  return {
    type: EDIT_COMMENT,
    id,
    body
  }
}

export function removeComment ({ id }) {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

export function voteComment ({ id, up }) {
  return {
    type: VOTE_COMMENT,
    id,
    up
  }
}
