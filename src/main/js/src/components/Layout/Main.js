import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../Nav/Navbar'

function Main(props) {
  const { className = '', background = true } = props
  return (
    <div
      className={
        'd-flex flex-column ' + (background ? 'main-bg ' : '') + className
      }
    >
      <Navbar />
      {props.children}
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  background: PropTypes.bool,
}

export default Main
