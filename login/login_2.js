const Input = require('../userInput'); 
const Menu = require('../menu/menu'); 
const Order = require('../order/order'); 
const Myinfor= require('../myinfor/myinfor'); 

async function login_2(client){
  while(true){
  console.log('1.주문하기 2.내정보하기 3.뒤로가기 4종료');
  let select = await Input.getUserInput();
  if (select === '1') {
    //Menu.menu();
  }else if(select === '2'){
    //내정보보기함수
    await Myinfor.myinfor(client);
  }else if(select === '3'){
    return true;
  }else if(select === '4'){
    process.exit();
  }
  }
}
module.exports = {login_2};