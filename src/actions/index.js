import * as types from '../constants/actionType'

export const getAllItems = () => (dispatch, getState) => {
  const {pagination} = getState();
  fetch('http://yii/web/site/item?skip=' + pagination.skip + '&limit=' + pagination.limit)
    .then(response => response.json())
    .then(json => dispatch({
      type: types.ITEMS_LIST_SUCCESS,
      items: json
    })).catch(() => dispatch({
    type: types.ITEMS_LIST_FAILURE,
    items: {}
  }));
}

export const addToCart = itemId => (dispatch, getState) => {
  dispatch({
    type: types.ADD_TO_CART,
    itemId
  })
}

export const checkout = items => (dispatch, getState) => {
  const { cart } = getState()
  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  dispatch({
    type: types.CLEAR_CART,
    cart
  })
}

export const nextItems = (dispatch, state) => {
  console.log(state);
  dispatch({
    type: types.LOAD_NEXT_ITEMS,
    ...state
  })
  dispatch(getAllItems())
}

export const previousItems = (dispatch, state) => {
  dispatch({
    type: types.LOAD_PREVIOUS_ITEMS,
    ...state
  })
  dispatch(getAllItems())
}

export const loadPagination = () =>  dispatch => {
  dispatch({
    type: types.ITEMS_LIST_REQUEST
  })
}