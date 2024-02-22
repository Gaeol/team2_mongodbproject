const { MongoClient } = require('mongodb');
const readline = require('readline');
const Menuinfo= require('menu.js')

// MongoDB 연결 URI 설정
const uri = process.env.DB_ATLAS_URL;
const client = new MongoClient(uri);

// readline 인터페이스 설정
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  try {
    // MongoDB에 연결
    await client.connect();
    console.log('mongoCafe에 오신 것을 환영합니다.');
    const database = client.db('mongoCafe'); // 데이터베이스 이름
    const collection = database.collection('Orders'); // 컬렉션 이름

    // 사용자로부터 문서 정보 입력 받기
    rl.question('원하시는 메뉴를 입력하세요: ', (menu) => {

      rl.question('몇 잔드릴까요?: ', async (ordernum) => {
        // MongoDB에 문서 추가
        const result = await collection.insertOne({
          menu: parseInt(menu),
          age: parseInt(ordernum)
        });

        console.log(`주문이 완료되었습니다. orderId: ${result.insertedId}`);
        
        // MongoDB 연결 종료 및 readline 인터페이스 종료
        client.close();
        rl.close();
      });
    });
  } catch (err) {
    console.error('주문이 안 들어갔습니다.', err);
  }
}

main();2
// module.exports = {orders};
