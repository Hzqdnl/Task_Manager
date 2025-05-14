import clsx from 'clsx'
import React from 'react'

const Button = ({icon, type, label, className, onClick = () => {}}) => {
  return (
    <button
    type={type || 'button'}
    className={clsx('px-3 py-2 outline-none rounded cursor-pointer', className)}
    onClick={onClick}
    >
        <span>{label}</span>
        {icon && icon }
    </button>
  )
}

export default Button