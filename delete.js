  try {
    await client.connect();
<<<<<<< HEAD
    await deletes(client, "mongoCafe", "Customers");
=======
    await deldocs(client, "mongoCafe", "Menu");
>>>>>>> f966cc287618ac7c43d6c59ddee3b1832d7f88a8
  } finally {
    await client.close();
  }

async function deletes(client, dbname, colname){
  var myqry = { Name: "TV" };
  const result = await client.db(dbname).collection(colname).deleteOne(myqry);
  console.log("삭제되었습니다.");
};

module.imports = {deletes};