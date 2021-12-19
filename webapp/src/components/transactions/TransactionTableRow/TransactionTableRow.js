import React from 'react'
import { any, arrayOf, string, bool, number, shape, func } from 'prop-types'
import TransactionTableRowItem from '../TransactionTableRowItem/TransactionTableRowItem'
import { makeDataTestId, convertToRoman } from '../TransactionTable.utils'
import { FormattedMessage, useIntl } from 'react-intl'
import { AMOUNT_TYPE, DEBIT_TYPE, CREDIT_TYPE } from './TransactionTableRow.utils'
import Button from '../../general/Button/Button'
import messages from '../../../lang/shared.messages'

function TransactionTableRow ({ rowCells, transaction, onEdit, onDelete, isRomanNumeral }) {
  const { id: transactionId } = transaction
  const intl = useIntl()

  const getTableValue = (rowItem) => {
    switch (rowItem.cell.type) {
      case AMOUNT_TYPE:
        return isRomanNumeral ? convertToRoman(rowItem.cell?.value) : rowItem.cell?.value
      case DEBIT_TYPE:
        return rowItem.cell?.value ? intl.formatMessage({ ...messages.debit }) : ''
      case CREDIT_TYPE:
        return rowItem.cell?.value ? intl.formatMessage({ ...messages.credit }) : ''
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
          <Button onClick={() => onEdit(transaction)}>
            <FormattedMessage {...messages.edit} />
          </Button>
        </TransactionTableRowItem>
        <TransactionTableRowItem dataTestid={makeDataTestId(transactionId, 'onDelete')}>
          <Button onClick={() => onDelete(transactionId)}>
            <FormattedMessage {...messages.delete} />
          </Button>
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
