import { combineReducers } from 'redux'
import { FILTER_REQUEST_SUCCESS } from '../constants/actionType'

const designers = (state, action) => {
  switch (action.type) {
    case FILTER_REQUEST_SUCCESS:
      return {
        ...state
      }
    default:
      return state;
  }
}

const designerById = (state = {}, action) => {
  switch (action.type) {
    case FILTER_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.designers.reduce((obj, designer) => {
          obj[designer.id] = designer
          return obj
        }, {})
      }
    default:
      const { designerID } = action
      if (designerID) {
        return {
          ...state,
          [designerID]: designers(state[designerID], action)
        }
      }
      return state
  }
}

const designerIDs = (state = [], action) => {
  switch (action.type) {
    case FILTER_REQUEST_SUCCESS:
      return action.designers.map(designer => designer.id)
    default:
      return state
  }
}


export default combineReducers({
  designerById,
  designerIDs
})


export const getDesigner = (state, id) =>
  state.designerById[id]

export const getDesigners = state =>
  state.designerIDs.map(id => getDesigner(state, id))