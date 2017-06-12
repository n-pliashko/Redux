import React from 'react'
import PropTypes from 'prop-types'

const Item = ({ id, name, description, designer, count_options, price, cart = false}) => (
  <div>
    <div className="productModel ellipsis"> {designer} - {name}</div>
    <div className="show-for-medium" style={{display: cart ? 'none' : 'block' }}>
      <div className="productColour ellipsis">{count_options} options</div>
    </div>
    <div className="productPrice">
      <span className="now">&#36;{price}</span>
    </div>
  </div>
)

Item.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  designer: PropTypes.string,
  count_options: PropTypes.string,
  price: PropTypes.string
}
export default Item
