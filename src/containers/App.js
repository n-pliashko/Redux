import React from 'react'
import ItemContainer from './ItemContainer'
import CartContainer from './CartContainer'
import PaginationContainer from './PaginationContainer'
import FilterContainer from './FilterContainer'
import SearchContainer from './SearchContainer'

const App = () => (
  <div>
    <h2 style={{textAlign: 'center'}}>Shopping Cart</h2>
    <SearchContainer/>
    <table>
      <tbody style={{verticalAlign: 'top'}}>
      <tr>
        <td>
          <FilterContainer/>
        </td>
        <td>
          <center>
            <PaginationContainer/>
          </center>
          <hr/>
          <ItemContainer />
          <hr/>
          <center>
            <PaginationContainer/>
          </center>
        </td>
      </tr>
      </tbody>
    </table>
    <CartContainer/>
  </div>
)

export default App