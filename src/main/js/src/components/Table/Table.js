import React from 'react'
import PropTypes from 'prop-types'
import './Table.scss'
function Table(props) {
  const { columns, data, id } = props
  return (
    <table className='table-root'>
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
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr key={row['id']}>
              {columns.map((column, i) => {
                return (
                  <td
                    className={`table-cell ${
                      column.right && 'table-cell-right'
                    }`}
                    key={row['id'] + '_' + column.key}
                  >
                    {row[column.key]}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

Table.propsType = {
  columns: PropTypes.arrayOf(
    PropTypes.objectOf({
      key: PropTypes.string,
      lable: PropTypes.string,
      right: PropTypes.bool,
    })
  ),
  data: PropTypes.array,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Table
