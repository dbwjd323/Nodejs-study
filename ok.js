const http = require("http");
const url = require("url"); //url 모듈 로딩

http.createServer((req, res)=>{
    const path = url.parse(req.url, true).pathname; //패스명 할당
    res.setHeader("Contnet-Type", "text/html");

    if(path in urlMap){
        urlMap[path](req, res);
    } else {
        notFound(req, res);
    }
}).listen("3000", () => console.log("라우터를 만들어보자!"));

const user = (req, res)=> {};
const feed = (req, res) => {};
const notFound = (req, res ) => {};

const urlMap = {
    "/": (req, res) => res.end("HOME"),
    "/user":user,
    "/feed":feed,
};