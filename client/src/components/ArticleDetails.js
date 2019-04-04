import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  singleArticleDetails, deleteArticle
} from "../actionCreator/actions";

class ArticleDetails extends Component {
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.dispatch(singleArticleDetails(id));
  };

  handleDelete = (id) => {
    this.props.dispatch(deleteArticle(id, (succeed) => {
      if(succeed){
        this.props.history.push('/')
      }
    }))
  }


  render() {
    const { article, match, currentUser } = this.props;
    return (
      <div className="article-details">
        <div className="edit-link">
          {
            (Object.keys(currentUser).length !== 0) ? (
              <>
                <Link to={`/article/${match.params.id}/edit`}>
                  <i className="fas fa-edit" />
                </Link>
                <i className="fas fa-trash" onClick={(id) => this.handleDelete(match.params.id)}/>
              </>
            ) : '' 
          }
         
        </div>
        <div className="blog-wrapper">
          <h2>{article.title}</h2>
          <p>{article.body}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.targetArticle,
    currentUser: state.currentUserData
  };
};

export default connect(mapStateToProps)(ArticleDetails);
