import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg bg-light shadow-sm'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Fitness Centar
        </Link>
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

export default Navbar
