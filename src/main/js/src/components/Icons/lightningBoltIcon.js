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
        className='h-6 w-6'
        style={{ height: '24px', width: '24px' }}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M13 10V3L4 14h7v7l9-11h-7z'
        />
      </svg>
    </span>
  )
}

export default MenuIcon
