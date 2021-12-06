const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLID, GraphQLNonNull } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount }) {
        return new TransactionModel({ user_id, description, merchant_id, debit, credit, amount })
          .save()
          .then(result => {
            return { ...result._doc, id: result._doc._id.toString() }
          })
          .catch(error => {
            throw error
          })
      }
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve (parent, args) {
        return TransactionModel.findByIdAndDelete(args.id)
          .then(result => {
            return { ...result._doc, id: result._doc._id.toString() }
          })
          .catch(error => {
            throw error
          })
      }
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      resolve (parent, args) {
        return TransactionModel.findByIdAndUpdate(args.id, args, (err, Profile) => {
          if (err) {
            return err
          }
        })
          .then(result => {
            return { ...result._doc, id: result._doc._id.toString() }
          })
          .catch(error => {
            throw error
          })
      }
    }
  }
})

module.exports = mutation
