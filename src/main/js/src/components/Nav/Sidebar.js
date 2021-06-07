import React from 'react'
import PropTypes from 'prop-types'
import { Link, useRouteMatch } from 'react-router-dom'
import './Sidebar.scss'

function Sidebar(props) {
  const { open = false } = props
  const pathList = window.location.pathname.split('/')
  return (
    <div className={`sidebar bg-light ${open ? 'sidebar-open' : ''}`}>
      <div className='d-flex flex-column pt-3'>
        <div className='d-flex flex-column item-group'>
          <span className='item-group-header'>Korisnici</span>
          <div className='d-flex flex-column'>
            <Link className='item' to='/app'>
              Članovi
            </Link>
            <Link className='item' to='/app'>
              Treneri
            </Link>
          </div>
        </div>
        <Link
          className={`item ${
            pathList.indexOf('fitnesscentri') == 2 ? 'active-item' : ''
          }`}
          to='/app/fitnesscentri'
        >
          Fitness Centari
        </Link>
        <span className='item'>Treninzi</span>

        <Link className='item' to='/app/treneri/potvrdi'>
          Prihvatanje trenera
        </Link>
      </div>
    </div>
  )
}
/*
<div className='d-flex flex-column pt-3'>
  <span className='item active-item'>Fitness Centari</span>
  <span className='item'>Sale</span>
  <span className='item'>Treneri</span>
  <span className='item'>Korisnici</span>
  <span className='item'>Treninzi</span>
  <span className='item'>Termini</span>
</div>
*/
Sidebar.propTypes = {
  open: PropTypes.bool,
}

export default Sidebar
