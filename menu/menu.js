const Input = require('../userInput'); 

async function menu(){
  await sortdocs(client, "mydb", "products");
}

async function sortdocs(client, dbname, colname){}


module.exports = {menu};