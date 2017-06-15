import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import * as action from './actions'
import App from './containers/App'

import ('bootstrap/dist/css/bootstrap.min.css');

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

store.dispatch(action.getAllFilters())
store.dispatch(action.loadPagination())
store.dispatch(action.loadNavigation())
store.dispatch(action.getAllItems())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)
