const Input = require('../userInput'); 

async function stockCheck(client, mongoCafe, Menu){
  console.log('재고관리에 접속하셨습니다')
  console.log('1. 재고조회 2. 재고수정 3. 뒤로가기 4. 종료')
  let select = await Input.getUserInput();
  if(select === '1'){
    console.log('재고조회를 선택하셨습니다')
    console.log('조회할 메뉴를 입력하세요')
    // let menuName = await Input.getUserInput(client, mongoCafe, Menu)
    // let myqry = { "name": `${menuName}` };
    // const projection = { _id: 0, category: 0, name: 1, comment: 0, price: 0, stockQuantity: 1};
    // const result = await client.db(mongoCafe).collection(Menu).findOne(myqry).project(projection);
    // return result;
    }else if(select === '2'){
      console.log('재고수정을 선택하셨습니다')
    }else if(select === '3'){
      return;
    }else if(select === 4){
      process.exit();
    }
  }

module.exports = {stockCheck};