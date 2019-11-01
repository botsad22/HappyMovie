import {TREDING_DATA} from '../actions/ActionTypes';
import {get} from '../../utils/httpRequest';

export const get_treding = url => async dispatch => {
  try {
    const response = await get(url);
    dispatch({type: TREDING_DATA, payload: response});
  } catch (error) {
    throw error;
  }
};

export const get_next_treding = () => async (dispatch, getState) => {
  const {treding_data} = getState().movie;
  const {collection} = treding_data.items;
  try {
    const response = await get(treding_data.pagination.next_page);
    collection.push.apply(collection, response.items.collection);
    response.items.collection = collection;
    dispatch({type: TREDING_DATA, payload: response});
  } catch (error) {
    throw error;
  }
};
