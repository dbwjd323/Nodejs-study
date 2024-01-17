const url = require("url");
const express = require("express");
const app = express(); //express 초기화 후 app에 할당

const port = 3000;
app.listen(port, () => { //서버를 기동해 클라이언트 요청 기다림
    console.log(`익스프레스로 라우터 리팩터링하기`);
});

app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);

function user(req, res){
    const user = url.parse(req.url, true).query;

    res.json(`[user] name : ${user.name}, age: ${user.age}`);
}

function feed(_, res){
    res.json(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>
    `);
}