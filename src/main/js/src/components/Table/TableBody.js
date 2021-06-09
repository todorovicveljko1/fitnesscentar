import React from 'react'
import PropTypes from 'prop-types'

function TableBody(props) {
  const { columns, data, rowActions } = props

  return (
    <tbody>
      {data.map((row) => {
        return (
          <tr key={row['id']}>
            {columns.map((column, i) => {
              return (
                <td
                  className={`table-cell ${column.right && 'table-cell-right'}`}
                  key={
                    row['id'] +
                    '_' +
                    (Array.isArray(column.key)
                      ? column.key.join('_')
                      : column.key)
                  }
                >
                  {Array.isArray(column.key)
                    ? column.wrapper
                      ? column.wrapper(column.key.map((k) => row[k]))
                      : column.key.map((k) => row[k]).join(' ')
                    : column.wrapper
                    ? column.wrapper(row[column.key])
                    : row[column.key]}
                </td>
              )
            })}
            {!!rowActions && (
              <td className='table-cell table-cell-right'>
                {rowActions.map((action, i) => {
                  return (
                    <span
                      onClick={() => action.onAction(row)}
                      key={row['id'] + '_action_' + i}
                    >
                      {action.content}
                    </span>
                  )
                })}
              </td>
            )}
          </tr>
        )
      })}
    </tbody>
  )
}

TableBody.propsType = {
  columns: PropTypes.arrayOf(
    PropTypes.objectOf({
      key: PropTypes.string,
      lable: PropTypes.string,
      right: PropTypes.bool,
      wrapper: PropTypes.func,
    })
  ),
  data: PropTypes.array,
  rowActions: PropTypes.arrayOf(
    PropTypes.objectOf({
      content: PropTypes.node,
      onAction: PropTypes.func,
    })
  ),
}

export default TableBody
