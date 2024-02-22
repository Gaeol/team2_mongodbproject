const { getUserInput } = require('./userInput');

main().catch(console.error);

async function deleteAccount(client, mongoCafe, Customers){
  console.log("삭제할 회원의 이름을 입력하세요")
  const delName = await getUserInput()
  let myqry = { Name: delName };
  const result = await client.db(mongoCafe).collection(Customers).deleteOne(myqry);
  console.log("계정이 삭제되었습니다");

 //  var myqry = {"price":{$gt:10000}};
 //  const result = await client.db(dbname).collection(colname).deleteMany(myqry);
 //  console.log("Documents Deleted");
};

module.exports = {deleteAccount};

// await deleteAccount(client, "mongoCafe", "Customers");