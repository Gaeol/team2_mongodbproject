const {rl} = require('./userInput');  

  async function displayMenu(client) {
    try {
      // MongoDB에 연결
      // await client.connect();
      console.log('');
      console.log('mongoCafe에 오신 것을 환영합니다.');
      const database = client.db('mongoCafe'); // 데이터베이스 이름
      const collection = database.collection('Menu'); // 컬렉션 이름

      console.log('');
      // Menu 테이블에서 데이터 가져오기
      console.log('~~~~메뉴 리스트~~~~');
      console.log('');
      // 메뉴 정보 입력 받기
      const menuItems = await collection.find().toArray();

      // 메뉴가 없거나 가져오기에 실패한 경우
      if (!menuItems || menuItems.length === 0) {
        console.log('메뉴 정보를 가져오지 못했습니다.');
        return;
      }
      console.table(menuItems);

      // Display menu items
      menuItems.forEach(item => {
        (`ID: ${item._id}, Name: ${item.name}, Price: ${item.price}`);
      });

      // 사용자로부터 메뉴 ID 입력 받기
      rl.question('원하는 메뉴의 ID를 선택해주세요: ', async (menuId) => {
        // 선택한 메뉴 정보 가져오기
        const selectedMenu = menuItems.find(menu => menu._id.toString() === menuId);

        if (selectedMenu) {
          // Display selected menu data
          console.log('선택한 메뉴 정보:');
          console.table([selectedMenu]);

          rl.question('몇 잔 주문하시겠습니까?: ', async (orderNum) => {
            const quantity = parseInt(orderNum, 10);

            if (quantity > 0) {
              // 주문 처리 함수 호출
              placeOrder(selectedMenu.name, quantity);
            
            rl.question(`어떤 걸로 결제 도와드릴까요?
1.카드 2.포인트 3.취소 4.뒤로가기
> `, async (payMent) => {
              if (payMent === '1') {
                // Call a function or implement payment logic here
                console.log('');
                console.log('결제가 완료되었습니다.');
                console.log('~~~~~~~~~~~~~~~~~~~~~');
                console.log('mongoCafe~를 이용해 주셔서 감사합니다.');
                console.log('~~~~~~~~~~~~~~~~~~~~~');
                addOrder();
              } else if (payMent === '2') {
                console.log('');
                console.log('포인트로 결제 완료되었습니다.');
                console.log('~~~~~~~~~~~~~~~~~~~~~');
                console.log('mongoCafe~를 이용해 주셔서 감사합니다.');
                console.log('~~~~~~~~~~~~~~~~~~~~~');
                addOrder();
              } else if (payMent === '3') {
                console.log('');
                console.log('결제를 취소했습니다.');
                console.log('~~~~~~~~~~~~~~~~~~~~~');
                console.log('mongoCafe~를 이용해 주셔서 감사합니다.');
                console.log('~~~~~~~~~~~~~~~~~~~~~');
              } else if(payMent === '4'){
                displayMenu(client);
              } else {
                console.log('잘못된 입력입니다. 다시 시도해주세요.');
                displayMenu(client);
              }
          });
        } else {
          console.log('주문 수량은 1개 이상이어야 합니다.');
          rl.close();
        }
      });
    } else {
      console.log('잘못된 메뉴 ID입니다.');
      rl.close();
    }
  });
} catch (err) {
  console.error('메뉴 정보 표시 중 에러 발생:', err);
}
}

// 주문 처리 함수
function placeOrder(product, quantity) {
console.log('~~~~~~~~~~~~~~~~~~~~~');
console.log(`${product} ${quantity}잔을 주문했습니다.`);
console.log('~~~~~~~~~~~~~~~~~~~~~');
}
function addOrder(){
  rl.question(`추가 주문하시겠습니까? 
    1.예 2.아니요 
  >  `, async (addOrder) => {
                if (addOrder === '1') {
                  displayMenu(client);
                }else if (addOrder === '2'){
                  console.log('~~~~~~~~~~~~~~~~~~~~~')
                  console.log('mongoCafe~를 이용해 주셔서 감사합니다.');
                  console.log('~~~~~~~~~~~~~~~~~~~~~')
                  // MongoDB 연결 종료
                  await client.close();
                  rl.close();
              } else {
                console.log('잘못된 입력입니다. 다시 시도해주세요.');
                rl.close();
              }
            });
          };

module.exports = {displayMenu};
