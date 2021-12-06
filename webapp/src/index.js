import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { IntlProvider } from 'react-intl'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'

const queryParams = new URLSearchParams(window.location.search)
const i18n = queryParams.get('i18n')
const locale = (i18n) ? 'pirate' : 'en' // TODO Time permitting implement the rest of i18n

ReactDOM.render(
  (
    <div data-app-init=''>
      <IntlProvider locale={locale}>
        <ApolloProvider client={client}>
          <AppRouter />
        </ApolloProvider>
      </IntlProvider>
    </div>
  ),
  document.getElementById('react-app')
)
