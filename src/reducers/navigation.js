import { REQUEST_SUCCESS, NAVIGATION_START, FILTER_SUCCESS, SEARCH } from '../constants/actionType'
import { isHhistoryApiAvailable } from '../reducers'

const initialState = {
  location: null,
  protocol: '',
  host: '',
  pathname: '',
  search: '',
  hash: '',
  transitioning: false
}

const getSearchString = (addedFilterId, withSign = true) => {
  let params = []
  for (let key in addedFilterId) {
    let values = Array.isArray(addedFilterId[key]) ? addedFilterId[key].join(',') : addedFilterId[key];
    if (values.length > 0)
      params.push(key + '=' + values)
  }
  return (params.length > 0 ? (withSign ? '?' : '' ) + params.join('&') : '')
}

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SUCCESS: {
      return {
        ...state,
        transitioning: true
      }
    }
    case SEARCH: {
      const {filter, search} = action;
      let _hash = state.hash
      let _search = getSearchString(filter.addedFilterId)
      let sign = _search.length > 0 ? '&' : '?'
      let _search_q = getSearchString(search.params, false)
      _search += _search_q.length > 0 ? sign + _search_q : ''
      let location = state.protocol + '//' + state.host + state.pathname

      if (isHhistoryApiAvailable) {
        location += _search + _hash
        window.history.pushState({}, null, location);
      } else {
        _hash = '#' + _search.replace(/^\?/, '')
        _search = state.search
        window.location.hash = _hash;
      }

      return {
        ...state,
        location: location,
        search: _search,
        hash: _hash
      }
    }
    case NAVIGATION_START: {
      return {
        ...state,
        transitioning: false,
        location: action.location
      }
    }
    case FILTER_SUCCESS: {
      const {filter, search} = action;
      let _hash = state.hash
      let _search = getSearchString(filter.addedFilterId)
      let sign = _search.length > 0 ? '&' : '?'
      let _search_q = getSearchString(search.params, false)
      _search += _search_q.length > 0 ? sign + _search_q : ''
      let location = state.protocol + '//' + state.host + state.pathname

      if (isHhistoryApiAvailable) {
        location += _search + _hash
        window.history.pushState({}, null, location);
      } else {
        _hash = '#' + _search.replace(/^\?/, '')
        _search = state.search
        location += _search
        window.location.hash = _hash;
      }

      return {
        ...state,
        location: location,
        search: _search,
        hash: _hash
      }
    }
    default: {
      let parser = document.createElement('a');
      parser.href = window.location.href;
      return {
        ...state,
        location: parser.protocol + '//' + parser.host + parser.pathname + parser.search + parser.hash,
        protocol: parser.protocol,
        host: parser.host,
        pathname: parser.pathname,
        search: parser.search,
        hash: parser.hash,
      }
    }
  }
}

export default navigation