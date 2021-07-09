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
    <div
      className={`justify-content-between d-flex flex-column sidebar bg-light ${
        open ? 'sidebar-open' : ''
      }`}
    >
      {!loading && (
        <>
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
                Fitness Centri
              </Link>
            )}
            <Link
              className={`item ${
                pathList.indexOf('treninzi') == 2 &&
                pathList.indexOf('pretraga') == 3
                  ? 'active-item'
                  : ''
              }`}
              to='/app/treninzi/pretraga'
            >
              Pretraga treninga
            </Link>
            {hasRole('CLAN') && (
              <>
                <Link
                  className={`item ${
                    pathList.indexOf('termini') == 2 &&
                    pathList.indexOf('prijave') == 3
                      ? 'active-item'
                      : ''
                  }`}
                  to='/app/termini/prijave'
                >
                  Prijave
                </Link>
                <div className='d-flex flex-column item-group'>
                  <span className='item-group-header'>Odradjeni</span>
                  <div className='d-flex flex-column'>
                    <Link
                      className={`item ${
                        pathList.indexOf('odradjeni') == 2 &&
                        pathList.indexOf('svi') == 3
                          ? 'active-item'
                          : ''
                      }`}
                      to='/app/odradjeni/svi'
                    >
                      Svi
                    </Link>
                    <Link
                      className={`item ${
                        pathList.indexOf('odradjeni') == 2 &&
                        pathList.indexOf('ocenjeni') == 3
                          ? 'active-item'
                          : ''
                      }`}
                      to='/app/odradjeni/ocenjeni'
                    >
                      Ocenjeni
                    </Link>
                    <Link
                      className={`item ${
                        pathList.indexOf('odradjeni') == 2 &&
                        pathList.indexOf('neocenjeni') == 3
                          ? 'active-item'
                          : ''
                      }`}
                      to='/app/odradjeni/neocenjeni'
                    >
                      Ne Ocenjeni
                    </Link>
                  </div>
                </div>
              </>
            )}
            {hasRole('TRENER') && (
              <Link
                className={`item ${
                  pathList.indexOf('treninzi') == 2 && pathList.length == 3
                    ? 'active-item'
                    : ''
                }`}
                to='/app/treninzi'
              >
                Treninzi
              </Link>
            )}

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
          {hasRole('CLAN') && (
            <Link
              className={`item  mb-3  ${
                pathList.indexOf('profil') == 2 && pathList.length == 3
                  ? 'active-item'
                  : ''
              }`}
              to='/app/profil'
            >
              Profil
            </Link>
          )}
        </>
      )}
    </div>
  )
}

Sidebar.propTypes = {
  open: PropTypes.bool,
}

export default Sidebar
