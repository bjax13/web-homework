import React from 'react'
import { any, arrayOf, string, bool, number, shape, func } from 'prop-types'
// import { css } from '@emotion/core'
import TransactionTableRowItem from '../TransactionTableRowItem/TransactionTableRowItem'
import { makeDataTestId, convertToRoman } from '../TransactionTable.utils'
import { AMOUNT_TYPE } from './TransactionTableRow.utils'
import Button from '../../general/Button/Button'

// const styles = css` //TODO time permitting add CSS
//   .header {
//     font-weight: bold;
//   }
// `

function TransactionTableRow ({ rowCells, transaction, onEdit, onDelete, isRomanNumeral }) {
  const { id: transactionId } = transaction
  return (
    <>
      <tr data-testid={`transaction-${transactionId}`} key={`transaction-${transactionId}`}>
        {rowCells.map((rowItem) => (
          <TransactionTableRowItem dataTestid={rowItem.dataTestid} key={rowItem.dataTestid}>
            {isRomanNumeral && rowItem.cell.type === AMOUNT_TYPE // TODO add logic so that credit/debit displays a value
              ? convertToRoman(rowItem.cell?.value)
              : rowItem.cell?.value}
          </TransactionTableRowItem>
        ))}
        <TransactionTableRowItem dataTestid={makeDataTestId(transactionId, 'onEdit')}>
          <Button onClick={() => onEdit(transaction)}>Edit</Button>
        </TransactionTableRowItem>
        <TransactionTableRowItem dataTestid={makeDataTestId(transactionId, 'onDelete')}>
          <Button onClick={() => onDelete(transactionId)}>Delete</Button>
        </TransactionTableRowItem>
      </tr>
    </>
  )
}

TransactionTableRow.propTypes = {
  rowCells: arrayOf(
    shape({
      dataTestid: string,
      cell: shape({
        type: string,
        value: any
      })
    })
  ),
  transaction: shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }),
  onEdit: func,
  isRomanNumeral: bool,
  onDelete: func
}

export default TransactionTableRow
