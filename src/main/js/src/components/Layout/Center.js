import React from 'react'
import PropTypes from 'prop-types'

function Center(props) {
  const { className = '' } = props
  return (
    <div
      className={
        'd-flex justify-content-center align-items-center ' + className
      }
      style={props.style}
    >
      {props.children}
    </div>
  )
}

Center.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
}
export default Center
