const {MongoClient} = require('mongodb');

async function main(){
  const uri = process.env.DB_LOCAL_URL;
  // const uri = process.env.DB_ATLAS_URL;
  // console.log(uri);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await limitdocs(client, "mongoCafe", "collection");
  } finally {
    await client.close();
  }
};

main().catch(console.error);

async function limitdocs(client, dbname, colname){
  var myqry = {numPurchased:{$gte:10}};
  const result = await client.db(dbname).collection(colname).find({"numPurchased":{$gte:10}}).toArray();
  //  const result = await client.db(dbname).collection(colname).find({"numPurchased":{$gte:10}}).limit(1).toArray();
  // const result = await client.db(dbname).collection(colname).find({"numPurchased":{$gte:10}}).limit(1).skip(1).toArray();
  console.log(JSON.stringify(result));
};
