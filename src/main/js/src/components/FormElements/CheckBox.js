import React from 'react'
import PropTypes from 'prop-types'

function CheckBox(props) {
  const {
    checked,
    onChange,
    label = 'Input Field',
    id,
    className = '',
    labelPosition = 'after',
    disabled = false,
  } = props

  return (
    <div className={`mb-3 form-check ${className}`}>
      {labelPosition == 'before' && (
        <label htmlFor={id} className='form-check-label'>
          {label}
        </label>
      )}
      <input
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        type='checkbox'
        className='form-check-input'
        id={id}
        disabled={disabled}
      />
      {labelPosition == 'after' && (
        <label htmlFor={id} className='form-check-label'>
          {label}
        </label>
      )}
    </div>
  )
}

CheckBox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string,
  labelPosition: PropTypes.oneOf(['before', 'after']),
  disabled: PropTypes.bool,
}

export default CheckBox
