import { ITEMS_LIST_REQUEST, LOAD_NEXT_ITEMS, LOAD_PREVIOUS_ITEMS } from '../constants/actionType'

const initialState = {
  skip: 0,
  limit: 50
}

const skip = (state = initialState.skip, action) => {
  switch (action.type) {
    case LOAD_PREVIOUS_ITEMS: {
      const {pagination} = action;
      return (state > 0) ? state - pagination.limit : 0
    }
    case LOAD_NEXT_ITEMS: {
      const {pagination} = action;
      return state + pagination.limit
    }
    default: {
      return state;
    }
  }
}

const limit = (state = initialState.limit, action) => {
  return state;

}

export const getSkip = state => state.skip
export const getLimit = state =>  state.limit

const pagination = (state = initialState , action) => {
  switch (action.type) {
    case ITEMS_LIST_REQUEST: {
      return initialState;
    }
    default:
      return {
        skip: skip(state.skip, action),
        limit: limit(state.limit, action)
      }
  }
}

export default pagination