import React, { Component } from "react";
import { connect } from "react-redux";
import { rePostArticle } from "../actionCreator/actions";

class EditArticle extends Component {
  state = {
    title: "",
    body: ""
  };
  componentDidMount = () => {
    this.setState({
      title: this.props.article.title,
      body: this.props.article.body
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    this.props.dispatch(
      rePostArticle(this.state, id, succeed => {
        if (succeed) {
          this.props.history.push(`/article/${id}`);
        }
      })
    );
  };
  render() {
    const { title, body } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="edite-form">
          <input
            value={title}
            name="title"
            type="text"
            onChange={this.handleChange}
          />
          <textarea
            value={body}
            name="body"
            type="text"
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.targetArticle
  };
};

export default connect(mapStateToProps)(EditArticle);
