import { combineReducers } from 'redux'
import { ITEMS_LIST_SUCCESS } from '../constants/actionType'

const items = (state, action) => {
  switch (action.type) {
    case ITEMS_LIST_SUCCESS:
      return {
        ...state
      }
    default:
      return state;
  }
}

const itemById = (state = {}, action) => {
  switch (action.type) {
    case ITEMS_LIST_SUCCESS:
      return {
        ...state,
        ...action.items.reduce((obj, item) => {
          obj[item.id] = item
          return obj
        }, {})
      }
    default:
      const { productId } = action
      if (productId) {
        return {
          ...state,
          [productId]: items(state[productId], action)
        }
      }
      return state
  }
}

const itemIds = (state = [], action) => {
  switch (action.type) {
    case ITEMS_LIST_SUCCESS:
      return action.items.map(item => item.id)
    default:
      return state
  }
}


export default combineReducers({
  itemById,
  itemIds
})


export const getItem = (state, id) =>
  state.itemById[id]

export const getItems = state =>
  state.itemIds.map(id => getItem(state, id))