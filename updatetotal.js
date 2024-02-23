const { getUserInput } = require('./userInput');

async function updateTotal(client) {
  const customer = await client.db("mongoCafe").collection("Customers").find({}).sort({_id :-1}).toArray();
  //const order = await client.db("mongoCafe").collection("Orders").findOne().project({$quary :{}, $orderby: {$natural : -1}  });
  const order = await client.db("mongoCafe").collection("Orders").findOne({}, { $orderby: { $natural: -1 } });
  let newOrder= order.total;
  let OrderCus= order.customer_id;
  
  console.log(order);
  console.log(order._id);
}
module.exports = {updateTotal};
