import { render, getByTestId, fireEvent, getByText } from '@testing-library/react'
import React from 'react'
import TransactionTable from './TransactionTable'
import { MockedProvider } from '@apollo/react-testing'
import { client } from '../../network/apollo-client'
import { IntlProvider } from 'react-intl'

const mockData = [
  {
    id: '61add94066be4c252121c11b',
    user_id: null,
    description: 'Jeffery buying Pizza',
    merchant_id: null,
    debit: true,
    credit: false,
    amount: 67
  },
  {
    id: '61add94066be4c252121c11c',
    user_id: null,
    description: 'Madeline buying blue',
    merchant_id: null,
    debit: false,
    credit: true,
    amount: 949
  },
  {
    id: '61add94066be4c252121c140',
    user_id: null,
    description: 'Cleora buying withdrawal',
    merchant_id: null,
    debit: false,
    credit: true,
    amount: 235
  }
]

describe('Transactions Table', () => {
  test('renders table', async () => {
    const { container } = render(
      <MockedProvider client={client}>
        <IntlProvider locale='en'>
          <TransactionTable data={mockData} />
        </IntlProvider>
      </MockedProvider>
    )

    expect(container).toMatchSnapshot()
  })
  test('should have all 3 transactions in the table', async () => {
    const { container } = render(
      <MockedProvider client={client}>
        <IntlProvider locale='en'>
          <TransactionTable data={mockData} />
        </IntlProvider>
      </MockedProvider>
    )

    expect(getByTestId(container, 'transaction-61add94066be4c252121c11b-id')).toHaveTextContent('61add94066be4c252121c11b')
    expect(getByTestId(container, 'transaction-61add94066be4c252121c11c-id')).toHaveTextContent('61add94066be4c252121c11c')
    expect(getByTestId(container, 'transaction-61add94066be4c252121c140-id')).toHaveTextContent('61add94066be4c252121c140')
  })
  test('nubers should be roman after toggle to roman is clicked', async () => {
    const { container } = render(
      <MockedProvider client={client}>
        <IntlProvider locale='en'>
          <TransactionTable data={mockData} />
        </IntlProvider>
      </MockedProvider>
    )

    expect(getByTestId(container, 'transaction-61add94066be4c252121c11b-amount')).toHaveTextContent('67')
    fireEvent.click(getByText(container, 'Toggle Roman Numeral'))
    expect(getByTestId(container, 'transaction-61add94066be4c252121c11b-amount')).toHaveTextContent('IXII')
  })
})
