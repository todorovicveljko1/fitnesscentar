import React from 'react'
import PropTypes from 'prop-types'

function TableHead(props) {
  const { columns, hasActions } = props
  return (
    <thead>
      <tr>
        {columns.map((column, i) => {
          return (
            <th
              className={`table-cell table-cell-head ${
                column.right && 'table-cell-right'
              }`}
              scope='col'
              key={column.key}
            >
              {column.lable}
            </th>
          )
        })}
        {hasActions && (
          <th
            className='table-cell table-cell-head table-cell-right'
            scope='col'
          >
            Akcije
          </th>
        )}
      </tr>
    </thead>
  )
}

TableHead.propsType = {
  columns: PropTypes.arrayOf(
    PropTypes.objectOf({
      key: PropTypes.string,
      lable: PropTypes.string,
      right: PropTypes.bool,
    })
  ),
  hasActions: PropTypes.bool,
}

export default TableHead
