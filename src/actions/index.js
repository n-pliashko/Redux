import * as types from '../constants/actionType'

export const getAllItems = () => dispatch => {
 fetch('http://yii/web/site/item/')
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
  });
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