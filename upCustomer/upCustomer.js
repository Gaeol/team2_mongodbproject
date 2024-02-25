const Input = require('../userInput'); 
const Updatedocuments = require('../update')

async function upCustomer(client,user){
  while(true){
  console.log('1.회원아이디 2.이름 3.생년월일 4.전화번호 5.카드번호, 6.결제비밀번호 7.뒤로가기 8.종료');
  let select = await Input.getUserInput();
  if (select === '1') {

       console.log(`${user}님, 새로운 회원아이디를 입력해주세요:`);
    let NewId = await Input.getUserInput();
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "customer_id", NewId ,user)

  }else if(select === '2'){

    console.log(`${user}님, 이름을 입력해주세요:`);
    let oldName = await Input.getUserInput();
    console.log('새로운 이름을 입력해주세요 :');
    let newName = await Input.getUserInput();
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "name", oldName, newName ,user);

  }else if(select === '3'){

    console.log(`${user}님, 생년월일을 입력해주세요:`);
    let oldBirth = await Input.getUserInput();
    console.log('새로운 생년월일을 입력해주세요:');
    let newBirth = await Input.getUserInput();
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "birthDate", oldBirth, newBirth ,user);

  
  }else if(select === '4'){

    console.log(`${user}님, 본인인증을 위해 전화번호의 현재 값을 입력하세요:`);
    let oldPhone = await Input.getUserInput();
    console.log('새로운 전화번호를 입력하세요:');
    let newPhone = await Input.getUserInput();
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "phoneNumber", oldPhone, newPhone ,user);

  }else if(select === '5'){

    console.log(`${user.customer_id}님, 현재 카드 정보를 입력하세요:`);
    let oldCard = await Input.getUserInput();
    console.log('새로운 카드 정보를 입력하세요:');
    let newCard = await Input.getUserInput();
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "cardNumber", oldCard, newCard);
  
  }else if(select === '6'){

    console.log(`${user}님, 현재 결제 비밀번호를 입력해주세요:`);
    let oldPayment = await Input.getUserInput();
    console.log('새로운 결제 비밀번호를 입력하세요:');
    let newPayment = await Input.getUserInput();
    await Updatedocuments.updatedocuments(client, "mongoCafe", "Customers", "paymentPassword", oldPayment, newPayment,user);

  }else if(select === '7'){
    return true;
  }else if(select === '8'){
    console.log('mongoCafe~를 이용해주셔서 감사합니다^^')
    process.exit();
  }
  }
}
module.exports = {upCustomer};
