const { MongoClient } = require('mongodb');

async function main() {    
  const uri = process.env.DB_ATLAS_URL;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  console.log(typeof(databasesList));
  console.log(databasesList);
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
