import React, { Component } from "react";
import { connect } from "react-redux";
import { loggedOut, getAllArticleByUserId } from "../actionCreator/actions";
import { Link } from "react-router-dom";

class Header extends Component {

  handleLogout = () => {
    console.log("logout")
    this.props.dispatch(loggedOut((succeed) => {
      if(succeed){
        this.props.push.history('/login');
      }
    }));
  }

  // hadleProfile = (userId) => {
  //   console.lof("handleUserprofile")
  //   this.props.dispatch(getAllArticleByUserId(userId))
  // }
   render() {
    const { currentUser } = this.props;
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
        <Link to="profile"><span className="username">{currentUser.username[0].toUpperCase()}</span></Link>
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
