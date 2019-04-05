const url = "http://localhost:8000/api";

export function postArticle(data, cb) {
  return dispatch => {
    fetch(`${url}/article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "POST_ARTICLE", data: data.article });
        cb(true);
      });
  };
}

export function getArticle() {
  return dispatch => {
    fetch(`${url}/article`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch({ type: "ALL_ARTICLES", data: data.allArticles });
      });
  };
}

export function singleArticleDetails(id) {
  return dispatch => {
    fetch(`${url}/article/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "TARGET_ARTICLE", data: data[0] });
      });
  };
}

export function deleteArticle(id, cb){
  return dispatch => {
    fetch(`${url}/article/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json()).then(articles => {
      console.log(articles, "delete Article")
      dispatch({
        type: "ALL_ARTICLES",
        articles
      })
      cb(true)
    })
  }
}

export function rePostArticle(data, id, cb) {
  return dispatch => {
    fetch(`${url}/article/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => cb(true));
  };
}


/*user Action*/

export const signUpAction = (data) => {
    return (dispatch) => {
      fetch(`${url}/signup`, {
        method : "POST", 
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
          console.log(data)
        if(data.responseStatus === '200') {
          dispatch({type: 'SIGNUP_SUCCESS', data})
        } else {
          dispatch({type: 'SIGNUP_ERR', data})
        }
      })
    }
  }

  export const logInAction = (data, cb) => {
    return (dispatch) => {
      fetch(`${url}/login`, {
        method : "POST", 
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.user._id) {
          dispatch({type: 'LOGIN_SUCCESS', data: data.user});
          localStorage.setItem('userInfo', JSON.stringify(data.user))
          cb(true)
        } else {
          dispatch({type: 'LOGIN_ERR', data})
          cb(false)
        }
      })
    }
    
  }

  export function isLoggedIn() {
    return dispatch => {
      fetch(`/api/isLoggedIn`)
      .then(res => res.json())
      .then(data => {
        dispatch({type: 'LOGIN_SUCCESS', data: data.user})
      })
    }
  }
  export function loggedOut(cb) {
    return dispatch => {
      fetch('/api/logout').then(res => res.json())
      .then(data => {
        dispatch({type: 'LOGOUT_SUCCESS', data})
        cb(true)
      })
    }
  }