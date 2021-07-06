import React from 'react'
import PropTypes from 'prop-types'
import { Link, useRouteMatch } from 'react-router-dom'
import './Sidebar.scss'
import { useAuth } from '../../utils/Auth'

function Sidebar(props) {
  const { open = false } = props
  const { loading, hasRole } = useAuth()
  const pathList = window.location.pathname.split('/')
  return (
    <div className={`sidebar bg-light ${open ? 'sidebar-open' : ''}`}>
      {!loading && (
        <div className='d-flex flex-column pt-3'>
          {hasRole('ADMIN') && (
            <div className='d-flex flex-column item-group'>
              <span className='item-group-header'>Korisnici</span>
              <div className='d-flex flex-column'>
                <Link
                  className={`item ${
                    pathList.indexOf('treneri') == 2 ? 'active-item' : ''
                  }`}
                  to='/app/treneri'
                >
                  Treneri
                </Link>
              </div>
            </div>
          )}
          {hasRole('ADMIN') && (
            <Link
              className={`item ${
                pathList.indexOf('fitnesscentri') == 2 ? 'active-item' : ''
              }`}
              to='/app/fitnesscentri'
            >
              Fitness Centari
            </Link>
          )}
          <Link
            className={`item ${
              pathList.indexOf('treninzi') == 2 ? 'active-item' : ''
            }`}
            to='/app/treninzi'
          >
            Treninzi
          </Link>

          {/*hasRole('ADMIN') && (
            <Link
              className={`item ${
                pathList.indexOf('potvrdi') == 3 ? 'active-item' : ''
              }`}
              to='/app/treneri/potvrdi'
            >
              Prihvatanje trenera
            </Link>
            )*/}
        </div>
      )}
    </div>
  )
}

Sidebar.propTypes = {
  open: PropTypes.bool,
}

export default Sidebar
