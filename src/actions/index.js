import * as types from '../constants/actionType'

export const getAllItems = () => (dispatch, getState) => {
  const {pagination, filter, search} = getState();

  let data = {
    skip: pagination.skip,
    limit: pagination.limit,
    onlyItems: 1
  }

  if (Object.keys(filter.addedFilterId).length > 0) {
    Object.assign(data, filter.addedFilterId)
  }

  if (search.params['q'] && search.params['q'].length > 0)
    Object.assign(data, {q: search.params['q']})

  let form = new FormData();
  Object.keys(data).map(key => (
    form.append(key, data[key])
  ))

  let dataRequest = {
    method: 'POST',
    headers: new Headers({
      'X-Requested-With': 'XMLHttpRequest'
    }),
    body: form
  }
  fetch('http://ssyii/web/site/catalogue_search', dataRequest).then(response => response.json())
    .then(json => dispatch({
        type: types.REQUEST_SUCCESS,
        items: json.items,
        total: json.total,
        min_price: json.min_price,
        max_price: json.max_price
      })
    ).catch(() => dispatch({
        type: types.REQUEST_FAILURE,
        items: {},
        total: 0,
        min_price: '',
        max_price: ''
  }))
}

export const getAllFilters = () => (dispatch, getState) => {
  const {pagination, filter, search} = getState();

  let data = {
    skip: pagination.skip,
    limit: pagination.limit,
    onlyFilters: 1
  }

  if (Object.keys(filter.addedFilterId).length > 0) {
    Object.assign(data, filter.addedFilterId)
  }

  if (search.params['q'] && search.params['q'].length > 0)
    Object.assign(data, {q: search.params['q']})

  let form = new FormData();
  Object.keys(data).map(key => (
    form.append(key, data[key])
  ))

  let dataRequest = {
    method: 'POST',
    headers: new Headers({
      'X-Requested-With': 'XMLHttpRequest',
    }),
    body: form
  }

  fetch('http://ssyii/web/site/catalogue_search', dataRequest).then(response => response.json())
    .then(json => dispatch({
        type: types.FILTER_REQUEST_SUCCESS,
        designers: json.designers,
        categories: json.categories
      })
    ).catch(() => dispatch({
    type: types.FILTER_REQUEST_FAILURE,
    designers: {},
    categories: {}
  }))
}

export const addToCart = itemId => (dispatch, getState) => {
  dispatch({
    type: types.ADD_TO_CART,
    itemId
  })
}


export const addToFilter = (filterName, filterId, onlyOne) => (dispatch, getState) => {
  dispatch({
    type: types.CHOOSE_FILTER,
    filterName,
    filterId,
    onlyOne
  })
  dispatch(getAllFilters())
}

export const applyFilter = () => (dispatch, getState) => {
  const {filter, search} = getState()
  dispatch({type: types.FILTER_SUCCESS, filter, search})
  dispatch(getAllFilters())
  dispatch(getAllItems())
}

export const clearFilter = (filterName) => (dispatch, getState) => {
  dispatch({
    type: types.CLEAR_FILTER,
    filterName
  })
  dispatch(getAllFilters())
}

export const checkout = items => (dispatch, getState) => {
  const { cart } = getState()
  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  dispatch({
    type: types.CLEAR_CART,
    cart
  })
}

export const nextItems = () => (dispatch, getState) => {
  dispatch({
    type: types.LOAD_NEXT_ITEMS,
    ...getState()
  })
  dispatch(getAllItems())
}

export const previousItems = () => (dispatch, getState) => {
  dispatch({
    type: types.LOAD_PREVIOUS_ITEMS,
    ...getState()
  })
  dispatch(getAllItems())
}

export const loadPagination = () =>  dispatch => {
  dispatch({
    type: types.ITEMS_LIST_REQUEST
  })
}

export const loadNavigation = () => (dispatch, getState) => {
  dispatch({
    type: types.NAVIGATION_START,
    location: window.location.href
  })

  const { navigation } = getState()
  dispatch({
    type: types.NAVIGATION_COMPLETE,
    navigation
  })
}

export const scroll = () => (dispatch, getState) => {
  const { navigation } = getState()
  if (navigation.transitioning && navigation.hash) {
    let element = document.getElementById(navigation.hash.replace(/^#/, ''));
    if (element) {
      element.scrollIntoView();
    }
  }
}


export const search = () => (dispatch, getState) => {
  const { filter, search } = getState()
  dispatch({
    type: types.SEARCH,
    search,
    filter
  })

  dispatch(getAllFilters())
  dispatch(getAllItems())
}

