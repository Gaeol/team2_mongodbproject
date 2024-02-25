const Input = require('../userInput'); 

async function salesCheck(client, dbname, colname){
  const result = await client.db(dbname).collection(colname).find({}).sort({_id :-1}).toArray();
  const resultMenu = await client.db(dbname).collection("Menu").find({}).sort({_id :-1}).toArray()
  const result2 = await client.db(dbname).collection(colname).aggregate([
    {
      $project: { 
        itemsCount: { $cond : {if: {$isArray: "$items"}, then:{$size:"$items"},else:"NA"}}
      }
    }
  ]).sort({_id :-1}).toArray();
  console.table(resultMenu);
  let Total = 0;
  let orderTotal = 0;

//주문수 for문 안에 상세주문 for문
console.log("mongoCafe 매출\n")
for(let a=0; a<resultMenu.length; a++){
  for(let i=0; i<result.length; i++){
    for(let j=0; j<result2[i].itemsCount; j++){
      if(result[i]['items'][j]['name']===resultMenu[a]['name']){
        Total+= resultMenu[a]['price']*result[i]['items'][j]['quantity'];
        orderTotal += result[i]['items'][j]['quantity'];
      }
    }
  }
  console.log(`| 메뉴: ${resultMenu[a].name.padStart(8)} |        수량: ${String(orderTotal).padStart(3)}개 |         매출: ${String(Total).padStart(5)}원  `)
  console.log("------------------------------------------------------------------------");
  Total=0;
  orderTotal = 0;
}
}  
module.exports = {salesCheck};