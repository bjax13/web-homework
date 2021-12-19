import { defineMessages } from 'react-intl'

const messages = {
  credit: {
    defaultMessage: 'Credit',
    id: 'transaction.tabel.cell.value.credit'
  },
  debit: {
    defaultMessage: 'Debit',
    id: 'transaction.tabel.cell.value.debit'
  },
  delete: {
    defaultMessage: 'Delete',
    id: 'transaction.tabel.cell.value.delete'
  },
  edit: {
    defaultMessage: 'Edit',
    id: 'transaction.tabel.cell.value.edit'
  }
}

const definedMessages = defineMessages(messages)

export default definedMessages
