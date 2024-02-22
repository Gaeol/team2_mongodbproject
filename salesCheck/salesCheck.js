const Input = require('../userInput'); 

async function salesCheck(client, dbname, colname){
  const result = await client.db(dbname).collection(colname).find({}).sort({_id :-1}).toArray()
  const result2 = await client.db(dbname).collection(colname).aggregate([
    {
      $project: { 
        itemsCount: { $cond : {if: {$isArray: "$items"}, then:{$size:"$items"},else:"NA"}}
      }
    }
  ]).sort({_id :-1}).toArray();
  
  //console.log(result2);
  //console.log(result[0]['items'][0]['name']);
  //console.log(result[0]['items'][1]['name']);
  let amTotal = 0;
  let laTotal = 0;

  for(let i=0; i<result[0]['_id']; i++){
    for(let j=0; j<result2[0]['itemsCount']; j++){
      if(result[i]['items'][j]['name']==="아메리카노"){
        amTotal+= 2500*result[i]['items'][j]['quantity'];
      }else if(result[i]['items'][j]['name']==="카페라떼"){
        laTotal+= 4500*result[i]['items'][j]['quantity'];
      }
    }
  }
  console.log(`오늘의 몽고커피 아메리카노 총 매출은 ${amTotal} 입니다`);
  console.log(`오늘의 몽고커피 카페라떼 총 매출은 ${laTotal} 입니다`);


  //for(let i=0; i<result[0]['_id']; i++){
  //  total+=result[i]['total'];
  //}
  //console.log(`오늘의 몽고커피 총 방문손님 수는 ${result[0]['_id']} 명입니다`)
  
}


module.exports = {salesCheck};