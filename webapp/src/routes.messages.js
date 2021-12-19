import { defineMessages } from 'react-intl'

const messages = {
  home: {
    defaultMessage: 'Home',
    id: 'transaction.route.tab.home'
  },
  users: {
    defaultMessage: 'Users',
    id: 'transaction.route.tab.users'
  },
  merchants: {
    defaultMessage: 'Merchants',
    id: 'transaction.route.tab.merchants'
  }
}

const definedMessages = defineMessages(messages)

export default definedMessages
