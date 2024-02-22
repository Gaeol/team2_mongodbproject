const Input = require('../userInput'); 

async function order(){
  console.log('로그인페이지입니다.');
  console.log('1.전화번호입력 2.뒤로가기 3.종료');
  let select = await Input.getUserInput();
  if (select === '1') {
  
  }else if(select === '2'){
    return;
  }else if(select === '3'){
    process.exit();
  }
}
module.exports = {order};