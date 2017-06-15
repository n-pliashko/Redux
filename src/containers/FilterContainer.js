import React from 'react'
import { connect } from 'react-redux'
import FilterList from '../components/FilterList'
import {getCategories} from '../reducers/categories'
import {getDesigners} from '../reducers/designers'
import {addToFilter, clearFilter} from '../actions'
import { bindActionCreators } from 'redux'


const FilterContainer = ({filter, categories, designers, addToFilter, clearFilter}) => {
  const {addedFilterId} = filter
  let clear_cat = false, clear_designers = false
  if (addedFilterId.designers ) {
    clear_designers = addedFilterId.designers.length > 0
  }
  if (addedFilterId.cats ) {
    clear_cat = addedFilterId.cats.length > 0
  }
  return (
    <div className="show-for-medium boxShadow refine_column">
      <FilterList categories={categories} title="CATEGORIES" clear={clear_cat} addedFilterId={addedFilterId} filterName="cats" onChooseFilter={addToFilter} checkbox={false} clearFilter={clearFilter}/>
      <FilterList categories={designers} title="DESIGNERS" clear={clear_designers} addedFilterId={addedFilterId} filterName="designers" onChooseFilter={addToFilter} clearFilter={clearFilter}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  categories: getCategories(state.categories),
  designers: getDesigners(state.designers),
  filter: state.filter
})

function mapDispatchToProps(dispatch) {
  return {
    addToFilter: bindActionCreators(addToFilter, dispatch),
    clearFilter: bindActionCreators(clearFilter, dispatch),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterContainer)


