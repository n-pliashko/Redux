import React from 'react'
import PropTypes from 'prop-types'

const Cart = ({ items, total, onCheckoutClicked }) => {
  let hasProducts = items.length > 0;
  let nodes =  <em>Please add some products to cart.</em>;
  if (hasProducts) {
    nodes = items.map(item => {
      return <div key={item.id}>
        <span><b>{item.name}</b></span>
        <span style={{marginLeft: '10px'}}>&#36;{item.price}</span>
        <span style={{marginLeft: '10px'}}>x {item.quantity}</span>
      </div>
    })
  }
  return (
    <div>
      <h3>Cart</h3>
      <div>{nodes}</div>
      <div style={{marginTop: '20px'}}></div>
      <p><b style={{textTransform: 'uppercase'}}>Total:</b> &#36;{total}</p>
      <button className="button red" onClick={onCheckoutClicked}
              disabled={hasProducts ? '' : 'disabled'}>
        Checkout
      </button>
    </div>
  )
}

Cart.propTypes = {
  items: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
}
export default Cart