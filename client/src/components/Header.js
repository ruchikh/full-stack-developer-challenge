import React, { Component } from "react";
import { connect } from "react-redux";
import { loggedOut } from "../actionCreator/actions";
import { Link } from "react-router-dom";

class Header extends Component {

  handleLogout = () => {
    console.log("logout")
    this.props.dispatch(loggedOut((succeed) => {
      if(succeed){
        localStorage.removeItem("userInfo");
        this.props.push.history('/');
      }
    }));
  }

   render() {
    const { currentUser } = this.props;
    console.log(currentUser)
    return (
      <div>
      
      {

      	(Object.keys(currentUser).length === 0) ? 
      	<div className="header-links">
	      	<Link to='/login'>
	      		Login
	      	</Link>
	      	<Link to='/signup'>
	      		Signup
	      	</Link>
      	</div> : <div><button onClick={this.handleLogout}>Logout</button></div>

      }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUserData
  };
};

export default connect(mapStateToProps)(Header);
