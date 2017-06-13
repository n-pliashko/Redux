import React from 'react'
import { connect } from 'react-redux'
import { nextItems, previousItems} from '../actions'
import { getPagination } from '../reducers'


const PaginationContainer = ({pagination, nextItems, previousItems}) => (
  <div>
    <button className="button red"  onClick={previousItems} disabled={pagination.skip > 0 ? '' : 'disabled'}>
      PREVIOUS
    </button>
    <button className="button red" onClick={nextItems}>
      NEXT
    </button>
  </div>
)

const mapStateToProps = state => ({
  pagination: getPagination(state),
  state: state
})

const mergeProps = (stateProps, dispatchProps) => {
  const {state} = stateProps;
  const {dispatch} = dispatchProps;
  return Object.assign({}, state, {
    previousItems: () => { previousItems(dispatch, state)},
    nextItems: () => {nextItems(dispatch, state)
    }
  });
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(PaginationContainer)
