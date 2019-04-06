const initState = {
  articles: [],
  targetArticle: {},
  currentUserData: {},
  currentUserId: '',
  errMsg: ''
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case "ALL_ARTICLES": {
      return {
        ...state,
        articles: action.data
      };
    }
    case "TARGET_ARTICLE": {
      return {
        ...state,
        targetArticle: action.data
      };
    }

   case 'SIGNUP_SUCCESS': {
        return state;
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
          currentUserData: action.data,
          currentUserId: action.data._id
      }
    }
    case 'LOGIN_ERR': {
      return {
          ...state,
          errMsg: action.data
      }
    }
    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        currentUserData: {},
        currentUserId: ''
      }
    }
    case 'READ_ARTICLE': {
      return {
        ...state,
        currentUserData: {},
        currentUserId: ''
      }
    }
    default:
      return state;
  }
}
