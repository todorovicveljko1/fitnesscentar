import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MenuIcon from '../Icons/MenuIcon'

function Navbar(props) {
  return (
    <nav className='navbar navbar-expand-lg bg-light shadow-sm'>
      <div className='container-fluid'>
        <div className='d-flex justify-content-center align-items-center '>
          {props.onSideBarButtonClick && (
            <MenuIcon className='pe-2' onClick={props.onSideBarButtonClick} />
          )}
          <Link className='navbar-brand' to='/'>
            Fitness Centar
          </Link>
        </div>
        <ul className='nav float-right'>
          <li className='nav-item ms-3'>
            <Link className='btn btn-primary' to='/login'>
              Prijava
            </Link>
          </li>
          <li className='nav-item ms-3'>
            <Link className='btn btn-secondary' to='/register'>
              Registruj se
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  onSideBarButtonClick: PropTypes.func,
}

export default Navbar
