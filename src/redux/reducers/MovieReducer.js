import {TREDING_DATA} from '../actions/ActionTypes';

const initialState = {
  treding_data: {},
};

const MovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case TREDING_DATA:
      return {...state, treding_data: action.payload};
    default:
      return state;
  }
};

export default MovieReducer;
