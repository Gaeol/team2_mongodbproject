//적어도 하나 이상의 컬렉션이 생성되어야 데이터베이스가 물리적으로 생성된다.
const {MongoClient} = require('mongodb');

async function main(){
  const uri = process.env.DB_ATLAS_URL;
  // const uri = process.env.DB_ATLAS_URL;
  // console.log(uri);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await createdb(client, "mongoCafe");       
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function createdb(client, dbname){
  const dbobj = await client.db(dbname);
  console.log("Database created");
  console.log(dbobj);
};
