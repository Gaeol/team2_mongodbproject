const Input = require('../userInput'); 

async function login_2(){
  console.log('1.주문하기 2.내정보하기 3.뒤로가기 4종료');
  let select = await Input.getUserInput();
  if (select === '1') {
    console.log('전화번호를 입력해주세요');
    let id = await Input.getUserInput();
    console.log(`로그인되었습니다. ${id}님 안녕하세요`)
  }else if(select === '2'){
    
  }else if(select === '3'){
    return;
  }else if(select === '4'){
    process.exit();
  }

}
module.exports = {login_2};