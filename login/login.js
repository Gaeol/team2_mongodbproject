const Input = require('../userInput'); 
const Login_2 = require('../login/login_2'); 
const Exam =require('../exam');

async function login(client){    
  console.log('로그인페이지입니다.');
  //console.log('1.아이디입력 2.뒤로가기 3.종료');
  while(true){
    console.log('1.아이디입력 2.뒤로가기 3.종료');
    let select = await Input.getUserInput();
    if (select === '1') {
      console.log('아이디를 입력해주세요');
      let login_id = await Input.getUserInput();
      console.log('비밀번호를 입력해주세요');
      let login_pwd = await Input.getUserInput();
      const user  = await Exam.exam(client, "mongoCafe", "Customers", login_id, login_pwd)
      await Login_2.login_2(client, user);
    }else if(select === '2'){
      return true;
    }else if(select === '3'){
      console.log('mongoCafe~를 이용해주셔서 감사합니다^^')
      process.exit();
    }
  }
}
module.exports = {login};

