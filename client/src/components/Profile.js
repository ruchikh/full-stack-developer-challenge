import React, { Component } from "react";
import { connect } from "react-redux";
import { postArticle, getArticle, readArticles, isLoggedIn } from "../actionCreator/actions";
import { Link } from "react-router-dom";

class Profile extends Component {
  

  render() {
    

    return (
      <div className="create-article">
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles,
    currentUser: state.currentUserData
  };
};

export default connect(mapStateToProps)(Profile);
