import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

const ProductItem = ({ item, onAddToCartClicked }) => (
  <div className="large-4 medium-6 small-6 columns resultSpacing productListing" style={{ marginBottom: 20 }}>
    <Item
      designer={item.designer}
      count_options={item.count_options}
      name={item.name}
      price={item.price} />
    <button className="button"
            onClick={onAddToCartClicked}>
      Add to cart
    </button>
  </div>
)

ProductItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    designer: PropTypes.string.isRequired,
    count_options: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductItem
