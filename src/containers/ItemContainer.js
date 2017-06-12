import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import ProductItem from '../components/ProductItem'
import {getItems} from '../reducers/items'
import { addToCart } from '../actions'

const ItemContainer = ({items, addToCart}) => (
  <ItemList>
    {items.map( item =>
    <ProductItem key={item.id}
                 item={item}
                 onAddToCartClicked={() => addToCart(item.id)}/>
    )}
  </ItemList>
)

ItemContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    designer: PropTypes.string.isRequired,
    count_options: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  items: getItems(state.items)
})

export default connect(
  mapStateToProps,
  {addToCart}
)(ItemContainer)