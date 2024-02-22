const Input = require('../userInput'); 

async function menu(client, dbname, colname){
  const result = await client.db(dbname).collection(colname).find({}).toArray();
  console.table(result);
};

module.exports = {menu};