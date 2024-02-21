const mongoose = require('mongoose');
const readline = require('readline');

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/mongoCafe')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


// Mongoose 모델 정의
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});

const User = mongoose.model('User', userSchema);

// readline 인터페이스 설정
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 사용자 입력 받기
rl.question('Username: ', function(username) {
  rl.question('Password: ', function(phoneNumber) {
    rl.question('Email: ', function(birthDate) {
      // 새 사용자 생성 및 저장
      const newUser = new User({ username, phoneNumber, birthDate });
      newUser.save()
        .then(user => {
          console.log('가입이 완료되었습니다:', user);
          mongoose.disconnect();
          rl.close();
        })
        .catch(err => {
          console.error('Error creating user:', err);
          mongoose.disconnect();
          rl.close();
        });
    });
  });
});

rl.on('close', function() {
  console.log('\nExiting signup process');
  process.exit(0);
});