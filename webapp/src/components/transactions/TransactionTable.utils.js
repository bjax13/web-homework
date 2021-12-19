import { createIntl, createIntlCache } from 'react-intl'
import sharedMessages from '../../lang/shared.messages'
import transactionTableMessages from './TransactionTable.messages'
import en from '../../lang/en.json'
import pirate from '../../lang/pirate.json'

const queryParams = new URLSearchParams(window.location.search)
const i18n = queryParams.get('i18n')
const locale = i18n ? 'pirate' : 'en'
const translationFiles = {
  en,
  pirate
}

const messages = {
  ...sharedMessages,
  ...transactionTableMessages
}

const cache = createIntlCache()
const intl = createIntl({ locale, messages: translationFiles[locale], cache })

export const TRANSACTION_TYPES = Object.freeze({
  CREDIT: 'credit',
  DEBIT: 'debit'
})

/*
  getRowCells builds the row cell datascructure using the column properties

  @param transactionId string - the transaction id
  @param fieldName string - A string representing the field

  @return string with a unique identifier for testing
*/
export const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

const sharedColumnProperties = [
  { type: 'id', text: intl.formatMessage({ ...messages.id }), value: 'id' },
  { type: 'description', text: intl.formatMessage({ ...messages.description }), value: 'description' },
  { type: 'debit', text: intl.formatMessage({ ...messages.debit }), value: 'debit' },
  { type: 'credit', text: intl.formatMessage({ ...messages.credit }), value: 'credit' },
  { type: 'amount', text: intl.formatMessage({ ...messages.amount }), value: 'amount' }
]

export const columnProperties = [
  ...sharedColumnProperties,
  { type: 'edit', text: intl.formatMessage({ ...messages.edit }), value: 'edit' },
  { type: 'delete', text: intl.formatMessage({ ...messages.delete }), value: 'delete' }
]

/*
  getRowCells builds the row cell datascructure using the column properties

  @param transaction object - The transaction that the row represents

  @return array An array of objects with the nessisary data for Row Cells
*/

export const getRowCells = (transaction = {}) => {
  const { id: transactionId } = transaction
  return sharedColumnProperties.map(({ type, value }) => {
    return {
      dataTestid: makeDataTestId(transactionId, type),
      cell: {
        type: type,
        value: transaction[value]
      }
    }
  })
}

/*
  convertToRoman takes an integer and returns the roman numeral representation of that number
  *Note* - used the following as a guide https://stackoverflow.com/a/36991687/7475250

  @param numberToBeConverted int - The number to be converted

  @return string the roman numeral
*/

export function convertToRoman (numberToBeConverted) {
  if (!Number.isInteger(numberToBeConverted)) {
    return numberToBeConverted
  }
  const romanLookup = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 }
  let roman = []
  let romanKeys = Object.keys(romanLookup)
  let portionOfNumberConvertedToNumeral
  let index
  let count = 1

  for (let numeral in romanLookup) {
    portionOfNumberConvertedToNumeral = romanLookup[numeral]
    index = romanKeys.indexOf(numeral)

    while (numberToBeConverted >= portionOfNumberConvertedToNumeral) {
      if (count < 4) {
        // push up to 3 of the same numeral
        roman.push(numeral)
      } else {
        // Note: We need to check previous index because it might be part of the current number.
        // Example:(9) would attempt (VIIII) so we would need to remove the V as well as the I's
        // otherwise removing just the last three III would be incorrect, because the swap
        // would give us (VIX) instead of the correct answer (IX)
        if (roman.indexOf(romanKeys[index - 1]) > -1) {
          // remove the previous numeral we worked with
          // and everything after it since we will replace them
          roman.splice(roman.indexOf(romanKeys[index - 1]))
          // push the current numeral and the one that appeared two iterations ago;
          // think (IX) where we skip (V)
          roman.push(romanKeys[index], romanKeys[index - 2])
        } else {
          // else Example:(4) would attemt (IIII) so remove three I's and replace with a V
          // to get the correct answer of (IV)

          // remove the last 3 numerals which are all the same
          roman.splice(-3)
          // push the current numeral and the one that appeared right before it; think (IV)
          roman.push(romanKeys[index], romanKeys[index - 1])
        }
      }
      // reduce our number by the value we already converted to a numeral
      numberToBeConverted -= portionOfNumberConvertedToNumeral
      count++
    }
    count = 1
  }
  return roman.join('')
}

convertToRoman(36)
