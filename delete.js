const {MongoClient} = require('mongodb');
async function main(){
  const uri = process.env.DB_LOCAL_URL;
  // const uri = process.env.DB_ATLAS_URL;
  // console.log(uri);

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await deldocs(client, "mongoCafe", "dataname");
  } finally {
    await client.close();
  }
};

main().catch(console.error);

async function deldocs(client, dbname, colname){
  var myqry = { Name: "TV" };
  const result = await client.db(dbname).collection(colname).deleteOne(myqry);
  console.log("Document Deleted");

  //  var myqry = {"price":{$gt:10000}};
  //  const result = await client.db(dbname).collection(colname).deleteMany(myqry);
  //  console.log("Documents Deleted");
};
