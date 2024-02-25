const Input = require('../userInput'); 
const Menu= require('../menu/menu.js');
const Insert= require('../insert.js');
const DeleteMenu = require('../delete')

async function menuCheck(client){
  while(true){
    await Menu.menu(client, "mongoCafe", "Menu");
    console.log('1.메뉴 추가 2.메뉴 삭제 3.뒤로가기 4.종료');
    let select = await Input.getUserInput();
      if (select === '1') {
        console.log('메뉴 추가를 선택하셨습니다.')
        console.log('메뉴번호를 입력하세요')
        let id = await Input.getUserInput();
        console.log('카테고리를 입력하세요')
        let category = await Input.getUserInput();
        console.log('메뉴이름을 입력하세요')
        let name = await Input.getUserInput();
        console.log('설명을 입력하세요')
        let comment = await Input.getUserInput();
        console.log('가격을 입력하세요')
        let price = await Input.getUserInput();
        console.log('재고을 입력하세요')
        let stock = await Input.getUserInput();
        await Insert.userInsert(client, "mongoCafe", "Menu", {
          "_id":parseInt(id), "category":`${category}`, "name":`${name}`, "comment":`${comment}`,"price":parseInt(price),"stockQuantity":parseInt(stock)});
      }else if (select === '2'){
        console.log('메뉴 삭제를 선택하셨습니다.')
        await DeleteMenu.deleteMenu(client, "mongoCafe", "Menu")
      }else if (select === '3'){
        return true;
      }else if (select === '4'){
        console.log('mongoCafe~를 이용해주셔서 감사합니다^^')
        process.exit();
      }
  }
}


module.exports = {menuCheck};