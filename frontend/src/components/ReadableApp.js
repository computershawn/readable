import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import './App.css';
import { addPost, removePost, postsFetchData,
  commentsFetchData, votePost, voteComment} from '../actions'
// import { addPost, removePost, postsFetchData,
//   commentsFetchData, voteItem,
//   upVoteComment, downVoteComment } from '../actions'
import SinglePost from './SinglePost'
import PostDetail from './PostDetail'

const uuidv4 = require('uuid/v4');




class ReadableApp extends Component {
  state = {
    currentCategory: null,
    selectedPost: null
  }

  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired
  }

  componentDidMount() {
    // Begin process of getting application data from the API
    this.props.fetchData();
  }

  setPostViewMode = (postID) => {
    // this.setState({
    //   selectedPost: postID
    // })
  }

  getPostComments = (postID) => {
    let index = this.props.comments.findIndex(item=>(item.parentId===postID))
    if(index === -1)
      this.props.fetchComments(postID)
    this.setState({
      selectedPost: postID
    })
  }

  makeNewPost = () => {
    // Random assortment of post headlines, for funzies
    let headlines = [
      "Star Wars Battlefront 2 heroes come at a substantial cost",
      "The Ninja Turtles are coming to Injustice 2",
      "Early Black Friday deals at Best Buy, Xbox One X bundles and more gaming deals",
      "PUBG dev’s next game is an over-the-top steampunk MMO",
      "Splatoon 2’s next Splatfest pits sci-fi against fantasy",
      "Even Sonic the Hedgehog is going in on loot boxes",
      "Destiny 2 update to deliver 4K, HDR on Xbox One X and PS4 Pro",
      "Wolfenstein 2’s DLC offers a welcome break from B.J. Blazkowicz",
      "The Anti-Defamation League hosted its first game jam",
      "Pokémon Ultra Sun and Ultra Moon somehow make Mimikyu even weirder",
      "New trailers: The Crown, Coco, The Post, Netflix’s Dark, and more",
      "Amazon Echo Plus review: smart home 101",
      "Disney’s streaming service has won, and it hasn’t even launched yet",
      "Mindhunter is Netflix’s most binge-worthy show yet",
      "How Snipperclips went from indie game to Nintendo Switch launch title",
      "It’s time to stop trusting Google search already",
      "Twitter's verification program was a mess from the start",
      "The Verge Holiday Gift Guide 2017",
      "UPS is hoping to convert most of its New York City fleet from diesel to electric",
      "Wikipedia warns that SESTA will strip away protections vital to its existence"
    ]
    let newPostID = uuidv4();  // Generate a UUID
    this.props.store.dispatch(addPost({
      "id" : newPostID,
      "timestamp" : Date.now(),
      "title" : headlines[Math.floor(Math.random()*headlines.length)],
      "body" : "This is the body of the post",
      "author" : "Todd Nobdy",
      "category" : this.props.categories[Math.floor(Math.random()*this.props.categories.length)].name
      })
    )
  }

  removeThisPost = (e) => {
    console.log('About to remove this post: ', e.target.id);
    e.preventDefault()
    this.props.store.dispatch(removePost({
      "id" : e.target.id,
      })
    )
  }

  // placeVote = (itemID, option, vote) => {
  //   switch (option) {
  //     case 0 :
  //       if(vote) {
  //         this.props.store.dispatch(upVoteItem({ "id" : itemID }))
  //       } else {
  //         this.props.store.dispatch(downVoteItem({ "id" : itemID }))
  //       }
  //       break;
  //     case 1 :
  //       if(vote) {
  //         this.props.store.dispatch(upVoteComment({ "id" : itemID }))
  //       } else {
  //         this.props.store.dispatch(downVoteComment({ "id" : itemID }))
  //       }
  //       break;
  //     default:
  //       console.log("no vote")
  //   }
  // }

  placeVote2 = (itemID, option, updown) => {
    switch (option) {
      case 0 :
        this.props.store.dispatch(votePost({ "id" : itemID, "up" : updown }))
        break;
      case 1 :
        this.props.store.dispatch(voteComment({ "id" : itemID, "up" : updown }))
        break;
      default:
        console.log("no vote")
    }
  }

  selectCategoryByName = (e) => {
    this.setState({
      currentCategory: e.target.id
    })
  }

  linkBackToCategory = (category) => {
    this.setState({
      currentCategory: category,
      selectedPost: null
    })
  }

  showAllCategories = (e) => {
    this.setState({
      currentCategory: null,
      selectedPost: null
    })
  }

  render() {
    // Janky ass temporary styles -->
    let tempStyle={
      marginTop:'24px',
      marginLeft:'24px'
    }
    // <-- End temporary styles

    let { categories, posts, comments } = this.props
    let { currentCategory, selectedPost } = this.state
    return (
      <div className="Readable-App">
        <h2 style={{marginLeft:'24px'}}>readable</h2>
        <div style={tempStyle}>
          <button onClick={this.makeNewPost} style={{marginRight:'2em'}}>Make New Post</button>
          <input
            type='text'
            placeholder='Post ID'
            ref={(input) => this.input = input}
          />
          <button onClick={this.removeThisPost}>Remove Post</button>
        </div>

        <div>
          {<button onClick={this.setPostViewMode} style={{marginRight:'2em',marginLeft:'24px'}}>Switch View</button>}
            <div className="posts-wrapper">
              {(selectedPost===null) && <h3>Categories</h3>}
              {
                (selectedPost===null) &&
                categories
                  .filter(function(cat) {
                    // If no current category selected, the filter
                    // will allow all categories to display
                    if(currentCategory===null) {
                      return true
                    }
                    // Otherwise, if there is a currently selected category
                    // the filter will allow only one that to be displayed
                    return (cat.name===currentCategory)
                  })
                  .map((cat) =>
                    <div key={cat.name} className="cat-container">
                      <h3 className="category-title" id={cat.name} onClick={this.selectCategoryByName}>{cat.name}</h3>
                      {currentCategory!==null && <div className="show-all-link"><small onClick={this.showAllCategories}>Show All Categories</small></div>}
                      <div>
                        {
                          posts
                          .filter((post) => (post.category===cat.name && post.deleted===false))
                          .map((post) => <SinglePost key={post.id} className="post-block" post={post}
                            onVote={(postID, option, direction)=>this.placeVote2(postID, option, direction)/*this.placeVote(postID, option, v)*/}
                            onSelectPost={postID=>this.getPostComments(postID)}></SinglePost>)
                        }
                      </div>
                    </div>
                  )
              }
            </div>
            {
              (posts.length && selectedPost!==null) &&
              <div>
                <PostDetail key={selectedPost} className="post-block"
                  post={posts.find(item=>(item.id===selectedPost))}
                  onVote={(postID, option, v)=>this.placeVote2(postID, option, v)}
                  onBackToCat={this.linkBackToCategory}
                  onShowAllCats={this.showAllCategories}
                  postComments={comments.filter(comment=>(comment.parentId===selectedPost))}
                  handleVoteCom={(comID, option, v)=>this.placeVote2(comID, option, v)}></PostDetail>
              </div>
            }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      categories: state.categories,
      posts: state.posts,
      comments: state.comments,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(postsFetchData()),
        fetchComments: (postID) => dispatch(commentsFetchData(postID))
    };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadableApp)
