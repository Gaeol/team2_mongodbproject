const Input = require('../userInput');
const SalesCheck = require('../salesCheck/salesCheck');
const MenuCheck = require('../menu/menuCheck');
const StockCheck = require('../stockCheck/stockCheck');
const CusManage = require('../cusManage/cusManage');



async function employees(){
  console.log('1.매출확인 2.메뉴확인 3.재고관리 4.고객관리 5.뒤로가기 6.종료');
  let select = await Input.getUserInput();
    if (select === '1') {
      SalesCheck.salesCheck();
    }else if (select === '2'){
      MenuCheck.menuCheck();
    }else if (select === '3'){
      StockCheck.stockCheck();
    }else if (select === '4'){
      CusManage.cusManage();
    }else if (select === '5'){
      return ;
    }else if (select === '6'){
      process.exit();
    }
}
module.exports = {employees};