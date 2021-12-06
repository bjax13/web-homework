const faker = require('faker')
const MongoClient = require('mongodb').MongoClient

const MONGO_URI = 'mongodb://localhost:27017/graphql'

function randomIntFromInterval (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function seedDB () {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true
  })

  try {
    await client.connect()
    console.log('Connected')

    const collection = client.db('graphql').collection('transactions')
    collection.drop()
    let transactionData = []

    for (let i = 0; i < 50; i++) {
      const firstName = faker.name.firstName()
      let newTransaction = {
        amount: randomIntFromInterval(1, 1000),
        credit: i % 2,
        debit: (i + 1) % 2,
        description: `${firstName} buying ${faker.random.word()}`
        // merchant_id: string,
        // user_id: string,
      }

      transactionData.push(newTransaction)
    }
    collection.insertMany(transactionData)

    console.log('Database seeded! :)')
    client.close()
  } catch (err) {
    console.log('Error! :(')
    console.log(err.stack)
  }
}

seedDB()
