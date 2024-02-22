const Input = require('../userInput'); 

async function stockCheck(){
  console.log('재고관리에 접속하셨습니다')
  console.log('1. 재고조회 2. 재고수정 3. 뒤로가기 4. 종료')
  let select = await Input.getUserInput();
  if(select === 1){
    await ShowStock.showStock
  }else if(select === 2){
    await
  }else if(select === 3){
    return;
  }else if(select === 4){
    process.exit();
  }
}

module.exports = {stockCheck};