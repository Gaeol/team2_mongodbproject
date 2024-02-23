const Input = require('../userInput'); 
const Menu = require('../menu/menu'); 
const orders = require('../orders');

async function nonCostomer(client){
  console.log('1.주문하기 2.뒤로가기 3.종료');
  while(true){
    try{
      let select = await Input.getUserInput();
      if (select === '1') {
        await orders.displayMenu(client);
      }else if(select === '2'){
        return true;
      }else if(select === '3'){
        process.exit();
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}

module.exports = {nonCostomer};