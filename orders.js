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

        // const resultMenu = await client.db("mongoCafe").collection("Menu").find({"name":"아메리카노"}).toArray()
        // console.log(resultMenu[0]['price']);

        if (selectedMenu) {
          // Display selected menu data
          console.log('선택한 메뉴 정보:');
          console.table([selectedMenu]);

          rl.question('몇 개 주문하시겠습니까?: ', async (orderNum) => {
            const quantity = parseInt(orderNum, 10);

            if (quantity > 0) {
              // 주문 처리 함수 호출
              placeOrder(selectedMenu, quantity);
              addOrder(client, selectedMenu, quantity);
              // payMent(client)
            } else {
              console.log('주문 수량은 1개 이상이어야 합니다.');
              rl.close();
            }
          });
        }
      });
    } catch (error) {
      console.error('에러가 발생했습니다:', error);
    }
  } 
let totalQuantity = 0;
let orderedItems = [];
let totalAmount = 0;
// 주문 처리 함수
function placeOrder(selectedMenu, quantity) {
  console.table([selectedMenu]);
  const totalPrice = selectedMenu.price * quantity;
  console.log('~~~~~~~~~~~~~~~~~~~~~');
  console.log(`${selectedMenu.name} ${quantity}개을 주문했습니다.`);
  console.log(`총 ${totalPrice}원입니다.`);
  console.log('~~~~~~~~~~~~~~~~~~~~~');
  // Update totalQuantity and totalAmount
  totalQuantity += quantity;
  totalAmount += totalPrice;
  // Update orderedItems
  orderedItems.push({ name : selectedMenu.name, quantity, price: selectedMenu.price, totalPrice });
  console.log('주문 내역:');
  console.table(orderedItems);
  console.log('~~~~~~~~~~~~~~~~~~~~~');
  console.log(`총 ${totalQuantity}개, 총 금액: ${totalAmount}원 주문 중입니다.`);
  console.log('~~~~~~~~~~~~~~~~~~~~~');
}

function payMent(client){
  console.log(`총 ${totalAmount}원입니다.`);
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
        process.exit(); 
      } else if (payMent === '2') {
        console.log('');
        console.log('포인트로 결제 완료되었습니다.');
        console.log('~~~~~~~~~~~~~~~~~~~~~');
        console.log('mongoCafe~를 이용해 주셔서 감사합니다.');
        console.log('~~~~~~~~~~~~~~~~~~~~~');
        process.exit(); 
      } else if (payMent === '3') {
        console.log('');
        console.log('결제를 취소했습니다.');
        console.log('~~~~~~~~~~~~~~~~~~~~~');
        console.log('지금보다 나은 mongoCafe~가 되도록 최선을 다하겠습니다.');
        console.log('~~~~~~~~~~~~~~~~~~~~~');
        process.exit(); 
      } else if(payMent === '4'){
        displayMenu(client);
      } else {
        console.log('잘못된 입력입니다. 다시 시도해주세요.');
        displayMenu(client);
      }
    });
  };
function addOrder(client, prevQuantity) {
  rl.question(`추가 주문하시겠습니까? 
  1.예 2.아니요 
>  `, async (addOrderChoice) => {
    if (addOrderChoice === '1') {
      displayMenu(client);
    } else if (addOrderChoice === '2') {
      rl.question(`더 이상 주문하지 않겠습니까? 
  1.예 2.아니요 
> `, (exitChoice) => {
        if (exitChoice === '1') {
          payMent(client);
        } else if (exitChoice === '2') {
          // Continue taking orders
          displayMenu(client);
        } else {
          console.log('잘못된 입력입니다. 다시 시도해주세요.');
          addOrder(client,selectedMenu, prevQuantity);
        }
      });
    } else {
      console.log('잘못된 입력입니다. 다시 시도해주세요.');
      addOrder(client,selectedMenu, prevQuantity); // ask again
    }
  });
}
module.exports = {displayMenu};
