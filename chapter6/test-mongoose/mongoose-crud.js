const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require("./person-model");

mongoose.set("strictQuery", false); //설정해줘야 경고가 뜨지 않음

const app = express();
app.use(bodyParser.json());//HTTP에서 Body를 파싱하기 위한 설정
app.listen(3000, async() =>{
    console.log("Server started");
    const mongodbUri = "mongodb+srv://chocoyujung7:yujung7!@cluster0.ykh8yfz.mongodb.net/test?retryWrites=true&w=majority";

    //몽고디비에 커넥션 맺기
    mongoose   
        .connect(mongodbUri, {useNewUrlParser:true})
        .then(console.log("Connected to MongoDB"));
});

//모든 person 데이터 출력
app.get("/person", async (req, res)=>{
    const person = await Person.find({});
    res.send(person);
});

//특정 이메일로 person 찾기
app.get("/person/:email", async(req, res)=>{
    const person = await Person.findOne({email:req.params.email});
    res.send(person);
});

//person 데이터 추가하기
app.post("/person", async(req, res)=>{
    const person = new Person(req.body);
    await person.save();
    res.send(person);
});

//person 데이터 수정하기
app.put("/person/:email", async(req, res)=>{
    const person = await Person.findOneAndUpdate(
        {email: req.params.email},
        {$set : req.body},
        {new : true}
    );
    console.log(person);
    res.send(person);
});

//person 데이터 삭제
app.delete("/person/:email", async (req, res)=>{
    await Person.deleteMany({email: req.params.email});
    res.send({success: true});
});