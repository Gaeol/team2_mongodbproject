const { Input } = require('./userInput');

// fieldToUpdate는 업데이트할 필드의 이름, 예를 들어 "phoneNumber" 또는 "name" 등
// newValue는 해당 필드에 설정할 새로운 값
async function updatedocuments(client, mongoCafe, Customers, fieldToUpdate,  newValue ,user) {
  let myquery = { "customer_id": `${user}` };

  const result = await client.db(mongoCafe).collection(Customers).updateOne(
    myquery,
    { $set: { [fieldToUpdate]: newValue } }
  );
  console.log(`수정완료되었습니다`);
  if (result.matchedCount === 0) {
    console.log(`해당하는 ${fieldToUpdate}를 가진 문서를 찾을 수 없습니다.`);
  } else if (result.modifiedCount === 1) {
    console.log("정보가 수정되었습니다.");
  } else {
    console.log("수정할 정보가 없거나 이미 최신 상태입니다.");
}
};

module.exports = {updatedocuments};
