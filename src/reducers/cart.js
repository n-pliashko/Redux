import { ADD_TO_CART,
  CLEAR_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE } from '../constants/actionType'

const initialState = {
  qtyItem: {},
  addedItemId: []
}


const addedItemId = (state = initialState.addedItemId, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      if (state.indexOf(action.itemId) !== -1) {
        return state
      }
      return [...state, action.itemId]
    }
    default:
      return state;
  }
}

const qtyItem = (state = initialState.qtyItem, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const {itemId} = action;
      return {
        ...state,
        [itemId] : (state[itemId] || 0) + 1
      }
    }
    default:
      return state;
  }
}


export const getAddedItemId = state => state.addedItemId

export const getQtyItem = (state, id) =>  state.qtyItem[id] || 0


const cart = (state = initialState , action) => {
  switch (action.type) {
    case CLEAR_CART:
    case CHECKOUT_REQUEST: {
      return initialState;
    }
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        qtyItem: qtyItem(state.qtyItem, action),
        addedItemId: addedItemId(state.addedItemId, action)
      }
  }
}

export default cart