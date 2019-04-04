import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Articles from "./components/Articles";
import ArticleDetails from "./components/ArticleDetails";
import EditArticle from "./components/EditArticle";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="header">
            <div>
              <Link to="/" className="app-name">
                Blog
              </Link>
            </div>
            <div>
              <Header />
            </div>
          </div>
          <Switch>
            <Route path="/" exact component={Articles} />
            <Route path="/article/:id" exact component={ArticleDetails} />
            <Route path="/article/:id/edit" exact component={EditArticle} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
