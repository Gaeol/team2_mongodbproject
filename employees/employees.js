const Input = require('../userInput');
const SalesCheck = require('../salesCheck/salesCheck');
const MenuCheck = require('../menu/menuCheck');
const StockCheck = require('../stockCheck/stockCheck');
const CusManage = require('../cusManage/cusManage');



async function employees(client){
  while(true){
  console.log('1.매출확인 2.메뉴관리 3.재고관리 4.고객관리 5.뒤로가기 6.종료');
  let select = await Input.getUserInput();
    if (select === '1') {
      await SalesCheck.salesCheck(client, "mongoCafe", "Orders");
    }else if (select === '2'){
      await MenuCheck.menuCheck(client);
    }else if (select === '3'){
      await StockCheck.stockCheck(client, "mongoCafe", "Menu");
    }else if (select === '4'){
      await CusManage.cusManage(client);
    }else if (select === '5'){
      return ;
    }else if (select === '6'){
      process.exit();
    }
  }
}
module.exports = {employees};