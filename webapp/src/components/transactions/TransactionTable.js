import React, { useState, useEffect } from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
import { useMutation } from '@apollo/client'
import { FormattedMessage, useIntl } from 'react-intl'
import CreateTransaction from '../../gql/transactionsCreate.gql'
import UpdateTransaction from '../../gql/transactionsUpdate.gql'
import DeleteTransaction from '../../gql/transactionsDelete.gql'
import TransactionTableRow from './TransactionTableRow/TransactionTableRow'
import { getRowCells, TRANSACTION_TYPES, columnProperties } from './TransactionTable.utils'
import CreateEditTransactionModal from './createEditTransactionModal/CreateEditTransactionModal'
import TransactionTableColumnHeader from './TransactionTableColumnHeader/TransactionTableColumnHeader'
import Button from '../general/Button/Button'
import TransactionChart from './transactionChart/TransactionChart'
import messages from './TransactionTable.messages'

const styles = css`
  .header {
    font-weight: bold;
  }
`
function TransactionTable ({ data }) {
  const [createTransaction] = useMutation(CreateTransaction)
  const [updateTransaction] = useMutation(UpdateTransaction)
  const [deleteTransaction] = useMutation(DeleteTransaction)
  const [tabledata, setTableData] = useState(data)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRomanNumeral, setIsRomanNumeral] = useState(false)
  const [isModalEditMode, setModalEditMode] = useState(false)
  const [seedTransactionToEdit, setSeedTransactionToEdit] = useState({})
  const intl = useIntl()

  useEffect(() => {
    setTableData(data)
  }, [data])

  const handleEditTransaction = (transaction) => {
    setSeedTransactionToEdit(transaction)
    setModalEditMode(true)
    setIsModalOpen(true)
  }

  const handleDeleteTransaction = (id) => {
    deleteTransaction({ variables: { deleteTransactionId: id } }).then(
      ({
        data: {
          deleteTransaction: { id: deletedTransactionId }
        }
      }) => {
        const deletedTransactionIndex = tabledata.findIndex((transaction) => transaction.id === deletedTransactionId)

        if (deletedTransactionIndex !== -1) {
          const newTabledata = [...tabledata]
          newTabledata.splice(deletedTransactionIndex, 1)
          setTableData(newTabledata)
        }
      }
    )
  }

  const handleModalSubmit = (transactionValues, isEdit) => {
    const { id, amount = 0, description = '', transactionType = 'TRANSACTION_TYPES.DEBIT' } = transactionValues
    let variables = {
      amount: parseFloat(amount),
      description: description
    }

    if (transactionType === TRANSACTION_TYPES.CREDIT || TRANSACTION_TYPES.DEBIT) {
      variables = {
        ...variables,
        [transactionType]: true
      }
    }
    if (isEdit) {
      variables = {
        ...variables,
        updateTransactionId: id
      }
      updateTransaction({ variables }).then(({ data: { updateTransaction } }) => {
        const { id: updateTransactionId } = updateTransaction

        variables = {}
        setIsModalOpen(false)
        setModalEditMode(false)
        const editedTransactionIndex = tabledata.findIndex((transaction) => transaction.id === updateTransactionId)

        if (editedTransactionIndex !== -1) {
          const newTabledata = [...tabledata]
          newTabledata.splice(editedTransactionIndex, 1, updateTransaction)
          setTableData(newTabledata)
        }
      })
    } else {
      createTransaction({ variables }).then(({ data: { addTransaction } }) => {
        variables = {}
        setIsModalOpen(false)
        setTableData([...tabledata, addTransaction])
      })
    }
  }

  const handleCreateModalOpen = () => {
    setModalEditMode(false)
    setIsModalOpen(true)
  }

  const getChartData = () => {
    const chartData = tabledata.map(({ description, amount }) => [description, amount])
    chartData.unshift(['description', 'amount']) // add column header nessisary for data
    return chartData
  }

  return (
    <>
      <Button onClick={() => setIsRomanNumeral(!isRomanNumeral)}>
        <FormattedMessage {...messages.romanNumeral} />
      </Button>
      {!isModalOpen && (
        <Button onClick={handleCreateModalOpen}>
          <FormattedMessage {...messages.createTransaction} />
        </Button>
      )}
      <TransactionChart data={getChartData()} title={intl.formatMessage({ ...messages.comparitiveTransaction })} />
      <table css={styles}>
        <tbody>
          <tr className='header'>
            {columnProperties.map(({ text, type }) => (
              <TransactionTableColumnHeader key={type}>{text}</TransactionTableColumnHeader>
            ))}
          </tr>
          {tabledata.map((transaction) => (
            <TransactionTableRow
              isRomanNumeral={isRomanNumeral}
              key={transaction.id}
              onDelete={handleDeleteTransaction}
              onEdit={handleEditTransaction}
              rowCells={getRowCells(transaction)}
              transaction={transaction}
            />
          ))}
        </tbody>
      </table>
      <CreateEditTransactionModal
        isEdit={isModalEditMode}
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        seedTransactionToEdit={seedTransactionToEdit}
      />
    </>
  )
}

TransactionTable.propTypes = {
  data: arrayOf(
    shape({
      id: string,
      user_id: string,
      description: string,
      merchant_id: string,
      debit: bool,
      credit: bool,
      amount: number
    })
  )
}

export default TransactionTable
