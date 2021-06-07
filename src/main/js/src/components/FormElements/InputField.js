import React from 'react'
import PropTypes from 'prop-types'

function InputField(props) {
  const {
    value,
    onChange,
    type = 'text',
    label = 'Input Field',
    id,
    placeholder = '',
    error = '',
    className = '',
    variant = 'classic',
    disabled = false,
    lableClass = '',
    inputClass = '',
  } = props
  const floating = variant == 'floating' ? 'form-floating' : ''
  const inline = variant == 'inline' ? 'row' : ''

  return (
    <div className={`mb-3 ${floating} ${inline} ${className}`}>
      {!floating && (
        <label htmlFor={id} className={`form-label ${lableClass}`}>
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''} ${inputClass}`}
        id={id}
        placeholder={floating ? label : placeholder}
        disabled={disabled}
      />
      {error && <div class='invalid-feedback'>{error}</div>}
      {floating && (
        <label htmlFor={id} className={`form-label ${lableClass}`}>
          {label}
        </label>
      )}
    </div>
  )
}

InputField.propTypes = {
  className: PropTypes.string,
  lableClass: PropTypes.string,
  inputClass: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  variant: PropTypes.oneOf(['floating', 'inline', 'classic']),
  error: PropTypes.string,
  disabled: PropTypes.bool,
}

export default InputField
