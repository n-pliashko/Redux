import { NAVIGATION_START, FILTER_SUCESS } from '../constants/actionType'

const initialState = {
  params: {},
  query: ''
}

const query = (state = initialState.query, action) => {
  switch (action.type) {
    case NAVIGATION_START: {
      const {location} = action;
      return getLocationObject(location).search
    }
    default: {
      return state;
    }
  }
}

const params = (state = initialState.params, action) => {
  switch (action.type) {
    case NAVIGATION_START: {
      const {location} = action;
      let _query = getLocationObject(location).search;
      return parseQueryString(_query)
    }
    case FILTER_SUCESS: {
      const {filter} = action;
      return filter.addedFilterId
    }
    default: {
      return parseQueryString(state)
    }
  }
}

const getLocationObject = url => {
  let parser = document.createElement('a');
  parser.href = url;
  return parser;
}

const parseQueryString = queryString => {
  queryString = queryString.substring( queryString.indexOf('?') + 1 );
  let params = {}, queries, temp, i, l;
  queries = queryString.split("&");
  for ( i = 0, l = queries.length; i < l; i++ ) {
    temp = queries[i].split('=');
    if (temp.length > 1)
      params[temp[0]] = temp[1];
  }
  return params;
};


const search = (state = initialState , action) => {
  return {
    query: query(state.query, action),
    params: params(state.query, action)
  }
}

export default search