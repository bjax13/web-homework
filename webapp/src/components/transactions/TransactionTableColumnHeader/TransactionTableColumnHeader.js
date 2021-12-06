import React from 'react'
import { any } from 'prop-types'
// import { css } from '@emotion/core'

// const styles = css`
//   .header {
//     font-weight: bold;
//   }
// `

function TransactionTableColumnHeader ({ children }) {
  return (
    <td>{children}</td>
  )
}

TransactionTableColumnHeader.propTypes = {
  children: any
}

export default TransactionTableColumnHeader
