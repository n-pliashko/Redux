import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import FilterList from '../components/FilterList'
import {getCategories} from '../reducers/categories'
import {getDesigners} from '../reducers/designers'
import {addToFilter, clearFilter, applyFilter} from '../actions'
import { bindActionCreators } from 'redux'


class FilterContainer extends Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { addToFilter} = this.props
    const target = e.target
    const name = target.name
    const value = target.value;
    addToFilter(name, value, true)
  }

  render() {
    const {filter, categories, designers, addToFilter, clearFilter, applyFilter} = this.props
    const {addedFilterId} = filter
    let clear_cat = false, clear_designers = false
    let priceFrom = filter.addedFilterId['price_from'] ? filter.addedFilterId['price_from'] : '',
      priceTo = filter.addedFilterId['price_to'] ? filter.addedFilterId['price_to'] : ''

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
            <div className="price_slider_wrapper">
              <div className="refine-control-header show-for-medium">
                <span className="headTitle">Price (£)</span>
                <span className="subClearLink"><a id="clear_price" className="black_ul clear_slider"
                                                  style={{display: 'none'}}>Clear</a></span>
              </div>

              <div className="slider_div" data-slider_name="price">
                <input name="price_from" className="slider_range price_range price_range_min" value={priceFrom} onChange={this.handleInputChange}/> &nbsp; - &nbsp;
                <input name="price_to"  className="slider_range price_range price_range_max" value={priceTo} onChange={this.handleInputChange}/>
              </div>
            </div>
            <hr style={{margin: 0}}/>
            <FilterList categories={categories} title="CATEGORIES" clear={clear_cat} addedFilterId={addedFilterId}
                        filterName="cats" onChooseFilter={addToFilter} checkbox={false} clearFilter={clearFilter}/>
            <FilterList categories={designers} title="DESIGNERS" clear={clear_designers} addedFilterId={addedFilterId}
                        filterName="designers" onChooseFilter={addToFilter} clearFilter={clearFilter}/>
            <button className="btn btn-default" onClick={() => applyFilter()}
                    style={{float: 'right', margin: '10px', fontSize: '.95rem'}}>APPLY
            </button>
            <div style={{clear: 'both'}}></div>
          </div>
        </div>
      </div>
    )
  }
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


