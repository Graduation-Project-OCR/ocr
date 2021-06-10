const express = require('express');
const fs = require('fs');
const app = express();
// const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;

// app.use(cors());
app.use(bodyParser.json());

let content = '';
var SummaryTool = require('@lyuboslavlyubenov/node-summary');

// 우리 프로젝트 아이디
projectId = '';
// 우리 프로젝트 개인키, 내가 준 개인키 설정하셈
keyFilename = './key.json';

async function detectText(fileName) {
    // [START vision_text_detection]
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient({projectId, keyFilename});

    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;

    let this_Res = []
    detections.forEach(text => {
      this_Res.push(text.description)
    });
    return this_Res;
    // [END vision_text_detection]
 }


app.post('/ocr', (req, res) => {
    fs.writeFile('./images/out.png', req.body.name, 'base64', (err) => {
        if (err) throw err
    })
    detectText('./images/out.png').then(detected_res => {
            res.send({Res: detected_res[0]});
        })

});


app.post('/summary', (req, res) => {
    let title = '';
    let final_res = '';

    SummaryTool.summarize(title, req.body.name, function(err, summary) {
        if(err) console.log("Something went wrong man!");
        final_res = summary;
        });
        res.send({Res: final_res});

});






app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})