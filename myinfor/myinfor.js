const Input = require('../userInput'); 
const UpCustomer = require('../upCustomer/upCustomer'); 
const Insert = require('../insert'); 
const DeleteAccount = require('../delete')
const Updatedocuments = require('../update')

async function myinfor(client,user){
  //userinfo 가져오기
  console.log('My Profile');
  const database = client.db('mongoCafe'); // 데이터베이스 이름
  const collection = database.collection('Customers'); // 컬렉션 이름
  // const myInfo = await collection.find({"customer_id" : `${user}`}).toArray();
  
  const projection = { _id: 0,membershipLevel: 1, name: 1 , birthDate: 1, phoneNumber: 1, cardNumber: 1, 
    customer_id :1 ,totalPayment:1};
  const myInfo = await collection.find({"customer_id" : `${user}`}).project(projection).toArray(); 
  console.table(myInfo)
  
  while(true){
  console.log('1.수정 2.계정탈퇴 3.뒤로가기 4.종료');
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
    return true;
  }else if(select === '4'){
    console.log('mongoCafe~를 이용해주셔서 감사합니다^^')
    process.exit();
  }
  }
}
module.exports = {myinfor};