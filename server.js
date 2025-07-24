"use strict";

//バックエンドのコード

//モジュールの読み込みとインスタンス化
const express = require("express");
const bodyParser = require("body-parser");
// const fetch = require("node-fetch");
const path = require("path");
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const GAS_ENDPOINT = "https://script.google.com/macros/s/AKfycbxMcjUvOV6K1BKXyG69rAAq7wBl7G1jsD1_avfgonZ1IOQRoPxPF22tVTonjnjlUp4b6Q/exec";


//情報を送る

//APIでリクエストがはじかれた際に使用するスクリプト
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers","Content-Type");
    next();
});

const url = GAS_ENDPOINT;

app.post("/", async (req, res) => {
    try {
        // switch (data.mode) {
        //     case "expend":

        //     break;

        // }
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(req.body),
            headers: {
                "Content-Type": "application/json"
            }
        });
            const text = await response.text();
            console.log("GAS:", text);
            res.send(text);
        } catch (err) {
        console.log("GAS:", err);
        res.status(500).send("Error")
    }
});

app.get("/relay",async (req, res) => {
    try {
        const response = await fetch(GAS_ENDPOINT);
        const data = await response.json();
        res.json(data);        
    } catch (err) {
        console.error("GAS relay error:", err);
        res.status(500).send("Relay error");
    }
});

app.listen(8000, () => {
    console.log("サーバー稼働中：ポート8000");
});


// const response = await fetch(url, {
//     method: "POST",
//     body: JSON.stringify(req.body),
//     headers: {
//         "Content-Type": "application/json"
//     }
// });

// const text = await response.text();
// console.log("GAS:", text);
// res.send(text);


app.listen(8001, () => {
    console.log("サーバー稼働中：ポート8001");
});

