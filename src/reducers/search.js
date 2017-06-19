import { NAVIGATION_START, INPUT_SEARCH_TEXT } from '../constants/actionType'

const initialState = {
  params: {},
  query: ''
}

const query = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_SEARCH_TEXT: {
      const {query} = action;
      return query.length > 0 ?  '?q=' + query : ''
    }
    case NAVIGATION_START: {
      const {location} = action;
      let _query = getLocationObject(location).search
      let params = parseQueryString(_query)
      return params['q'] ? '?q=' + params['q'] : ''
    }
    default: {
      return state.query;
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
    case INPUT_SEARCH_TEXT: {
      const {query} = action;
      let _text = query.length > 0 ?  '?q=' + query : ''
      return parseQueryString(_text)
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
    query: query(state, action),
    params: params(state.query, action)
  }
}

export default search