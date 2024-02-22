const Input = require('../userInput'); 
const Updatedocuments = require('../update')

async function upCustomer(client){
  while(true){
  console.log('1.회원아이디 2.이름 3.생년월일 4.전화번호 5.카드번호, 6.결제비밀번호 7.뒤로가기 8.종료');
  let select = await Input.getUserInput();
  if (select === '1') {
    console.log('변경할 아이디를 입력하세요')
    let id= await Input.getUserInput();
    //수정함수
  }else if(select === '2'){
    console.log('변경할 이름을 입력하세요')
    let name= await Input.getUserInput();
  }else if(select === '3'){
    console.log('변경할 생년월일을 입력하세요')
    let birth= await Input.getUserInput();
  }else if(select === '4'){
    // console.log('변경할 전화번호을 입력하세요')
    // let phone= await Input.getUserInput();
    await Updatedocuments.updateDocuments(client, "mongoCafe", "Customers");

  
  }else if(select === '5'){
    console.log('변경할 카드번호을 입력하세요')
    let card= await Input.getUserInput();
  }else if(select === '6'){
    console.log('변경할 결제비밀번호을 입력하세요')
    let pwd= await Input.getUserInput();
  }else if(select === '7'){
    return true;
  }else if(select === '8'){
    process.exit();
  }
  }
}
module.exports = {upCustomer};