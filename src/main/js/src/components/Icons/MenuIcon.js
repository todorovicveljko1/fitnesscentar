import React from 'react'

function MenuIcon(props) {
  return (
    <span
      className={props.className}
      style={{ ...props.style }}
      onClick={props.onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        style={{ height: '24px', width: '24px' }}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M4 6h16M4 12h16M4 18h16'
        />
      </svg>
    </span>
  )
}

export default MenuIcon
