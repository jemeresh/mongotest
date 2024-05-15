const { MongoClient, CURSOR_FLAGS } = require("mongodb");
const url = "mongodb://127.0.0.1/";
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("users");
    const cursor = await collection.find({}).sort({first_name: -1})
    while (await cursor.hasNext()) {
      const data = await cursor.next()
      console.log(data)
    }
    // console.log(array.length);
  } catch (err) {
    console.error(err);
  }finally {
    client.close()
  }
})(); //нужны для того, чтобы вызвать эту функцию сразу после ее объявления.

