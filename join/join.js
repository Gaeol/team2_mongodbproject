const Input = require('../userInput');
const Insert = require('../insert');

async function registerUser(client) {
  console.log('이름을 입력해주세요: ');
  let username = await Input.getUserInput();
  console.log('아이디을 입력해주세요: ');
  let userid = await Input.getUserInput();
  console.log('비밀번호를 입력해주세요: ');
  let pwd = await Input.getUserInput();
  console.log('전화번호를 입력해주세요: ');
  let phoneNumber = await Input.getUserInput();
  console.log('생년월일 6자리를 입력해주세요.(예시: 1999-07-28): ');
  let birthDate = await Input.getUserInput();
  console.log('카드번호 16자리를 입력해주세요: ');
  let cardNumber = await Input.getUserInput();

  await Insert.userInsert(client, "mongoCafe", "Menu", {
    "customer_id":parseInt(userid), "birthDate":`${birthDate}`, "name":`${username}`, "cardNumber":`${cardNumber}`,"paymentPassword":`${pwd}`,"totalPayment":parseInt(0),"membershipLevel": "Bronze","phoneNumber":`${phoneNumber}`});
  console.log('가입이 완료되었습니다')
}

module.exports = { registerUser };
