import React from 'react'
import { connect } from 'react-redux'
import FilterList from '../components/FilterList'
import {getCategories} from '../reducers/categories'
import {getDesigners} from '../reducers/designers'
import {addToFilter, clearFilter, applyFilter} from '../actions'
import { bindActionCreators } from 'redux'


const FilterContainer = ({filter, categories, designers, addToFilter, clearFilter, applyFilter}) => {
  const {addedFilterId} = filter
  let clear_cat = false, clear_designers = false
  if (addedFilterId.designers) {
    clear_designers = addedFilterId.designers.length > 0
  }
  if (addedFilterId.cats) {
    clear_cat = addedFilterId.cats.length > 0
  }
  return (
    <div id="refinePanel" className="show-for-medium boxShadow refine_column">
      <div className="refine-control-header-top">
        <span className="headTitle">Refine By</span>
        <span className="clearLink">
          <a className="clear_all_filters white_ul" style={{display: 'inline'}} onClick={
            () => {
              clearFilter('ALL')
              let elements = document.querySelectorAll('[id=categories] input:checked')
              elements.forEach(element => {
                element.checked = false
              })
            }
          }>Clear all filters
          </a>
        </span>
      </div>
      <div className="show-for-medium boxShadow refine_column">
        <div id="categories">
          <FilterList categories={categories} title="CATEGORIES" clear={clear_cat} addedFilterId={addedFilterId}
                      filterName="cats" onChooseFilter={addToFilter} checkbox={false} clearFilter={clearFilter}/>
          <FilterList categories={designers} title="DESIGNERS" clear={clear_designers} addedFilterId={addedFilterId}
                      filterName="designers" onChooseFilter={addToFilter} clearFilter={clearFilter}/>
          <button className="btn btn-default" onClick={() => applyFilter()} style={{float: 'right', margin: '10px', fontSize: '.95rem'}}>APPLY</button>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
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
    applyFilter: bindActionCreators(applyFilter, dispatch),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterContainer)


