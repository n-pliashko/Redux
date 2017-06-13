import { combineReducers } from 'redux'
import cart, * as fromCart from './cart'
import items, * as fromItem from './items'
import pagination, * as fromPagination from './pagination'

export default combineReducers({
  items,
  cart,
  pagination
})
const getItem = (state, id) => fromItem.getItem(state.items, id)
const getAddedItemId = state => fromCart.getAddedItemId(state.cart)
const getQtyItem = (state, id) => fromCart.getQtyItem(state.cart, id)

const getLimit = state => fromPagination.getLimit(state.pagination)
const getSkip = state => fromPagination.getSkip(state.pagination)

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

export const getPagination = state => ({
  limit: getLimit(state),
  skip: getSkip(state)
})