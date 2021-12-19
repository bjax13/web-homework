import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { IntlProvider } from 'react-intl'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'
import en from './lang/en.json'
import pirate from './lang/pirate.json'

const queryParams = new URLSearchParams(window.location.search)
const i18n = queryParams.get('i18n')
const locale = i18n ? 'pirate' : 'en'
const messages = {
  en,
  pirate
}

ReactDOM.render(
  <div data-app-init=''>
    <IntlProvider defaultLocale='en' locale={locale} messages={messages[locale]}>
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    </IntlProvider>
  </div>,
  document.getElementById('react-app')
)
