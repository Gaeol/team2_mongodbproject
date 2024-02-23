const Input = require('../userInput'); 

async function cusManage(client, dbname, colname){
  const result = await client.db(dbname).collection("Orders").find({}).sort({_id :-1}).toArray();
  console.log(`오늘의 몽고커피 총 방문손님 수는 ${result[0]['_id']} 명입니다`)
}

module.exports = {cusManage};