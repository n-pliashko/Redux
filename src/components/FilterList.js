import React from 'react'

const FilterList = ({ filterName, categories, title, clear, onChooseFilter, clearFilter, addedFilterId, checkbox = true }) => {
  return (
    <div id="categories">
      <div className="refine-control-header">
        <span className="headTitle"><a>{title}</a></span>
        <span className="subClearLink">
          <a className="highlight clear_section toggleControl closed"
             style={{display: clear ? 'block' : 'none'}}
             onClick={(e) => {
               clearFilter(filterName)
               let elements = document.querySelectorAll('[id^=' + filterName + '_checkbox]:checked')
               elements.forEach(element => {
                 element.checked = false
               })
             }}>Clear</a>
        </span>
      </div>
      <ul className="refine-control" id="scroll_250">
        {categories.map(cat => {
            let id = filterName + cat.id
            let checkbox_id = filterName + '_checkbox' + cat.id, _checked = false
            if (addedFilterId[filterName] && addedFilterId[filterName].indexOf(cat.id) !== -1)
              _checked = true;
            return (
              <li key={cat.id}>
                <a id={id} className="search_element ellipsis enabled">
                  <input type={!!checkbox ? 'checkbox' : 'radio'} name={filterName} value="link" id={checkbox_id}
                         defaultChecked={_checked} onClick={() => onChooseFilter(filterName, cat.id, !!!checkbox)}/>
                  <label htmlFor={checkbox_id} style={{cursor: 'pointer'}}>
                    {cat.name}
                    <span className="refine_column_count">({cat.count_items})</span>
                  </label>
                </a>
              </li>
            )
          }
        )}
      </ul>
    </div>
  )
}

export default FilterList
