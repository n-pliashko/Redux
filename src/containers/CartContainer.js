import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Cart from '../components/Cart'
import { checkout } from '../actions'
import { getTotal, getCartItems } from '../reducers'


const CartContainer = ({items, total, checkout}) => (
  <Cart items={items}
        total={total}
        onCheckoutClicked={() => checkout(items)}/>
)


CartContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  items: getCartItems(state),
  total: getTotal(state)
})

export default connect(
  mapStateToProps,
  { checkout }
)(CartContainer)


