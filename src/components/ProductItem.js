import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

const ProductItem = ({ item, onAddToCartClicked }) => (
  <div className="large-4 medium-6 small-6 columns resultSpacing productListing" style={{ marginBottom: 20 }}>
    <Item
      id={item.id}
      designer_name={item.designer_name}
      count_options={item.count_options}
      model_name={item.model_name}
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    designer_name: PropTypes.string.isRequired,
    model_name: PropTypes.string.isRequired,
    count_options: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductItem
