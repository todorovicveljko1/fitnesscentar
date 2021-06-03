import React from 'react'
import PropTypes from 'prop-types'
import './Table.scss'
import TableHead from './TableHead'
import TableBody from './TableBody'
function Table(props) {
  const { columns, data, rowActions } = props
  return (
    <table className='table-root'>
      <TableHead columns={columns} hasActions={!!rowActions} />
      <TableBody columns={columns} data={data} rowActions={rowActions} />
    </table>
  )
}

Table.propsType = {
  columns: PropTypes.arrayOf(
    PropTypes.objectOf({
      key: PropTypes.string,
      lable: PropTypes.string,
      right: PropTypes.bool,
      sortable: PropTypes.bool,
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

export default Table
