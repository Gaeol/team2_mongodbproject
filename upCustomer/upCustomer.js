const Input = require('../userInput'); 
const Updatedocuments = require('../update')
const Exam = require('../exam')

async function upCustomer(client,user){
  while(true){
  console.log('1.회원아이디 2.이름 3.생년월일 4.전화번호 5.카드번호, 6.결제비밀번호 7.뒤로가기 8.종료');
  let select = await Input.getUserInput();
  if (select === '1') {
    console.log('변경하고 싶은 아이디를 입력하세요');
    let id= await Input.getUserInput();
    id= await Exam.examId(client, "mongoCafe", "Customers", id)
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "customer_id" ,id ,user);

  }else if(select === '2'){
    console.log('변경할 이름을 입력하세요')
    let name= await Input.getUserInput();
    name= await Exam.examId(client, "mongoCafe", "Customers", name)
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "name", name ,user);

  }else if(select === '3'){
    console.log('변경할 생년월일을 입력하세요')
    let birth1= await Input.getUserInput();
    birth1= await Exam.examId(client, "mongoCafe", "Customers", birth1)
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "birthDate", birth1 , user);

  }else if(select === '4'){
    console.log('새로운 전화번호를 입력하세요:');
    let phone = await Input.getUserInput();
    phone= await Exam.examId(client, "mongoCafe", "Customers", phone)
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "phoneNumber", phone ,user);

  }else if(select === '5'){
    console.log('새로운 카드 정보를 입력하세요:');
    let card = await Input.getUserInput();
    card= await Exam.examId(client, "mongoCafe", "Customers", card)
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "cardNumber", card, user);
  
  }else if(select === '6'){
    console.log('새로운 결제 비밀번호를 입력하세요:');
    let password = await Input.getUserInput();
    password= await Exam.examId(client, "mongoCafe", "Customers", password)
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "paymentPassword", password, user);

  }else if(select === '7'){
    return true;
  }else if(select === '8'){
    console.log('mongoCafe~를 이용해주셔서 감사합니다^^')
    process.exit();
  }
  }
}

async function upCustomerManage(client,user){
  while(true){
  console.log('1.회원아이디 2.이름 3.생년월일 4.전화번호 5.카드번호, 6.결제비밀번호 7.회원등급 8.뒤로가기 9.종료');
  let select = await Input.getUserInput();
  if (select === '1') {
    console.log('변경하고 싶은 아이디를 입력하세요');
    let id= await Input.getUserInput();
    id= await Exam.examId(client, "mongoCafe", "Customers", id)
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "customer_id", id ,user);

  }else if(select === '2'){
    console.log('변경할 이름을 입력하세요')
    let name= await Input.getUserInput();
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "name", name ,user);

  }else if(select === '3'){
    console.log('변경할 생년월일을 입력하세요')
    let birth1= await Input.getUserInput();
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "birthDate", birth1 , user);

  }else if(select === '4'){
    console.log('새로운 전화번호를 입력하세요:');
    let phone = await Input.getUserInput();
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "phoneNumber", phone ,user);

  }else if(select === '5'){
    console.log('새로운 카드 정보를 입력하세요:');
    let card = await Input.getUserInput();
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "cardNumber", card, user);
  
  }else if(select === '6'){
    console.log('새로운 결제 비밀번호를 입력하세요:');
    let password = await Input.getUserInput();
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "paymentPassword", password, user);
  }else if(select === '7'){
    console.log('수정할 등급를 입력하세요:');
    let level = await Input.getUserInput();
    let ex=1;
    while(ex===1){
      if (level !== "Bronze" && level !== "Silver" && level !== "Gold"  ){
        console.log('존재하지 않는 등급입니다. 다시 입력해주세요');
        level = await Input.getUserInput();
      }else {
        await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "membershipLevel", level, user);
        ex=2;
      }
    }
  }else if(select === '8'){
    return true;
  }else if(select === '9'){
    console.log('mongoCafe~를 이용해주셔서 감사합니다^^')
    process.exit();
  }
  }
}

module.exports = {upCustomer, upCustomerManage};
