import React, { useState, useEffect } from 'react'
import { func, bool, object } from 'prop-types'
import { TRANSACTION_TYPES } from '../TransactionTable.utils'
import { styles } from './CreateEditTransactionModal.styles'
import Button from '../../general/Button/Button'

function CreateEditTransactionModal ({ onCancel, onSubmit, isOpen, isEdit, seedTransactionToEdit }) {
  const handleKeyDown = () => {} // TODO handle keydown for accessability
  const [transactionValues, setTransactionValues] = useState({
    amount: null,
    description: null,
    transactionType: TRANSACTION_TYPES.DEBIT
  })

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
                  placeholder='Enter amount'
                  type='number'
                  value={transactionValues.amount}
                />
                <input
                  name='description'
                  onChange={handleOnChange}
                  placeholder='Enter description'
                  value={transactionValues.description}
                />

                <label htmlFor='type-select'>Transaction Type:</label>
                <select
                  id='type-select'
                  name='transactionType'
                  onBlur={handleOnChange}
                  onChange={handleOnChange}
                  value={transactionValues.transactionType}
                >
                  <option value={TRANSACTION_TYPES.DEBIT}>Debit</option>
                  <option value={TRANSACTION_TYPES.CREDIT}>Credit</option>
                </select>
              </div>
              <div className='actions'>
                <Button onClick={() => onSubmit(transactionValues, isEdit)} type='submit'>
                  Submit
                </Button>
                <Button onClick={onCancel} type='button'>
                  Cancel
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
