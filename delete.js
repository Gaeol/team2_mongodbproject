const {MongoClient} = require('mongodb');
const { getUserInput } = require('./userInput');
async function main(){
  // const uri = process.env.DB_LOCAL_URL;
  const uri = process.env.DB_ATLAS_URL;
  console.log(uri);

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await deleteAccount(client, mongoCafe, Customers);
  } finally {
    await client.close();
  }
};

main().catch(console.error);

async function deleteAccount(client, mongoCafe, Customers){
  
  console.log("삭제할 회원의 이름을 입력하세요.")
  const delName = await(getUserInput);
  let myqry = { name: delName };
  const result = await client.db(mongoCafe).collection(Customers).deleteOne(myqry);
  // return result
  console.log(`{$name}님의 계정이 삭제되었습니다.`);
};