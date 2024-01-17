
const { MongoClient, ServerApiVersion } = require('mongodb'); //몽고디비 패키지 임포트
//몽고디비 연결정보
const uri = "mongodb+srv://chocoyujung7:yujung7!@cluster0.ykh8yfz.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { //몽고디비 클라이언트 객체 생성
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  await client.connect();
  const adminDB = client.db('test').admin(); //admin DB 인스턴스
  const listDatabases = await adminDB.listDatabases(); //데이터베이스 정보 가져오기
  console.log(listDatabases);
  return "OK";
}
run()
    .then(console.log)
    .catch(console.error)
    .finally(()=>client.close());


    

