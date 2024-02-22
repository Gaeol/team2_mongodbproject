const Input = require('../userInput'); 

async function salesCheck(client, dbname, colname){
  const result = await client.db(dbname).collection(colname).find({},{"total":true}).toArray();
  console.table(result);
}


module.exports = {salesCheck};