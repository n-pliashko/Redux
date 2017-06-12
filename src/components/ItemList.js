import React from 'react'
import PropTypes from 'prop-types'

const ItemList = ({title, children}) => (
  <div>
    <h3>{title}</h3>
    <div classID="items">{children}</div>
  </div>
)

ItemList.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default ItemList