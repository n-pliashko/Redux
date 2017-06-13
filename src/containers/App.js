import React from 'react'
import ItemContainer from './ItemContainer'
import CartContainer from './CartContainer'
import PaginationContainer from './PaginationContainer'

const App = () => (
  <div>
        <h2 style={{textAlign: 'center'}}>Shopping Cart</h2>
        <hr/>
        <ItemContainer />
        <hr/>
        <center>
        <PaginationContainer/>
        </center>
        <hr/>
        <CartContainer/>
  </div>
)

export default App