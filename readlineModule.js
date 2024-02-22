const readline = require('readline');

// readline 인터페이스 설정
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = { readline, rl };