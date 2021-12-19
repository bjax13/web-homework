import React from 'react'
import { array, string } from 'prop-types'
import { styles } from './TransactionChart.styles'
import Chart from 'react-google-charts'
import messages from './TransactionChart.messages'
import { FormattedMessage } from 'react-intl'

function TransactionChart ({ title, data }) {
  return (
    <div css={styles}>
      <Chart
        chartType='PieChart'
        data={data}
        height={'300px'}
        loader={(
          <div>
            <FormattedMessage {...messages.loading} />
          </div>
        )}
        options={{
          title
        }}
        rootProps={{ 'data-testid': '1' }}
        width={'500px'}
      />
    </div>
  )
}

TransactionChart.propTypes = {
  title: string,
  data: array
}

TransactionChart.defaultProps = {
  title: 'Chart Title',
  data: []
}

export default TransactionChart
