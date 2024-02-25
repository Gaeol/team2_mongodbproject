const Input = require('./userInput'); 

async function exam(client, dbname, colname, login_id,login_pwd){
  const result = await client.db(dbname).collection(colname).find({}).sort({_id :-1}).toArray();

  let ex=1;
  while(ex===1){
    for(let i=0; i<result.length; i++){
      if(login_id === result[i]['customer_id'] && login_pwd === result[i]['paymentPassword'] ){
      ex=2;
      console.log(`${login_id}님이 로그인하셨습니다.`)
      break;
      }
    }
    if(ex===1){
    console.log(`아이디나 비번이 올바르지 않습니다.`)
    console.log('다시 아이디를 입력해주세요');
    login_id = await Input.getUserInput();
    console.log('다시 비밀번호를 입력해주세요');
    login_pwd = await Input.getUserInput();
    }
  }
  return login_id;
}

async function examId(client, dbname, colname, join_id){
  const result = await client.db(dbname).collection(colname).find({}).sort({_id :-1}).toArray();

  let ex=1;
  let customer;

  while(ex===1){
    for(let i=0; i<result.length; i++){
      if(join_id ===result[i]['customer_id'] ){
      ex=1;
      customer=result[i]['customer_id'];
      console.log(`${customer}은 사용불가능한 아이디입니다.`)
      break;
      }else{
        ex=2;
      }
    }
    if(ex===2){
    console.log(`${join_id}은 사용가능한 아이디입니다.`);
    }else{
      console.log(`다른 아이디를 입력해주세요.`);
      join_id = await Input.getUserInput();
    }
  }
  return join_id;
}
module.exports = {exam,examId};

