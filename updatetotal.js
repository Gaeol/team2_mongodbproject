const { getUserInput } = require('./userInput');

async function updateTotal(client) {
  //const order = await client.db("mongoCafe").collection("Orders").findOne().project({$quary :{}, $orderby: {$natural : -1}  });
  //const order = await client.db("mongoCafe").collection("Orders").findOne({}, { $orderby: { $natural: -1 } });
  
  const order = await client.db("mongoCafe").collection("Orders").find({}).sort({_id :-1}).toArray()
  let newOrder= order[0]['total'];
  let OrderCus= order[0]['customer_id'];
  const customer = await client.db("mongoCafe").collection("Customers").find({"customer_id":`${OrderCus}`}).toArray();
  newTotalPayment=customer[0]['totalPayment']+newOrder;
  

  let myquery = { "customer_id": `${OrderCus}` };

  const result = await client.db("mongoCafe").collection("Customers").updateOne(
    myquery,
    { $set: { "totalPayment":  parseInt(newTotalPayment) } }
  );
  console.log(result)

}
module.exports = {updateTotal};
