var express = require('express');
var app = express();
const hostname = '10.199.14.46';
const port = 8013;

var productcontroller = require('./controller/productcontroller.js')();

app.get("/",function(request, response)
{
    response.json({"Message":"Hello"});
});
app.use("/api/product", productcontroller);

app.listen(port, function () {
    var message = "Server runnning on Port: " + port;
    console.log(message);
});