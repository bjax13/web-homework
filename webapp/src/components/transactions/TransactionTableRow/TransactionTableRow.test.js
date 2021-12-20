import '@testing-library/jest-dom'
import React from 'react'
import { IntlProvider } from 'react-intl'
import TransactionTableRow from './TransactionTableRow'
import { render, fireEvent, getByText } from '@testing-library/react'

const mockCells = [
  {
    dataTestid: 'transaction-61add94066be4c252121c140-id',
    cell: {
      type: 'id',
      value: '61add94066be4c252121c140'
    }
  },
  {
    dataTestid: 'transaction-61add94066be4c252121c140-description',
    cell: {
      type: 'description',
      value: 'Cleora buying Bacon'
    }
  },
  {
    dataTestid: 'transaction-61add94066be4c252121c140-debit',
    cell: {
      type: 'debit',
      value: false
    }
  },
  {
    dataTestid: 'transaction-61add94066be4c252121c140-credit',
    cell: {
      type: 'credit',
      value: true
    }
  },
  {
    dataTestid: 'transaction-61add94066be4c252121c140-amount',
    cell: {
      type: 'amount',
      value: 235
    }
  }
]

const mockTransaction = {
  __typename: 'Transaction',
  id: '61add94066be4c252121c140',
  user_id: null,
  description: 'Cleora buying withdrawal',
  merchant_id: null,
  debit: false,
  credit: true,
  amount: 235
}

describe('Transactions Table', () => {
  const mockOnEdit = jest.fn()
  const mockOnDelete = jest.fn()

  const sharedProps = {
    isRomanNumeral: false,
    onDelete: mockOnDelete,
    onEdit: mockOnEdit,
    rowCells: mockCells,
    transaction: mockTransaction
  }

  test('renders table', async () => {
    const { container } = render(
      <IntlProvider locale='en'>
        <TransactionTableRow {...sharedProps} />
      </IntlProvider>
    )

    expect(container).toMatchSnapshot()
  })

  test('renders table row with buttons', async () => {
    const { container } = render(
      <IntlProvider locale='en'>
        <TransactionTableRow {...sharedProps} />
      </IntlProvider>
    )

    fireEvent.click(getByText(container, 'Edit'))
    expect(mockOnEdit).toHaveBeenCalled()
    fireEvent.click(getByText(container, 'Delete'))
    expect(mockOnDelete).toHaveBeenCalled()
  })
})
