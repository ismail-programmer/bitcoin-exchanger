const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");

})


// app.post("/",function(req,res){




// })



app.post("/",function(req,res){

var c1 = req.body.crypto;
var c2 = req.body.fiat;
var amount = req.body.amount;
var options ={
  url:"https://apiv2.bitcoinaverage.com/convert/global",
  method:"GET",
  qs:{
    from:c1,
    to:c2,
    amount:amount
  }
  
}

request(options, function(error,response,body){
  var data = JSON.parse(body);
  var price = data.price;
  console.log(price);
  var date = data.time;

res.write("<p>The current date and time are  " + date +"</p>");
res.write("<h1>The price of " + amount + " " + c1 + " is at the current time " + price + c2 +  "</h1>")
res.send();
})

})









app.listen(3000,function(){
  console.log("server is runing")
});