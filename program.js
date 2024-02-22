const {MongoClient}= require('mongodb');
const Input = require('./userInput');
const Employees= require('./employees/employees.js')
const Customers= require('./customers/customers.js')
const Menu= require('./menu/menu.js')

const uri = process.env.DB_ATLAS_URL;

const client = new MongoClient(uri);
const dbName = 'mongoCafe';

async function main(){
  await client.connect();
  const db= client.db(dbName);
  const collection = db.collection('documents');
  
  
  while(true){
  console.log('몽고커피')
  console.log('1.관리자 2.고객 3. 메뉴 4. 종료');
  let select = await Input.getUserInput();
    if (select === '1') {
      await Employees.employees();
    }else if (select === '2'){
      await Customers.customers(client);
    }else if (select === '3'){
      await Menu.menu();
    }else if (select === '4'){
      client.close();
      process.exit();
    }
  }
}


main().catch(console.error).finally(()=>client.close());

