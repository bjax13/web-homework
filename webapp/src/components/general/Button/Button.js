import React from 'react'
import { func, string, any } from 'prop-types'
import { StyledButton } from './Button.styles'

function Button ({ onClick, type, children }) {
  return (
    <StyledButton onClick={onClick} type={type}>
      {children}
    </StyledButton>
  )
}

Button.propTypes = {
  onClick: func,
  type: string,
  children: any
}

Button.defaultProps = {
  onClick: Function.prototype
}

export default Button
