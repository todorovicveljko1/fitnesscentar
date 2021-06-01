import React from 'react'
import PropTypes from 'prop-types'
import './Paper.scss'
function Paper(props) {
  const { elevation = 3, className = '', style } = props
  return (
    <div
      className={`paper bg-light elevation-${elevation} ${className}`}
      style={style}
    >
      {props.children}
    </div>
  )
}

Paper.propTypes = {
  elevation: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Paper
