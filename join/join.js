const Input = require('../userInput');

async function registerUser(client) {
  console.log('이름을 입력해주세요: ');
  let username = await Input.getUserInput();
  console.log('전화번호를 입력해주세요: ');
  let phoneNumber = await Input.getUserInput();
  console.log('생년월일 6자리를 입력해주세요: ');
  let birthDate = await Input.getUserInput();
}
  // Mongo에 사용자 정보 삽입
//   const newUser = new User({ username, phoneNumber, birthDate });
//   newUser.save()
//     .then(user => {
//       console.log('가입이 완료되었습니다:', user);
//       mongoose.disconnect();
//     })
//     .catch(err => {
//       console.error('Error creating user:', err);
//       mongoose.disconnect();
//     });
// }


module.exports = { registerUser };
