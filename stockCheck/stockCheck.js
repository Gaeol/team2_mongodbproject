const Input = require('../userInput'); 

async function stockCheck(client, mongoCafe, Menu){
  console.log('재고관리에 접속하셨습니다')
  console.log('1. 재고조회 2. 재고수정 3. 뒤로가기 4. 종료')
  let select = await Input.getUserInput();
  if(select === '1'){
    console.log('재고조회를 선택하셨습니다')
    await view(client, mongoCafe, Menu);
  }else if(select === '2'){
    console.log('재고수정을 선택하셨습니다')
    await edit(client, mongoCafe, Menu);
  }else if(select === '3'){
    return;
  }else if(select === '4'){
    process.exit();
  }
}

async function view(client, mongoCafe, Menu){
  const projection = { _id:0, name:1, stockQuantity:1};
  const result = await client.db(mongoCafe).collection(Menu).find({}).project(projection).toArray();
  console.table(result);
}

async function edit(client, mongoCafe, Menu) {
  try {
    console.log('수정할 메뉴의 이름을 입력하세요:');
    const menuName = await Input.getUserInput(client, mongoCafe, Menu);

    // 현재 재고 확인
    const query = { "name": menuName };
    const menu = await client.db(mongoCafe).collection(Menu).findOne(query);

    if (!menu) {
      console.log('해당하는 메뉴를 찾을 수 없습니다.');
      return;
    }

    console.log(`${menuName}의 현재 재고: ${menu.stockQuantity}`);

    // 수정할 재고량 입력 받기
    console.log('수정할 재고량을 입력하세요 (+/- 숫자):');
    const quantity = parseInt(await Input.getUserInput());

    // 재고 수정
    const newQuantity = menu.stockQuantity + quantity;
    if (newQuantity < 0) {
      console.log('수정된 재고량이 유효하지 않습니다.');
      return;
    }

    // 수정된 재고량 업데이트
    await client.db(mongoCafe).collection(Menu).updateOne(query, { $set: { stockQuantity: newQuantity } });

    // 수정된 결과 확인
    const updatedMenu = await client.db(mongoCafe).collection(Menu).findOne(query);
    console.log(`${menuName}의 수정된 재고량: ${updatedMenu.stockQuantity}`);
  } catch (error) {
    console.error('오류 발생:', error);
  }
}

module.exports = {stockCheck};