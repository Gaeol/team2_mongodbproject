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
  
  //console.log(result2);
  console.table(resultMenu);
  //console.log(result[0]['items'][1]['name']);
  let Total = 0;
  let orderTotal = 0;

//주문수 for문 안에 상세주문 for문

for(let a=0; a<resultMenu.length; a++){
  for(let i=0; i<result.length; i++){
    for(let j=0; j<result2[0]['itemsCount']; j++){
      if(result[i]['items'][j]['name']===resultMenu[a]['name']){
        Total+= resultMenu[a]['price']*result[i]['items'][j]['quantity'];
        orderTotal += result[i]['items'][j]['quantity'];
      }
    }
  }
  console.log(`오늘의 몽고커피 ${resultMenu[a]['name']} 판매잔 수는 ${orderTotal} 입니다`);
  console.log(`총 매출은 ${Total} 입니다`);
  Total=0;
  orderTotal = 0;
}
  




// for(let i=0; i<result[0]['_id']; i++){
//     for(let j=0; j<result2[0]['itemsCount']; j++){
//       if(result[i]['items'][j]['name']==="아메리카노"){
//         amTotal+= 2500*result[i]['items'][j]['quantity'];
//       }else if(result[i]['items'][j]['name']==="카페라떼"){
//         laTotal+= 4500*result[i]['items'][j]['quantity'];
//       }
//     }
//   }
//   console.log(`오늘의 몽고커피 아메리카노 총 매출은 ${amTotal} 입니다`);
//   console.log(`오늘의 몽고커피 카페라떼 총 매출은 ${laTotal} 입니다`);


  //for(let i=0; i<result[0]['_id']; i++){
  //  total+=result[i]['total'];
  //}
  //console.log(`오늘의 몽고커피 총 방문손님 수는 ${result[0]['_id']} 명입니다`)
  
}


module.exports = {salesCheck};