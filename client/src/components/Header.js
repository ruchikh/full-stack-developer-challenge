import React, { Component } from "react";
import { connect } from "react-redux";
import { loggedOut } from "../actionCreator/actions";
import { Link } from "react-router-dom";

class Header extends Component {

  handleLogout = () => {
    console.log("logout")
    this.props.dispatch(loggedOut((succeed) => {
      if(succeed){
        // localStorage.removeItem("userInfo");
        this.props.push.history('/login');
      }
    }));
  }

   render() {
    const { currentUser } = this.props;
    console.log(currentUser._id)
    return (
      <div>
      
      {

      	(!currentUser._id) ? 
      	<div className="header-links">
	      	<Link to='/login'>
	      		<i className="fas fa-sign-in-alt"></i>
	      	</Link>
	      	<Link to='/signup'>
	      		<i className="fas fa-user-plus"></i>
	      	</Link>
      	</div> : <div>
        <button onClick={this.handleLogout}><i class="fas fa-sign-out-alt"></i></button>
        <p>{currentUser.username}</p>
        </div>

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
