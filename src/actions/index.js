/**
 * Created by dfc on 2017/8/25.
 */
import fetch from 'isomorphic-fetch';

export function fetchList() {
  return (dispatch) => {
    return fetch('/api/list')
      .then(res => res.json())
      .then(json => dispatch({type: 'FETCH_LIST_SUCCESS', payload: json}));
  }
}

export function fetchItem(id) {
  return (dispatch) => {
    if (!id) return Promise.resolve();
    return fetch(`/api/item/${id}`)
      .then(res => res.json())
      .then(json => dispatch({type: 'FETCH_ITEM_SUCCESS', payload: json}));
  }
}