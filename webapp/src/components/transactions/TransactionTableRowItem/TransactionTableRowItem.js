import React from 'react'
import { string, any } from 'prop-types'
// import { css } from '@emotion/core'

// const styles = css`
//   .header {
//     font-weight: bold;
//   }
// `

function TransactionTableRowItem ({ dataTestid, children }) {
  return (
    <td data-testid={dataTestid}>{children}</td>
  )
}

TransactionTableRowItem.propTypes = {
  dataTestid: string,
  children: any
}

export default TransactionTableRowItem
