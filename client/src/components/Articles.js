import React, { Component } from "react";
import { connect } from "react-redux";
import { postArticle, getArticle } from "../actionCreator/actions";
import { Link } from "react-router-dom";

class Articles extends Component {
  state = {
    title: "",
    body: "",
    createArticle: false
  };

  componentDidMount = () => {

    this.props.dispatch(getArticle());
  };
  
  handleTitle = e => {
    this.setState({
      title: e.target.value
    });
  };
  handleChange = e => {
    this.setState({
      body: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(
      postArticle(
        {
          title: this.state.title,
          body: this.state.body
        },
        succeed => {
          if (succeed) {
            this.props.dispatch(getArticle());
          }
        }
      )
    );
    document.querySelector("input").value = "";
    document.querySelector("textarea").value = "";
  };
  handleCreate = () => {
    const { currentUser } = this.props;
    if (Object.keys(currentUser).length !== 0) {
      this.setState({
        createArticle: !this.state.createArticle
      });
    } else {
      this.props.history.push('/login');
    }
  };
  render() {
    const { articles, currentUser } = this.props;
    const { createArticle } = this.state;
    return (
      <div className="create-article">
        <i class="fas fa-plus-circle add-title" onClick={this.handleCreate} />
        <div className="articles">
          <form className="article-form" onSubmit={this.handleSubmit}>
            <h4>Create a Blog</h4>
            {createArticle ? (
              <div>
                <input
                  type="text"
                  placeholder="title"
                  onChange={this.handleTitle}
                  name="title"
                />
                <textarea
                  onChange={this.handleChange}
                  name="body"
                  placeholder="body..."
                />
                <button>Submit</button>
              </div>
            ) : (
              <div />
            )}
          </form>
          <div className="recent-articles">
            <ul>
              <h5>Recent Blogs</h5>
              {articles &&
                articles.map((article, i) => (
                  <li key={i}>
                    <Link
                      to={`/article/${article._id}`}
                      className="article-title"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
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

export default connect(mapStateToProps)(Articles);
