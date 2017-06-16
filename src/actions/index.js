import * as types from '../constants/actionType'


const serialize = data => {
  return Object.keys(data).map(function (keyName) {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
  }).join('&');
};

export const getAllFilters = () => (dispatch, getState) => {
  fetch('http://ssyii/web/site/categories').then(response => response.json())
    .then(json => dispatch({
        type: types.CATEGORIES_LIST_SUCCESS,
        categories: json.categories,
        total: json.total
      })
    ).catch(() => dispatch({
    type: types.CATEGORIES_LIST_FAILURE,
    categories: {},
    total: 0
  }));

  fetch('http://ssyii/web/site/designers').then(response => response.json())
    .then(json => dispatch({
        type: types.DESIGNERS_LIST_SUCCESS,
      designers: json.designers,
        total: json.total
      })
    ).catch(() => dispatch({
    type: types.DESIGNERS_LIST_FAILURE,
    designers: {},
    total: 0
  }));
}

export const getAllItems = () => (dispatch, getState) => {
  const {pagination, filter} = getState();

  let data = {
    skip: pagination.skip,
    limit: pagination.limit,
  }

  if (Object.keys(filter.addedFilterId).length > 0) {
    Object.assign(data, filter.addedFilterId)
  }

  fetch('http://ssyii/web/site/items?' + serialize(data)).then(response => response.json())
    .then(json => dispatch({
      type: types.ITEMS_LIST_SUCCESS,
      items: json.items,
      total: json.total
    })
    ).catch(() => dispatch({
      type: types.ITEMS_LIST_FAILURE,
      items: {},
      total: 0
  }));
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
}

export const applyFilter = () => (dispatch, getState) => {
  const {filter} = getState()
  dispatch({type: types.FILTER_SUCESS, filter})
  dispatch(getAllItems())
}

export const clearFilter = (filterName) => (dispatch, getState) => {
  dispatch({
    type: types.CLEAR_FILTER,
    filterName
  })
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


export const search = text => (dispatch, getState) => {

}

