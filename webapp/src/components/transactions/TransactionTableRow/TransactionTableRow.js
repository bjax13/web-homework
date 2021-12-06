import React from 'react'
import { any, arrayOf, string, bool, number, shape, func } from 'prop-types'
// import { css } from '@emotion/core'
import TransactionTableRowItem from '../TransactionTableRowItem/TransactionTableRowItem'
import { makeDataTestId, convertToRoman } from '../TransactionTable.utils'
import { AMOUNT_TYPE, DEBIT_TYPE, CREDIT_TYPE } from './TransactionTableRow.utils'
import Button from '../../general/Button/Button'

// const styles = css` //TODO time permitting add CSS
//   .header {
//     font-weight: bold;
//   }
// `

function TransactionTableRow ({ rowCells, transaction, onEdit, onDelete, isRomanNumeral }) {
  const { id: transactionId } = transaction

  // TODO time permitting add logic to combine Debit and Credit Columns
  const getTableValue = (rowItem) => {
    switch (rowItem.cell.type) {
      case AMOUNT_TYPE:
        return isRomanNumeral ? convertToRoman(rowItem.cell?.value) : rowItem.cell?.value
      case DEBIT_TYPE:
        return rowItem.cell?.value ? 'Debit' : ''
      case CREDIT_TYPE:
        return rowItem.cell?.value ? 'Credit' : ''
      default:
        return rowItem.cell?.value
    }
  }

  return (
    <>
      <tr data-testid={`transaction-${transactionId}`} key={`transaction-${transactionId}`}>
        {rowCells.map((rowItem) => (
          <TransactionTableRowItem dataTestid={rowItem.dataTestid} key={rowItem.dataTestid}>
            {getTableValue(rowItem)}
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
