const {rl} = require('./userInput');  
const Input = require('./userInput');  
const Insert= require('./insert.js');
const UpdateTotal= require('./updatetotal.js');

  async function displayMenu(client,user) {
    try {
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
      console.log('원하는 메뉴의 ID를 선택해주세요: ');
      let menuId =await Input.getUserInput();
      const selectedMenu = menuItems.find(menu => menu._id.toString() === menuId);

        if (selectedMenu) {
          // Display selected menu data
          console.log('선택한 메뉴 정보:');
          console.table([selectedMenu]);
          
          console.log('몇 개 주문하시겠습니까:');
          let orderNum = await Input.getUserInput();
          const quantity = parseInt(orderNum, 10);

            if (quantity > 0) {
              // 주문 처리 함수 호출
              await placeOrder(selectedMenu, quantity, user);
              await addOrder(client, selectedMenu, quantity,user);
              // payMent(client)
            } else {
              console.log('주문 수량은 1개 이상이어야 합니다.');
              rl.close();
            }
          //});
        }
      // });
    } catch (error) {
      console.error('에러가 발생했습니다:', error);
    }
  } 
let totalQuantity = 0;
let orderedItems = [];
let totalAmount = 0;
// 주문 처리 함수
async function placeOrder(selectedMenu, quantity, user) {
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

async function payMent(client,user){
  console.log(`총 ${totalAmount}원입니다.`);
  console.log('~~~~~~~~~~~~~~~~~~~~~');
  console.log('어떤 걸로 결제 도와드릴까요? 1.카드 2.포인트 3.취소 4.뒤로가기')
  let payMent = await Input.getUserInput();


      if (payMent === '1') {
        // Call a function or implement payment logic here
        console.log('');
        console.log('결제가 완료되었습니다.');
        console.log('~~~~~~~~~~~~~~~~~~~~~');
        console.log('mongoCafe~를 이용해 주셔서 감사합니다.');
        console.log('~~~~~~~~~~~~~~~~~~~~~');
        const orderId = await client.db("mongoCafe").collection("Orders").find({}).sort({_id :-1}).toArray();
        let newOrderId=orderId[0]['_id']+1;
        if(orderedItems.length===1){
          await Insert.userInsert(client, "mongoCafe", "Orders", {
            "_id":parseInt(newOrderId), 
            "items":[
            { "name": `${orderedItems[0]['name']}`, "quantity": parseInt(orderedItems[0]['quantity'])  }
            ],"count":parseInt(totalQuantity), 
            "total":parseInt(totalAmount),
            "lastOrderDate": new Date(),
            "customer_id": `${user}` 
          });
        }else if(orderedItems.length===2){
        await Insert.userInsert(client, "mongoCafe", "Orders", {
          "_id":parseInt(newOrderId), 
          "items":[
          { "name": `${orderedItems[0]['name']}`, "quantity": parseInt(orderedItems[0]['quantity'])  },
          { "name": `${orderedItems[1]['name']}`, "quantity": parseInt(orderedItems[1]['quantity'])  }
          ],"count":parseInt(totalQuantity), 
          "total":parseInt(totalAmount),
          "lastOrderDate": new Date(),
          "customer_id": `${user}` 
        });
        }else if(orderedItems.length===3){
          await Insert.userInsert(client, "mongoCafe", "Orders", {
            "_id":parseInt(newOrderId), 
            "items":[
            { "name": `${orderedItems[0]['name']}`, "quantity": parseInt(orderedItems[0]['quantity'])  },
            { "name": `${orderedItems[1]['name']}`, "quantity": parseInt(orderedItems[1]['quantity'])  },
            { "name": `${orderedItems[2]['name']}`, "quantity": parseInt(orderedItems[2]['quantity'])  }
            ],"count":parseInt(totalQuantity), 
            "total":parseInt(totalAmount),
            "lastOrderDate": new Date(),
            "customer_id": `${user}` 
          });
        }else if(orderedItems.length===4){
          await Insert.userInsert(client, "mongoCafe", "Orders", {
            "_id":parseInt(newOrderId), 
            "items":[
            { "name": `${orderedItems[0]['name']}`, "quantity": parseInt(orderedItems[0]['quantity'])  },
            { "name": `${orderedItems[1]['name']}`, "quantity": parseInt(orderedItems[1]['quantity'])  },
            { "name": `${orderedItems[2]['name']}`, "quantity": parseInt(orderedItems[2]['quantity'])  },
            { "name": `${orderedItems[3]['name']}`, "quantity": parseInt(orderedItems[3]['quantity'])  }
            ],"count":parseInt(totalQuantity), 
            "total":parseInt(totalAmount),
            "lastOrderDate": new Date(),
            "customer_id": `${user}` 
          });
        }else if(orderedItems.length===5){
          await Insert.userInsert(client, "mongoCafe", "Orders", {
            "_id":parseInt(newOrderId), 
            "items":[
            { "name": `${orderedItems[0]['name']}`, "quantity": parseInt(orderedItems[0]['quantity'])  },
            { "name": `${orderedItems[1]['name']}`, "quantity": parseInt(orderedItems[1]['quantity'])  },
            { "name": `${orderedItems[2]['name']}`, "quantity": parseInt(orderedItems[2]['quantity'])  },
            { "name": `${orderedItems[4]['name']}`, "quantity": parseInt(orderedItems[3]['quantity'])  },
            { "name": `${orderedItems[5]['name']}`, "quantity": parseInt(orderedItems[4]['quantity'])  }
            ],"count":parseInt(totalQuantity), 
            "total":parseInt(totalAmount),
            "lastOrderDate": new Date(),
            "customer_id": `${user}` 
          });
        }
        let myquery= 0;
        let newStockQuantity=0;
        let updateStock =0;
        let orderMenu=0;
        for( let i =0 ; i< orderedItems.length ; i++){
          //or=orderedItems[i].name;
          orderMenu = await client.db("mongoCafe").collection("Menu").findOne({ "name": `${ orderedItems[i]['name'] }` });
          myquery = { "name": `${orderedItems[i]['name']}` };
          newStockQuantity = orderMenu.stockQuantity - orderedItems[0]['quantity'];
          updateStock = await client.db("mongoCafe").collection("Menu").updateOne( myquery, { $set: { "stockQuantity":  parseInt(newStockQuantity) } });
        }
        await UpdateTotal.updateTotal(client)
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
        await displayMenu(client,user);
      } else {
        console.log('잘못된 입력입니다. 다시 시도해주세요.');
        await displayMenu(client,user);
      }
//    });
  };
async function addOrder(client, selectedMenu, prevQuantity, user) {
  console.log('추가 주문하시겠습니까? 1.예 2.아니오');
  let addOrderChoice= await Input.getUserInput();
  if (addOrderChoice === '1') {
    await displayMenu(client,user);
  } else if (addOrderChoice === '2'){
    console.log('더 이상 주문하지 않겠습니까? 1.예 2.아니오')
    let exitChoice = await Input.getUserInput();
    if (exitChoice === '1') {
      await payMent(client,user);
    } else if (exitChoice === '2') {
      // Continue taking orders
      await displayMenu(client,user);
    } else {
      console.log('잘못된 입력입니다. 다시 시도해주세요.');
      await addOrder(client,selectedMenu, prevQuantity,user);
    }
  // });
} else {
  console.log('잘못된 입력입니다. 다시 시도해주세요.');
  await addOrder(client,selectedMenu, prevQuantity,user); // ask again
}
  }
module.exports = {displayMenu};
