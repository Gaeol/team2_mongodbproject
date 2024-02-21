const {MongoClient} = require('mongodb');

async function main(){

  const uri = process.env.DB_ATLAS_URL;
  // const uri = process.env.DB_ATLAS_URL;
  // console.log(uri);

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await newcollection(client, "mongoCafe");
  } finally {
    await client.close();
  }
};

main().catch(console.error);

async function newcollection (client, dbname){
  const dbobj = await client.db(dbname);
  const collection = await dbobj.createCollection("Menu");
  console.log("Collection created");
  console.log(collection);
};
