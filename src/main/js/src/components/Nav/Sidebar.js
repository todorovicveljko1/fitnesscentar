import React from 'react'
import PropTypes from 'prop-types'
import './Sidebar.scss'

function Sidebar(props) {
  const { open = false } = props
  return (
    <div className={`sidebar bg-light ${open ? 'sidebar-open' : ''}`}>
      <div className='d-flex flex-column pt-3'>
        <span className='item active-item'>Fitness Centari</span>
        <span className='item'>Sale</span>
        <span className='item'>Treneri</span>
        <span className='item'>Korisnici</span>
        <span className='item'>Treninzi</span>
        <span className='item'>Termini</span>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  open: PropTypes.bool,
}

export default Sidebar
