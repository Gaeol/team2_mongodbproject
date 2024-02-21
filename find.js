const {MongoClient} = require('mongodb');

async function main(){

  const uri = process.env.DB_LOCAL_URL;
  // const uri = process.env.DB_ATLAS_URL;
  // console.log(uri);

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listall(client, "mongoCafe", "menu");
  } finally {
    await client.close();
  }
};

main().catch(console.error);

async function listall(client, dbname, colname){
  const result = await client.db(dbname).collection(colname).find({}).toArray();
  // const result = await client.db(dbname).collection(colname).find({"Name":"TV"}).toArray();
  // const result = await client.db(dbname).collection(colname).findOne({});  
  
  console.log(typeof(result));
  console.log(result);

  //  forEach loop
  // var count=0;
  // result.forEach(row => {
  //   count++;
  //   console.log(count, row['Name'], row['price']);
  // });

  console.log(typeof(JSON.stringify(result)));
  console.log(JSON.stringify(result));
};
