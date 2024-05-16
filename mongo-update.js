const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1/";
const client = new MongoClient(url);

const obj ={
  id: 8888,
  first_name: 'Emili',
  last_name: 'Heelis',
  email: 'aheelislm@about.me',
  gender: 'Female',
  ip_address: '179.44.12.193',
  company: 'Tanoodle',
};

(async () => {
  try {
    await client.connect()
    const db = client.db('test')
    const collection = db.collection('users')
    let result = await collection.findOne({id: 5})
    console.log(result)

      await collection.updateMany(
        {gender:'Male'},
         {$set: {gender: 'M'}},
         {upsert: false, multi: true})
    const {length } = await collection.find({gender:'F'}).toArray()
    console.log(length)

  } catch (err) {
    console.error(err)
  } finally {
    client.close()
  }
})();


