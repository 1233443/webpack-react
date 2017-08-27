/**
 * Created by dfc on 2017/8/25.
 */
const initialState = [];

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_LIST_SUCCESS':
      return [...action.payload];
    default:
      return state;
  }
}