import { CHOOSE_FILTER, CLEAR_FILTER, NAVIGATION_COMPLETE, SEARCH } from '../constants/actionType'
import { isHhistoryApiAvailable } from '../reducers'

const initialState = {
  addedFilterId: {}
}

const parseQueryString = queryString => {
  let params = {}, queries, temp, i, l;
  queries = queryString.split("&");
  for ( i = 0, l = queries.length; i < l; i++ ) {
    temp = queries[i].split('=');
    if (temp.length > 1) {
      params[temp[0]] = []
      temp[1].split(',').forEach(id => {
        let _id = id.trim()
        let val = parseInt(_id)
        params[temp[0]].push(!isNaN(val) ? val : _id)
      });
    }
  }
  return params;
};

const addedFilterId = (state = initialState.addedFilterId, action) => {
  switch (action.type) {
    case SEARCH: {
      const {query} = action
      if (state['q']) {
        return {...state, q: [query]}
      }
      return state
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