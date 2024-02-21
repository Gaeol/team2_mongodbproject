const {MongoClient} = require('mongodb');

async function main(){
  const uri = process.env.DB_LOCAL_URL;
  // const uri = process.env.DB_ATLAS_URL;
  // console.log(uri);
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await sortdocs(client, "mongoCafe", "collection");
  } finally {
    await client.close();
  }
};

main().catch(console.error);

async function sortdocs(client, dbname, colname){
  //  var qry = { ProductID: 3 };
  //  var vals = { $set: { Name: "Router", price: 2750 } };
  //  const result = await client.db(dbname).collection(colname).updateOne(qry, vals);

  var qry = {Name: /er$/};
  var vals = { $inc: { price: 125 } };
  const result = await client.db(dbname).collection(colname).updateMany(qry, vals);

  console.log(result)
  console.log("Documents updated");
};
