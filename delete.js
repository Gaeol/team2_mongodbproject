  try {
    await client.connect();
    await deletes(client, "mongoCafe", "Customers");
  } finally {
    await client.close();
  }

async function deletes(client, dbname, colname){
  var myqry = { Name: "TV" };
  const result = await client.db(dbname).collection(colname).deleteOne(myqry);
  console.log("삭제되었습니다.");
};

module.imports = {deletes};