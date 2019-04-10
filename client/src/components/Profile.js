import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllArticleByUserId, isLoggedIn, deleteArticle } from "../actionCreator/actions";
import { Link } from "react-router-dom";

class Profile extends Component {

  componentDidMount = () => {
    this.props.dispatch(isLoggedIn())
  }
  
  componentWillMount(){
   const userId = this.props.currentUser._id;
   console.log(userId)
    this.props.dispatch(getAllArticleByUserId(userId));
  }

   handleDelete = (id) => {
      this.props.dispatch(deleteArticle(id, (succeed) => {
        if(succeed){
          this.props.history.push('/')
        }
      }))
    }
  
  render() {
    const {currentUser, currentUserArticles, match} = this.props
    console.log(currentUserArticles)

    return (
      <div className="create-article">

        {
          
          currentUserArticles && currentUserArticles.map(article => (
            <div>
              <h3>{article.title}</h3>
              <p>{article.body}</p>
                <Link to={`/article/${match.params.id}/edit`}>
                  <i className="fas fa-edit" />
                </Link>
                <i className="fas fa-trash" onClick={(id) => this.handleDelete(match.params.id)}/>
            </div>))
          
        }
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUserData,
    currentUserArticles: state.currentUserArticles  
  };
};

export default connect(mapStateToProps)(Profile);
