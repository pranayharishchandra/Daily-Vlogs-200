// const express = require('express');
import express from 'express'
import bodyParser from 'body-parser';
import send from 'send';
const app = express();
const port = 8001;


app.use(bodyParser.json())


app.patch('/', function (req, res) {
  const working = req.body.working;
  console.log(working);

  const dontExistInBody = req.body.dontExistInBody;
  console.log(dontExistInBody)
  // const people = req.body.arrrrry;
  // people.push({name: 'aman', height: "5 11", weight: "75"})
  // res.send(people)

  res.send('everythings fine')

})


app.get('/', function (req, res) {
  // res.send("<h1>hello jii</h1>")
  return res.send([
    {name: 'pranay', height: '5 10', weight: '73'},
    {name: 'MJ', height: '5 11', weight: '71'},
    {name: 'pratyush', height: '5 9', weight: '70'},
  ])
  res.send("<h1>hello jii</h1>")
})

function scriptStatus () {
  console.log(`nodejs is running of port: ${port}`)
}

// app.listen(port);
app.listen(port, scriptStatus);

