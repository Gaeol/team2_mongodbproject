// const { MongoClient } = require('mongodb');

// async function insertDocumentWithCustomId(client, Customers) {
//   const db = client.db("mongoCafe");
//   const collection = db.collection(Customers);

//   // 마지막으로 삽입된 문서의 _id를 검색
//   const lastDocument = await collection.find().sort({_id: -1}).limit(1).toArray();

//   let nextId = 'a001'; // 초기값 설정
//   if (lastDocument.length > 0) {
//     const lastId = lastDocument[0]._id;
//     const match = lastId.match(/^a(\d{3})$/);
    
//     if (match) {
//       const nextNumber = parseInt(match[1], 10) + 1;
//       nextId = `a${nextNumber.toString().padStart(3, '0')}`; // 다음 _id 생성
//     }
//   }

//   // 새 문서 삽입
//   const result = await collection.insertOne({_id: nextId, /* 다른 필드 값들... */});
//   console.log(`Inserted document with _id: ${nextId}`);
// }

// // MongoDB에 연결
// const uri = "your_mongodb_connection_string";
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();
//     console.log("Connected successfully to server");

//     await insertDocumentWithCustomId(client, "collectionName");
//   } finally {
//     await client.close();
//   }
// }

// run().catch(console.error);
