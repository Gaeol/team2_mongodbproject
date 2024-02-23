const {MongoClient} = require('mongodb');
const { getUserInput } = require('./userInput');

async function updateDocuments(client, mongoCafe, Customers) {
  console.log("가입된 전화번호를 입력하세요:");
  const phoneNumber = await getUserInput(); 
  let myquery = { "phoneNumber": phoneNumber }; 

  // 업데이트할 내용을 명시. 예를 들어, 새로운 전화번호를 입력받는다고 가정
  console.log("새로운 전화번호를 입력하세요:");
  const newPhoneNumber = await getUserInput();
  
  const result = await client.db(mongoCafe).collection(Customers).updateOne(
    myquery, 
    { $set: { "phoneNumber": newPhoneNumber } } 
  );

  if (result.matchedCount === 0) {
    console.log("해당하는 전화번호를 가진 문서를 찾을 수 없습니다.");
  } else if (result.modifiedCount === 1) {
    console.log("정보가 수정되었습니다.");
  } else {
    console.log("정보 수정에 실패했습니다.");
  }
};









module.exports = {updateDocuments};
