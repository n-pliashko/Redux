import { ITEMS_LIST_SUCCESS, NAVIGATION_START, FILTER_SUCESS, SEARCH } from '../constants/actionType'

const initialState = {
  location: null,
  protocol: '',
  host: '',
  pathname: '',
  search: '',
  hash: '',
  transitioning: false
}

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_LIST_SUCCESS: {
      return {
        ...state,
        transitioning: true
      }
    }
    case SEARCH: {
      const {search} = action
      let location = state.protocol + '//' + state.host + state.pathname + search + state.hash
      window.history.pushState({}, null, location);
      return {
        ...state,
        location: location,
        search: search
      }
    }
    case NAVIGATION_START: {
      return {
        ...state,
        transitioning: false,
        location: action.location
      }
    }
    case FILTER_SUCESS: {
      const {filter} = action;
      let params = []
      for (let key in filter.addedFilterId) {
        let values = filter.addedFilterId[key].join(',');
        if (values.length > 0)
          params.push(key + '=' + filter.addedFilterId[key].join(','))
      }
      let _hash =  params.length > 0 ? '#' + params.join('&') : ''
      let location = state.protocol + '//' + state.host + state.pathname + state.search + _hash
      window.history.pushState({}, null, location);
      return {
        ...state,
        location: location,
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