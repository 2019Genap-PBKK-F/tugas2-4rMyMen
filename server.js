var express = require('express');
var sql = require('mssql')
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
const hostname = '10.199.14.46';
const port = 8013;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

var conn =
{
        user: 'su',
        password: 'SaSa1212',
        server: '10.199.13.253',
        database: 'nrp05111740000076'
};

app.get("/",function(request, response)
{
    response.json({"Message":"Hello"});
});

var query = function (res, query, params) {
    sql.connect(conn, function (err) {
       if (err) {
          res.end('Connection Error\n' + err)
       }
       else {
          var request = new sql.Request()
          if (params != null){
             params.forEach(function (p) {
                request.input(p.name, p.sqltype, p.value);
             });
          }
          request.query(query, function (err, recordset) {
             if (err) {
                console.log('Query Error\n' + err)
             }
             else {
                res.send(recordset)
             }
          })
       }
    })
}

app.get("/api/Mahasiswa",function(req, res)
        {
                var sqlQuery = "Select * from Mahasiswa";
                query(res, sqlQuery, null);
        }
);

app.post('/api/Mahasiswa',function(req,res){
    var param = [
       { name: 'NRP', sqltype: sql.Char, value: req.body.NRP },
       { name: 'Nama', sqltype: sql.VarChar, value: req.body.Nama }
     ]
     
     var qr = "insert into mahasiswa (NRP,Nama) values (@NRP, @Nama);"
     query(res, qr, param);
 })

 app.listen(port, function () {
    var message = "Server runnning on Port: " + port;
    console.log('CORS-enabled web server listening on port 8013');
});