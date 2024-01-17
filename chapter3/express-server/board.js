const express = require("express");
const app = express();
let posts = []; //게시글 리스트로 사용할 posts에 빈 리스트 할당

//req.body 사용하려면 json 미들웨어 사용
//사용하지 않으면 undefined로 반환
app.use(express.json()); 

//post 요청 시 컨텐트 타입이 application/x-www-form-urlendcoded인 경우 파싱
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json(posts);
});

app.post("/posts", (req, res)=>{
    const {title, name, text} = req.body; //HTTP 요청의 body 데이터를 변수에 할당

    //게시글 리스트에 새로운 게시글 정보 추가
    posts.push({id: posts.length + 1, title, name, text, createdDt: Date()});
    res.json({title, name, text});
});

app.delete("/posts/:id", (req, res)=>{
    const id = req.params.id; //app.delete 에 설정한 path 정보에서 id 값을 가져옴
    const filteredPosts = posts.filter((post) => post.id !== +id); //글 삭제 로직
    const isLengthChanged = posts.length !== filteredPosts.length;//삭제 확인
    posts = filteredPosts;

    if(isLengthChanged){ //posts의 데이터 개수가 변경되었으면 삭제 성공
        res.json("ok");
        return;
    }
    res.json("not changed"); //변경되지 않음
});

app.listen(3000, () => {
    console.log("welcome posts start!");
});