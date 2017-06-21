import { CHOOSE_FILTER, CLEAR_FILTER, NAVIGATION_COMPLETE, REQUEST_SUCCESS } from '../constants/actionType'
import { isHhistoryApiAvailable } from '../reducers'

const initialState = {
  addedFilterId: {}
}

const parseQueryString = queryString => {
  let params = {}, queries, temp, i, l;
  queries = queryString.split("&");
  for (i = 0, l = queries.length; i < l; i++) {
    temp = queries[i].split('=');
    if (temp.length > 1) {
      params[temp[0]] = []
      temp[1].split(',').forEach(id => {
        let val = parseInt(id.trim())
        if (!isNaN(val))
          params[temp[0]].push(val)
        else {
          delete  params[temp[0]]
        }
      });
    }
  }
  return params;
}

const addedFilterId = (state = initialState.addedFilterId, action) => {
  switch (action.type) {
    case REQUEST_SUCCESS: {
      const {min_price, max_price} = action;
      if (state['price_from'] && state['price_to'])
        return state;
      let _min_price = parseFloat(min_price).toFixed(2),
        _max_price = (parseFloat(max_price) + 1).toFixed(2)
      return {...state, price_from: _min_price, price_to: _max_price}
    }
    case CHOOSE_FILTER: {
      const {filterName, filterId, onlyOne} = action;
      if (state[filterName] && !!!onlyOne) {
        let index = state[filterName].indexOf(filterId);
        if (index === -1)
          return {...state, [filterName]: [...state[filterName], filterId]}
        let values = state[filterName]
        values.splice(index, 1)
        return {...state, [filterName]: values}
      }
      return {...state, [filterName]: [filterId]}
    }
    case NAVIGATION_COMPLETE: {
      const {navigation} = action
      let _search = navigation.search.replace(/^\?/, '')
      if (!isHhistoryApiAvailable) {
        _search = navigation.hash.replace(/^#/, '')
      }
      let params = parseQueryString(_search)
      return params
    }
    default:
      return state;
  }
}


const filter = (state = initialState , action) => {
  switch (action.type) {
    case CLEAR_FILTER: {
      const {filterName} = action;
      if (state.addedFilterId[filterName] && filterName !== 'ALL') {
        return {addedFilterId: {...state.addedFilterId, [filterName]: []}}
      }
      return initialState;
    }
    default:
      return {
        addedFilterId: addedFilterId(state.addedFilterId, action)
      }
  }
}

export default filter