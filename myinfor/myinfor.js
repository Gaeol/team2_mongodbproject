const Input = require('../userInput'); 
const UpCustomer = require('../upCustomer/upCustomer'); 
const Insert = require('../insert'); 
const DeleteAccount = require('../delete')
const Updatedocuments = require('../update')


async function myinfor(client,user){
  while(true){
  console.log('1.수정 2.계정탈퇴 3.뒤로가기 4.종료 5.계정삽입연습');
  let select = await Input.getUserInput();
  if (select === '1') {
    await UpCustomer.upCustomer(client,user);
  }else if(select === '2'){
    console.log('정말로 탈퇴하시겠습니까?');
    console.log('1.예 2.아니오')
    let select_2 = await Input.getUserInput();
    if(select_2 === '1'){
      await DeleteAccount.deleteAccount(client, "mongoCafe", "Customers",user)
    }else{
      console.log('취소되었습니다')
    }
  }else if(select === '3'){
    return;
  }else if(select === '4'){
    process.exit();
  }else if(select === '5'){
    await Insert.userInsert(client, "mongoCafe", "Customers", {
    "name":"송동현", "birhhdate":"1999-07-28", "phoneNumber":" 010-2003-2718", "totalPayment":1000, "membershipLevel" : "Bonze", "cardNumber": "1234-5679-1234-5678", "paymentPassword":7536 
    });
  }
  }
}
module.exports = {myinfor};