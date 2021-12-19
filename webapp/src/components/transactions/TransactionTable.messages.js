import { defineMessages } from 'react-intl'

const messages = {
  amount: {
    defaultMessage: 'Amount',
    id: 'transaction.tabel.title.amount'
  },
  description: {
    defaultMessage: 'Description',
    id: 'transaction.tabel.title.description'
  },
  id: {
    defaultMessage: 'ID',
    id: 'transaction.tabel.title.id'
  },
  createTransaction: {
    defaultMessage: 'Create Transaction',
    id: 'transaction.tabel.button.createTransaction'
  },
  comparitiveTransaction: {
    defaultMessage: 'Comparitive Transaction Sizes',
    id: 'transaction.graph.title.comparitiveTransaction'
  },
  romanNumeral: {
    defaultMessage: 'Toggle Roman Numeral',
    id: 'transaction.tabel.button.romanNumeral'
  }
}

const definedMessages = defineMessages(messages)

export default definedMessages
