"use strict";

//バックエンドのコード

//モジュールの読み込みとインスタンス化
const express = require("express");
const bodyParser = require("body-parser");
// const fetch = require("node-fetch"); 最新だと不要？一応コメントアウト
const path = require("path");
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));



const GAS_ENDPOINT = "https://script.google.com/macros/s/AKfycbx2YCDXqBpi2HGR9wAE8Sgaw5Hzsr8bJpUXm_Xk6sybiH1RJc6M1szAEoigvZBWDCgl/exec";


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

// app.listen(8000, () => {
//     console.log("サーバー稼働中：ポート8000");
// });


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


// app.listen(8001, () => {
//     console.log("サーバー稼働中：ポート8001");
// });

//環境変数を使用して、ポート番号を決める
const PORT = process.env.PORT || 8001;
app.listen(PORT,() => {
    console.log(`サーバー稼働中：ポート${PORT}`);
})