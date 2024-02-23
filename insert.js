
async function userInsert(client, dbname, colname, doc){
  const dbobj = await client.db(dbname);
  const col = dbobj.collection(colname);
  const result = await col.insertOne(doc);
};

module.exports = {userInsert};