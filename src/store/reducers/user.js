import {
  SET_USER,
  REMOVE_USER,
} from '../actions/actionTypes';
import { updateObject } from '../../utility/AppUtil';

const initialState = {
  user: '',
};

const setUser = (state, action) => {
  return updateObject(state, { user: action.user });
};

const removeUser = (state) => {
  return updateObject(state, { user: {} });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return setUser(state, action);
    case REMOVE_USER:
      return removeUser(state);
    default:
      return state;
  }
};

export default reducer;
