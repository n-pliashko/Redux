import { combineReducers } from 'redux'
import { FILTER_REQUEST_SUCCESS } from '../constants/actionType'

const categories = (state, action) => {
  switch (action.type) {
    case FILTER_REQUEST_SUCCESS:
      return {
        ...state
      }
    default:
      return state;
  }
}

const categoryById = (state = {}, action) => {
  switch (action.type) {
    case FILTER_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.categories.reduce((obj, category) => {
          obj[category.id] = category
          return obj
        }, {})
      }
    default:
      const { categoryId } = action
      if (categoryId) {
        return {
          ...state,
          [categoryId]: categories(state[categoryId], action)
        }
      }
      return state
  }
}

const categoryIds = (state = [], action) => {
  switch (action.type) {
    case FILTER_REQUEST_SUCCESS:
      return action.categories.map(category => category.id)
    default:
      return state
  }
}


export default combineReducers({
  categoryById,
  categoryIds
})


export const getCategory = (state, id) =>
  state.categoryById[id]

export const getCategories = state =>
  state.categoryIds.map(id => getCategory(state, id))