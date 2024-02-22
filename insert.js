
async function userInsert(client, dbname, colname, doc){
  const dbobj = await client.db(dbname);
  const col = dbobj.collection(colname);
  const result = await col.insertOne(doc);
  console.log(`New document created with the following id: ${result.insertedId}`);
};
