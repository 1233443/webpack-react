/**
 * Created by dfc on 2017/8/25.
 */
import listReducer from './list';
import itemReducer from './item';

export default function rootReducer(state = {}, action) {
  return {
    list: listReducer(state.list, action),
    item: itemReducer(state.item, action)
  };
}