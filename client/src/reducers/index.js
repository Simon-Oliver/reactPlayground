import { combineReducers } from 'redux';

const INITIAL_STATE = {
  loading: true,
  isSignedIn: null,
  userName: null,
  email: null,
  role: null,
  isAuth: false
};

// const loginReducer = (state = INITIAL_STATE, action) => {
//   const { name, email, role } = action.payload;
//   switch (action.type) {
//     case 'SIGN_IN':
//       return { ...state, isSignedIn: true, userName: name, email, role };
//     case 'SIGN_OUT':
//       return { ...state, isSignedIn: false, userId: null };
//     default:
//       return state;
//   }
// };

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ORDER':
      return [...state];
    case 'ADD_ORDER':
      return [...state, action.payload.order];
    default:
      return state;
  }
};

const isAuthReducer = (state = INITIAL_STATE, action) => {
  if (action.type === 'IS_AUTH') {
    const { boolean } = action.payload;
    return { ...state, isAuth: boolean };
  }
  return state;
};

export default combineReducers({
  order: ordersReducer,
  auth: isAuthReducer
});
