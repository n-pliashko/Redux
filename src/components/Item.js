import React from 'react'
import PropTypes from 'prop-types'

const Item = ({ id, name, description, model_name, designer_name, count_options, price, cart = false}) => {
  let _id = 'item' + id;
  return (
    <div id={_id}>
      <div className="productModel ellipsis"> {designer_name}<br/>{model_name} - {name}</div>
      <div className="show-for-medium" style={{display: cart ? 'none' : 'block'}}>
        <div className="productColour ellipsis">{description}</div>
      </div>
      <div className="show-for-medium" style={{display: cart ? 'none' : 'block'}}>
        <div className="productColour ellipsis">{count_options} options</div>
      </div>
      <div className="productPrice">
        <span className="now">&#36;{parseFloat(price).toFixed(2)}</span>
      </div>
    </div>
  )
}

Item.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  designer_name: PropTypes.string,
  model_name: PropTypes.string,
  count_options: PropTypes.string,
  price: PropTypes.string
}
export default Item
