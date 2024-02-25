const {MongoClient}= require('mongodb');
const Input = require('./userInput');
const Employees= require('./employees/employees.js');
const Customers= require('./customers/customers.js');
const Menu= require('./menu/menu.js');
const Updatetotal= require('./updatetotal.js');


const EventEmitter = require('events');
const { resolve } = require('path');
// 이벤트를 처리하는 EventEmitter 객체 생성
const myEmitter = new EventEmitter();
myEmitter.setMaxListeners(100); // 원하는 숫자로 변경

const uri = process.env.DB_ATLAS_URL;

const client = new MongoClient(uri);
const dbName = 'mongoCafe';

async function main(){
  await client.connect();
  //const db= client.db(dbName);
  //const collection = db.collection('documents');
  
  console.log(`
  
███╗   ███╗ ██████╗ ███╗   ██╗ ██████╗  ██████╗      ██████╗ █████╗ ███████╗███████╗
████╗ ████║██╔═══██╗████╗  ██║██╔════╝ ██╔═══██╗    ██╔════╝██╔══██╗██╔════╝██╔════╝
██╔████╔██║██║   ██║██╔██╗ ██║██║  ███╗██║   ██║    ██║     ███████║█████╗  █████╗  
██║╚██╔╝██║██║   ██║██║╚██╗██║██║   ██║██║   ██║    ██║     ██╔══██║██╔══╝  ██╔══╝  
██║ ╚═╝ ██║╚██████╔╝██║ ╚████║╚██████╔╝╚██████╔╝    ╚██████╗██║  ██║██║     ███████╗
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝      ╚═════╝╚═╝  ╚═╝╚═╝     ╚══════╝
                                                                                    
`)
  console.log('mongoCafe~에 오신 것을 환영합니다!')
  while(true){
    const result2 = await client.db("mongoCafe").collection("Orders").aggregate([
      {
        $project: { 
          itemsCount: { $cond : {if: {$isArray: "$items"}, then:{$size:"$items"},else:"NA"}}
        }
      }
    ]).sort({_id :-1}).toArray();
    const result = await client.db("mongoCafe").collection("Orders").find({}).sort({_id :-1}).toArray();
    console.log('1.관리자 2.고객 3. 메뉴 4. 종료');
  let select = await Input.getUserInput();
    if (select === '1') {
      await Employees.employees(client);
    }else if (select === '2'){
      await Customers.customers(client);
    }else if (select === '3'){
      await Menu.menu(client, "mongoCafe", "Menu");
    }else if (select === '4'){
      console.log('mongoCafe~를 이용해주셔서 감사합니다^^')
      client.close();
      process.exit(); 
    }
  }
}

main().catch(console.error).finally(()=>client.close());

