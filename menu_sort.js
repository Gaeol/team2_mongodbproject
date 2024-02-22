const {MongoClient} = require('mongodb');

async function main(){
  const uri = process.env.DB_LOCAL_URL;
  // const uri = process.env.DB_ATLAS_URL;
  // console.log(uri);
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await sortdocs(client, "mongoCafe", "Menu");
  } finally {
    await client.close();
  }
};

main().catch(console.error);

async function sortdocs(client, dbname, colname){
  var mysort = { _id : 1 };
  //  var mysort = { Name: -1 };
  const result = await client.db(dbname).collection(colname).find({}).sort(mysort).toArray();
  result.forEach(element => {
    console.log(element);
  });
};
