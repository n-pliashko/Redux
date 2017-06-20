import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import ProductItem from '../components/ProductItem'
import {getItems} from '../reducers/items'
import { addToCart, scroll } from '../actions'

import { bindActionCreators } from 'redux'

class ItemContainer extends Component {
  componentDidUpdate () {
    let {dispatch} = this.props
    dispatch(scroll())
  }

  render () {
    let {items, addToCart} = this.props
    let container = ''
    if (!items.length) {
      container = <center>
        <h3>Sorry, no products matched your search. Please try another search term.</h3>
      </center>;
    } else {
      container = items.map(item =>
        <ProductItem key={item.id}
                     item={item}
                     onAddToCartClicked={() => addToCart(item.id)}/>
      )
    }
    return <ItemList>
      {container}
    </ItemList>
  }
}

ItemContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    designer_name: PropTypes.string.isRequired,
    model_name: PropTypes.string.isRequired,
    count_options: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    items: getItems(state.items)
  })

function mapDispatchToProps(dispatch) {
  return {
    addToCart: bindActionCreators(addToCart, dispatch),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemContainer)