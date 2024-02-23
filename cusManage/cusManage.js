const Input = require('../userInput'); 
const UpCustomer = require('../upCustomer/upCustomer'); 
const Joining = require('../join/join.js');
const DeleteAccount = require('../delete')

async function cusManage(client, dbname, colname){
  while(true){
  const result = await client.db(dbname).collection("Orders").find({}).sort({_id :-1}).toArray();
  console.log(`오늘의 몽고커피 총 방문손님 수는 ${result[0]['_id']} 명입니다`)

  console.log('--------------------------고객 리스트-------------------------')
  const resultUser = await client.db(dbname).collection(colname).find({}).project({"_id": 0}).toArray();
  console.table(resultUser);
  console.log('');
  console.log('1.회원정보 수정 2.회원계정 추가 3.회원계정삭제 4.뒤로 5.종료하기')
  let select = await Input.getUserInput();
  if (select === '1') {
    console.log('수정할 계정 아이디를 입력하세요')
    let user = await Input.getUserInput();
    await UpCustomer.upCustomer(client,user);
    
  }else if(select === '2'){
    await Joining.registerUser(client);
  }else if(select === '3'){
    console.log('삭제할 계정 아이디를 입력하세요')
    let user= await Input.getUserInput();
    await DeleteAccount.deleteAccount(client, "mongoCafe", "Customers",user)
  }else if(select === '4'){
    return true;
  }else if(select === '5'){
    console.log('mongoCafe~를 이용해주셔서 감사합니다^^')
    process.exit();
  }

  }
}

module.exports = {cusManage};