const {MongoClient} = require('mongodb');

async function main(){
  // const uri = process.env.DB_LOCAL_URL;
  const uri = process.env.DB_ATLAS_URL;
  // console.log(uri);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await dropcol(client, "mongoCafe", "sample_airbnb");
  } finally {
    await client.close();
  }
}
main().catch(console.error);


async function dropcol(client, dbname, colname){
  // const result = await client.db(dbname).collection(colname).drop();
  const result = await client.db(dbname).dropCollection(colname);
  console.log("Collection dropped");
}
