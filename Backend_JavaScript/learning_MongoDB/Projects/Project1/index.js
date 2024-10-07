const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1/myDatabase";
const client = new MongoClient(uri);

const main = async () => {
  await client.connect();
  const db = client.db("Students");
  const collection = db.collection("Intro");
  const data = await collection
    .aggregate([{ $match: { age: { $gt: 14 } } }])
    .toArray();
  console.log(data);
  await client.close();
};

main();
