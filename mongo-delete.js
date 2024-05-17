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

// (async () => {
//   try {
//     await client.connect()
//     const db = client.db('test')
//     const collection = db.collection('users')
//     let result = await collection.findOne({id: 8888})
//     console.log(result)
//   await collection.deleteMany({id: 8888})
//     result = await collection.findOne({id: 8888})
//     console.log( result)
//   } catch (err) {
//     console.error(err)
//   } finally {
//     client.close()
//   }
// })(); // это hard delete, т.е полное удаление из БД

(async () => {
  try {
    await client.connect()
    const db = client.db("test");
    const collection = db.collection("users");
    let result = await collection.findOne({ id: 16 });
    await collection.updateMany({gender: 'M'}, {
    $set: {
      isDeleted: true
    }},
    { multi: true, upsert: false}
  )
  result = await collection.find({ gender: "M", isDeleted: false }).toArray();
  console.log(result);
  } catch (err) {
    console.error(err)
  } finally {
    client.close()
  }
})(); // это soft delete, т.е не удаляются из БД, а помечаются,как удаленые