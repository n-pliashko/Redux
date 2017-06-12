import { combineReducers } from 'redux'
import cart, * as fromCart from './cart'
import items, * as fromItem from './items'

export default combineReducers({
  items,
  cart
})
const getItem = (state, id) => fromItem.getItem(state.items, id)
const getAddedItemId = state => fromCart.getAddedItemId(state.cart)
const getQtyItem = (state, id) => fromCart.getQtyItem(state.cart, id)


export const getTotal = state =>
  getAddedItemId(state).reduce((total, id) =>
    total + getItem(state, id).price * getQtyItem(state, id), 0
  ).toFixed(2)

export const getCartItems = state =>
  getAddedItemId(state).map(id => ({
      ...getItem(state, id),
      quantity: getQtyItem(state, id)
    })
  )