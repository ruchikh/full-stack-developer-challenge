import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  singleArticleDetails, deleteArticle, isLoggedIn, upvotePost
} from "../actionCreator/actions";

class ArticleDetails extends Component {
  state = {
    isRead: false
  }
  
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.dispatch(singleArticleDetails(id));
    this.props.dispatch(isLoggedIn())
  };

  handleUpvote = ( ) => {
    const id = this.props.match.params.id;
    console.log(id,"handleupvote")
    this.props.dispatch(upvotePost(id))

  }

  handleDelete = (id) => {
    this.props.dispatch(deleteArticle(id, (succeed) => {
      if(succeed){
        this.props.history.push('/')
      }
    }))
  }


  render() {
    const { article, match, currentUser } = this.props;
    console.log(article.author,"ArtDetails author")
    return (
      <div className="article-details">
        <div className="edit-link">
          {article.author && (article.author._id === currentUser._id) ? (
              <>
                <Link to={`/article/${match.params.id}/edit`}>
                  <i className="fas fa-edit" />
                </Link>
                <i className="fas fa-trash" onClick={(id) => this.handleDelete(match.params.id)}/>

                
              </>
            ) : '' 
          }
          <div>
            <i onClick={this.handleUpvote} className="fas fa-thumbs-up">Upvote</i>
            <p>{article.upvote && article.upvote.length}</p>
          </div>
         
        </div>
        <div className="blog-wrapper">
          <h2>{article.title}</h2>
          <p>{article.body}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
    article: state.targetArticle,
    currentUser: state.currentUserData,
  };
};

export default connect(mapStateToProps)(ArticleDetails);
