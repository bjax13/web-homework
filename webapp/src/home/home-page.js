import React from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactionsQuery.gql'
import TransactionTable from '../components/transactions/TransactionTable'

export function Home () {
  const { loading, error, data = {} } = useQuery(GetTransactions)

  if (loading) {
    return (
      <>
        Loading...
      </>
    )
  }

  if (error) {
    return (
      <>
        ¯\_(ツ)_/¯
      </>
    )
  }

  return (
    <>
      <TransactionTable data={data.transactions} />
    </>
  )
}
