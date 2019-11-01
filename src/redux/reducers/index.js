import {combineReducers} from 'redux';

import movie from './MovieReducer';

const reducer = combineReducers({movie});

export default reducer;
