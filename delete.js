const { getUserInput } = require('./userInput');

async function deleteAccount(client, mongoCafe, Customers,user){
  // console.log("삭제할 회원의 이름을 입력하세요")
  // const delName = await getUserInput()
  let myqry = { "name": `${user}` };
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

// async function cancelOrder(client, mongoCafe, Orders){
//   console.log("삭제할 메뉴의 이름을 입력하세요")
//   const delMenu = await getUserInput()
//   let myqry = { "name": `${delMenu}` };
//   const result = await client.db(mongoCafe).collection(Menu).deleteOne(myqry);
//   console.log("메뉴가 삭제되었습니다");
// };

module.exports = {deleteAccount};
module.exports = {deleteMenu};

// await deleteAccount(client, "mongoCafe", "Customers");
// await deleteMenu(client, "mongoCafe", "Customers");
// await DeleteMenu.deleteMenu(client, "mongoCafe", "Customers")
// const DeleteMenu = require('../delete')