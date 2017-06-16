import React from 'react'
import {Component} from 'react'
import { connect } from 'react-redux'
import { search } from '../actions'
import { bindActionCreators } from 'redux'
import { SEARCH } from '../constants/actionType'

class SearchContainer extends Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = { searchText : '' }
  }

  handleInputChange(e) {
    const { dispatch, filter, search } = this.props
    const target = e.target;
    const value = target.value;
    let keyword = value.replace(/\s{2,}/g,' ');
    keyword = keyword.replace(/\s/g, "+");
    this.setState({searchText: value})
    dispatch({type: SEARCH, query: keyword, filter, search})
  }

  handleSubmit(e) {
    e.preventDefault()
    const {onSearch} = this.props
  }

  render () {
    return (
      <div>
        <form style={{float: 'right', maxWidth: '200px'}}>
          <div className="form-group">
            <input type="text" id="search_input" placeholder="Input search text" value={this.state.searchText} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-default" style={{display: 'inline-block'}} onClick={this.handleSubmit}>Search</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

function mapDispatchToProps(dispatch) {
  return {
    onSearch: bindActionCreators(search, dispatch),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer)