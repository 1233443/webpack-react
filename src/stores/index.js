/**
 * Created by dfc on 2017/8/25.
 */
import {createStore} from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);
  return store;
}