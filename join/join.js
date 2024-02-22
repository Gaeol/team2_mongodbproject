
// const Input = require('./userInput');
// const mongoose = require('mongoose');

// // Mongo랑 연결
// mongoose.connect('mongodb://localhost:27017/mongoCafe', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Mongoose 모델 정의
// const userSchema = new mongoose.Schema({
//   username: String,
//   phoneNumber: String,
//   birthDate: String
// });

// const User = mongoose.model('User', userSchema);

// // async function registerUser(connection) {
// //     console.log('이름을 입력해주세요: ');
// //     let username = await Input.getUserInput();
// //     console.log('전화번호를 입력해주세요');
// //     let usernumber = await Input.getUserInput();
// //     console.log('생년월일6자리를 입력해주세요');
// //     let birthDate = await Input.getUserInput();

// //                     // Mongo에 사용자 정보 삽입
// //                     const newUser = new User({ username, phoneNumber, birthDate });
// //                     newUser.save()
// //                       .then(user => {
// //                         console.log('가입이 완료되었습니다:', user);
// //                         mongoose.disconnect();
// //                         rl.close();
// //                       })
// //                       .catch(err => {
// //                         console.error('Error creating user:', err);
// //                         mongoose.disconnect();
// //                         rl.close();
// //                     });
// // }

// // module.exports = { registerUser };

// async function registerUser() {
//   console.log('이름을 입력해주세요: ');
//   let username = await Input.getUserInput(rl);
//   console.log('전화번호를 입력해주세요');
//   let phoneNumber = await Input.getUserInput(rl);
//   console.log('생년월일 6자리를 입력해주세요');
//   let birthDate = await Input.getUserInput(rl);

//   // Mongo에 사용자 정보 삽입
//   const newUser = new User({ username, phoneNumber, birthDate });
//   newUser.save()
//     .then(user => {
//       console.log('가입이 완료되었습니다:', user);
//       mongoose.disconnect();
//       rl.close();
//     })
//     .catch(err => {
//       console.error('Error creating user:', err);
//       mongoose.disconnect();
//       rl.close();
//     });
// }

// registerUser(); // 함수 호출

const mongoose = require('mongoose');
const Input = require('../userInput');

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost:27017/mongoCafe', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Mongoose 모델 정의
const UserSchema = new mongoose.Schema({
  username: String,
  phoneNumber: String,
  birthDate: String
});
const User = mongoose.model('User', UserSchema);

async function registerUser() {
  console.log('이름을 입력해주세요: ');
  let username = await Input.getUserInput();
  console.log('전화번호를 입력해주세요: ');
  let phoneNumber = await Input.getUserInput();
  console.log('생년월일 6자리를 입력해주세요: ');
  let birthDate = await Input.getUserInput();

  // Mongo에 사용자 정보 삽입
  const newUser = new User({ username, phoneNumber, birthDate });
  newUser.save()
    .then(user => {
      console.log('가입이 완료되었습니다:', user);
      mongoose.disconnect();
    })
    .catch(err => {
      console.error('Error creating user:', err);
      mongoose.disconnect();
    });
}


module.exports = { registerUser };
