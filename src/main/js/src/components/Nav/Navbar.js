import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MenuIcon from '../Icons/MenuIcon'
import { useAuth } from '../../utils/Auth'

function Navbar(props) {
  const { user, loading, logout } = useAuth()
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
          {!localStorage.getItem('token') && (
            <>
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
            </>
          )}
          {localStorage.getItem('token') && !user && (
            <span
              className='skeleton'
              style={{ width: '12rem', height: '1.5rem' }}
            ></span>
          )}
          {localStorage.getItem('token') && user && (
            <div className='d-flex  justify-content-center align-items-baseline'>
              <span className='pe-1'>{user.korisnickoIme} </span>
              <span className='text-muted'>({user.email})</span>
              <button className='btn btn-light' onClick={logout}>
                Odjavi se
              </button>
            </div>
          )}
        </ul>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  onSideBarButtonClick: PropTypes.func,
}

export default Navbar
