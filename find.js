const {MongoClient} = require('mongodb');

async function main(){

  const uri = process.env.DB_ATLAS_URL;
  // const uri = process.env.DB_ATLAS_URL;
  // console.log(uri);

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listall(client, "mongoCafe", "Menu");
  } finally {
    await client.close();
  }
};

main().catch(console.error);

async function listall(client, dbname, colname){
  const result = await client.db(dbname).collection(colname).find({}).toArray();
  console.table(result);
};
