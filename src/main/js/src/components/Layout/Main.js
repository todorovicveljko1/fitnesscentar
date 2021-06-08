import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../Nav/Navbar'

function Main(props) {
  const { className = '', background = true, style } = props
  return (
    <div
      className={
        'd-flex flex-column ' + (background ? 'main-bg ' : '') + className
      }
      style={style}
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
  style: PropTypes.object,
}

export default Main
