const Input = require('../userInput');
const Joining = require('../join/join.js');
const Login = require('../login/login');
const NotCustomer = require('../notCustomer/notCustomer');
const orders = require('../orders')

async function customers(client){
  while(true){
  console.log('1.회원가입 2.로그인 3.비회원 4.뒤로가기 5.종료');
  let select = await Input.getUserInput();
    if (select === '1') {
      await Joining.registerUser(client);
    }else if (select === '2'){
      await Login.login(client);
    }else if (select === '3'){
      await NotCustomer.nonCostomer(client);
    }else if (select === '4'){
      return;
    }
    else if (select === '5'){
      process.exit();
    }
  }
}
module.exports = {customers};