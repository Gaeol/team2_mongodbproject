const Input = require('../userInput');
const Insert = require('../insert');
const Exam = require('../exam');

async function registerUser(client) {
  console.log('이름을 입력해주세요: ');
  let username = await Input.getUserInput();
  console.log('아이디을 입력해주세요: ');
  let userid = await Input.getUserInput();
  userid= await Exam.examId(client, "mongoCafe", "Customers", userid)
  console.log('비밀번호를 입력해주세요: ');
  let pwd = await Input.getUserInput();
  console.log('전화번호를 입력해주세요: ');
  let phoneNumber = await Input.getUserInput();
  console.log('생년월일 8자리를 입력해주세요.(예시: 1999-07-28): ');
  let birthDate = await Input.getUserInput();
  console.log('카드번호 16자리를 입력해주세요.(예시: 1234-5678-9012-3456): ');
  let cardNumber = await Input.getUserInput();

  const result = await client.db("mongoCafe").collection("Customers").find({}).sort({_id :-1}).toArray();
  const cusNum= result[0]['customerNumber']+1;

  await Insert.userInsert(client, "mongoCafe", "Customers", {
    "customer_id":`${userid}`, "birthDate":`${birthDate}`, "name":`${username}`, "cardNumber":`${cardNumber}`,"paymentPassword":`${pwd}`,"totalPayment":parseInt(0),"membershipLevel": "Bronze","phoneNumber":`${phoneNumber}`,"customerNumber": parseInt(cusNum) });
  console.log('가입이 완료되었습니다');
}

module.exports = { registerUser };
