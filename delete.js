const { getUserInput } = require('./userInput');

async function deleteAccount(client, mongoCafe, Customers,user){
  let myqry = { "customer_id": `${user}` };
  const result = await client.db(mongoCafe).collection(Customers).deleteOne(myqry);
  console.log("계정이 삭제되었습니다");
};

async function deleteMenu(client, mongoCafe, Menu){
  console.log("삭제할 메뉴의 이름을 입력하세요")
  const delMenu = await getUserInput()
  let myqry = { "name": `${delMenu}` };
  const result = await client.db(mongoCafe).collection(Menu).deleteOne(myqry);
  console.log("메뉴가 삭제되었습니다");
};

module.exports = {deleteAccount,deleteMenu};
