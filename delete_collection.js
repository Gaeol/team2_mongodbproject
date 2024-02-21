const {MongoClient} = require('mongodb');

async function deleteDoc(client, dbname, colname){
  // const result = await client.db(dbname).collection(colname).drop();
  const result = await client.db(dbname).dropCollection(colname);
  console.log("Collection dropped");
}

module.exports = {deletDoc}