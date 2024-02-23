const Input = require('../userInput'); 
const Menu = require('../menu/menu'); 
// const Order = require('../order/order'); 
const Myinfor= require('../myinfor/myinfor'); 
const orders = require('../orders')

async function login_2(client,user){
  console.log('1.주문하기 2.내정보관리 3.뒤로가기 4종료');
  while(true){
    try{
      let select = await Input.getUserInput();
      if (select === '1') {
        await orders.displayMenu(client,user);
      }else if(select === '2'){
        //내정보보기함수
        await Myinfor.myinfor(client,user);
      }else if(select === '3'){
        return true;
      }else if(select === '4'){
        console.log('mongoCafe~를 이용해주셔서 감사합니다^^')
        process.exit();
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
module.exports = {login_2};