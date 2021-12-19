import React, { useState, useEffect } from 'react'
import { func, bool, object } from 'prop-types'
import { TRANSACTION_TYPES } from '../TransactionTable.utils'
import { styles } from './CreateEditTransactionModal.styles'
import Button from '../../general/Button/Button'
import sharedMessages from '../../../lang/shared.messages'
import createEditTransactionModalMessages from './CreateEditTransactionModal.messages'
import { FormattedMessage, useIntl } from 'react-intl'

const messages = {
  ...sharedMessages,
  ...createEditTransactionModalMessages
}

function CreateEditTransactionModal ({ onCancel, onSubmit, isOpen, isEdit, seedTransactionToEdit }) {
  const handleKeyDown = () => {} // TODO handle keydown for accessability
  const [transactionValues, setTransactionValues] = useState({
    amount: null,
    description: null,
    transactionType: TRANSACTION_TYPES.DEBIT
  })
  const intl = useIntl()

  useEffect(() => {
    setTransactionValues(seedTransactionToEdit)
  }, [seedTransactionToEdit])

  const handleOnChange = ({ target: { value, name } }) => {
    setTransactionValues({
      ...transactionValues,
      [name]: value
    })
  }
  return (
    <div css={styles}>
      {isOpen && (
        <>
          <div className='modal-overlay' onClick={onCancel} onKeyDown={handleKeyDown} role='button' tabIndex={0} />
          <div className='modal'>
            <div className='modal-wrapper'>
              <h2>{`${isEdit ? 'Edit' : 'Create'} Transaction`}</h2>
              <div className='modal-content'>
                <input
                  name='amount'
                  onChange={handleOnChange}
                  placeholder={intl.formatMessage({ ...messages.enterAmount })}
                  type='number'
                  value={transactionValues.amount}
                />
                <input
                  name='description'
                  onChange={handleOnChange}
                  placeholder={intl.formatMessage({ ...messages.enterDescription })}
                  value={transactionValues.description}
                />

                <label htmlFor='type-select'>
                  <FormattedMessage {...messages.transactionType} />
                </label>
                <select
                  id='type-select'
                  name='transactionType'
                  onBlur={handleOnChange}
                  onChange={handleOnChange}
                  value={transactionValues.transactionType}
                >
                  <FormattedMessage {...messages.debit}>
                    {(message) => <option value={TRANSACTION_TYPES.DEBIT}>{message}</option>}
                  </FormattedMessage>
                  <FormattedMessage {...messages.credit}>
                    {(message) => <option value={TRANSACTION_TYPES.CREDIT}>{message}</option>}
                  </FormattedMessage>
                </select>
              </div>
              <div className='actions'>
                <Button onClick={() => onSubmit(transactionValues, isEdit)} type='submit'>
                  <FormattedMessage {...messages.submit} />
                </Button>
                <Button onClick={onCancel} type='button'>
                  <FormattedMessage {...messages.cancel} />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

CreateEditTransactionModal.propTypes = {
  isEdit: bool,
  isOpen: bool,
  onCancel: func,
  onSubmit: func,
  seedTransactionToEdit: object
}

CreateEditTransactionModal.defaultProps = {
  isEdit: false,
  isOpen: false,
  onCancel: Function.prototype,
  onSubmit: Function.prototype,
  seedTransactionToEdit: Object.prototype
}

export default CreateEditTransactionModal
