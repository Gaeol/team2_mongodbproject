const Input = require('../userInput');
const Join = require('../Join/join');
const Login = require('../login/login');
const NotCustomer = require('../notCustomer/notCustomer');

async function customers(){
  console.log('1.회원가입 2.로그인 3.비회원 4.뒤로가기 5.종료');
  let select = await Input.getUserInput();
    if (select === '1') {
      Join.join();
    }else if (select === '2'){
      Login.login();
    }else if (select === '3'){
      NotCustomer.nonCostomer();
    }else if (select === '4'){
      return;
    }
    else if (select === '5'){
      process.exit();
    }
  }
module.exports = {customers};