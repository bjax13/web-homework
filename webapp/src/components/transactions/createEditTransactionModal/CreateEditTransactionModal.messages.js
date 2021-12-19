import { defineMessages } from 'react-intl'

const messages = {
  cancel: {
    defaultMessage: 'Cancel',
    id: 'transaction.modal.button.cancel'
  },
  enterAmount: {
    defaultMessage: 'Enter Amount',
    id: 'transaction.modal.placeholder.enterAmount'
  },
  enterDescription: {
    defaultMessage: 'Enter Description',
    id: 'transaction.modal.placeholder.enterDescription'
  },
  submit: {
    defaultMessage: 'Submit',
    id: 'transaction.modal.button.submit'
  },
  transactionType: {
    defaultMessage: 'Transaction Type:',
    id: 'transaction.modal.label.transactionType'
  }
}

const definedMessages = defineMessages(messages)

export default definedMessages
