import React from 'react'
import { connect } from 'react-redux'
import { nextItems, previousItems} from '../actions'
import { getPagination } from '../reducers'
import { bindActionCreators } from 'redux'

const PaginationContainer = ({pagination, nextItems, previousItems}) => {
  return (
  <div>
    <button className="button red"  onClick={() => previousItems()} disabled={pagination.skip > 0 ? '' : 'disabled'}>
      PREVIOUS
    </button>
    <button className="button red" onClick={() => nextItems()} disabled={(pagination.skip + pagination.limit) < pagination.total ? '' : 'disabled'}>
      NEXT
    </button>
    <b style={{textAlign: 'center', lineHeight: 1}}>[{pagination.total}]</b>
  </div>
)}

const mapStateToProps = state => ({
  pagination: getPagination(state),
})


function mapDispatchToProps(dispatch) {
  return {
    previousItems: bindActionCreators(previousItems, dispatch),
    nextItems: bindActionCreators(nextItems, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationContainer)
