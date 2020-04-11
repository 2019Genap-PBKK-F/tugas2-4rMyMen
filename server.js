const express = require("express");
var cors = require('cors');
const app = express();
const sql = require('mssql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors());

app.use(function (req, res, next) {
   //Enabling CORS 
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
   next();
 });

app.get("/", function (req, response) {
   response.writeHead(200, { 'Content-Type': 'text/plain' });
   response.end('YEET');
});

const config = {
   user: 'sa',
   password: 'SaSa1212',
   server: '10.199.13.253',
   database: 'nrp05111740000076'
};

var query = function (res, query, params) {
   sql.connect(config, function (err) {
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

// API table DataDasar
app.get("/api/datadasar", function (req, res) {
   var qr = "select id, nama as name from DataDasar";
   query(res, qr, null);
});

app.get("/api/datadasar/:id", cors(), function (req, res) {
   var qr = "select * from DataDasar where id = " + req.params.id;
   query(res, qr, null);
});

app.post('/api/datadasar',function(req,res){
   var param = [
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
   ]
    var qr = "insert into DataDasar (nama) values (@nama);"
    query(res, qr, param);
})

app.put('/api/datadasar/:id', cors(),function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
    ]
    //console.log(param)
    var qr = "update DataDasar set nama = @nama WHERE id = @id;"
    query(res, qr, param);
})

app.delete('/api/datadasar/:id', function (req, res, next) {
   var qr = "delete from DataDasar where id=" + req.params.id;
   query(res, qr, null);
})

// API table KategoriUnit
app.get("/api/kategoriunit", function (req, res) {
   var qr = "select id, nama as name from KategoriUnit";
   query(res, qr, null);
});

app.get("/api/kategoriunit/:id", cors(), function (req, res) {
   var qr = "select * from KategoriUnit where id = " + req.params.id;
   query(res, qr, null);
});

app.post('/api/kategoriunit',function(req,res){
   var param = [
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
   ]   
    var qr = "insert into KategoriUnit (nama) values (@nama);"
    query(res, qr, param);
})

app.put('/api/kategori/:id', cors(),function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
    ]
    //console.log(param)
    var qr = "update KategoriUnit set nama = @nama WHERE id = @id;"
    query(res, qr, param);
})

app.delete('/api/kategori/:id', function (req, res, next) {
   var qr = "delete from KategoriUnit where id=" + req.params.id;
   query(res, qr, null);
})


// API table Unit
app.get("/api/unit", function (req, res) {
   var qr = "select * from Unit";
   query(res, qr, null);
});

app.get("/api/unit/:id", cors(), function (req, res) {
   var qr = "select * from Unit where id = " + req.params.id;
   query(res, qr, null);
});

app.post('/api/unit',function(req,res){
   var param = [
      { name: 'KategoriUnit_id', sqltype: sql.Int, value: req.body.KategoriUnit_id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
   ]
    
    var qr = "insert into Unit (KategoriUnit_id, nama) values (@KategoriUnit_id, @nama);"
    query(res, qr, param);
})

app.put('/api/unit/:id', cors(),function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'KategoriUnit_id', sqltype: sql.Int, value: req.body.KategoriUnit_id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
    ]
    //console.log(param)
    var qr = "update Unit set nama = @nama, KategoriUnit_id = @KategoriUnit_id WHERE id = @id;"
    query(res, qr, param);
})

app.delete('/api/unit/:id', function (req, res, next) {
   var qr = "delete from Unit where id=" + req.params.id;
   query(res, qr, null);
})

// API untuk table Capaian_Unit
app.get("/api/capaian", function (req, res) {
   var qr = "select * from CapaianUnit";
   query(res, qr, null);
});

app.get("/api/capaian/:data_id&:unit_id", cors(), function (req, res) {
   var qr = "select * from CapaianUnit where DataDasar_id = " + req.params.data_id + " AND Unit_id = " + req.params.unit_id;
   query(res, qr, null);
});

app.post('/api/capaian',function(req,res){
   var param = [
      { name: 'DataDasar_id', sqltype: sql.Int, value: req.body.DataDasar_id },
      { name: 'Unit_id', sqltype: sql.Int, value: req.body.Unit_id },
      { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
   ]
    
    var qr = "insert into CapaianUnit (DataDasar_id, Unit_id, waktu, capaian) values (@DataDasar_id, @Unit_id, CURRENT_TIMESTAMP, @capaian);"
    query(res, qr, param);
})

app.put('/api/capaian/:data_id&:unit_id', cors(),function(req,res){
   var param = [
      { name: 'DataDasar_id_old', sqltype: sql.Int, value: req.params.data_id },
      { name: 'Unit_id_old', sqltype: sql.Int, value: req.params.unit_id },
      { name: 'DataDasar_id', sqltype: sql.Int, value: req.body.DataDasar_id },
      { name: 'Unit_id', sqltype: sql.Int, value: req.body.Unit_id },
      { name: 'waktu', sqltype: sql.DateTime, value: req.body.waktu },
      { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
    ]
    //console.log(param)
    var qr = "update CapaianUnit set waktu = @waktu, capaian = @capaian, DataDasar_id = @DataDasar_id, Unit_id = @Unit_id WHERE DataDasar_id = @DataDasar_id_old AND Unit_id = @Unit_id_old ;"
    query(res, qr, param);
})

app.delete('/api/capaian/:data_id&:unit_id', function (req, res, next) {
   var qr = "delete from CapaianUnit where DataDasar_id = " + req.params.data_id + " AND Unit_id = " + req.params.unit_id;
   query(res, qr, null);
})

// API table Mahasiswa
app.get("/api/mahasiswa", function (req, res) {
   var qr = "select * from Mahasiswa";
   query(res, qr, null);
});

app.get("/api/mahasiswa/:id", cors(), function (req, res) {
   var qr = "select * from Mahasiswa where id = " + req.params.id;
   query(res, qr, null);
});

app.post('/api/mahasiswa',function(req,res){
   var param = [
      { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'angkatan', sqltype: sql.Int, value: req.body.angkatan },
      { name: 'jeniskelamin', sqltype: sql.Char, value: req.body.jeniskelamin },
      { name: 'tgllahir', sqltype: sql.Date, value: req.body.tgllahir },
      { name: 'foto', sqltype: sql.Image, value: req.body.foto },
      { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif }
    ]
    
    var qr = "insert into Mahasiswa (nrp,nama,jeniskelamin,tgllahir,foto,aktif,angkatan) values (@nrp, @nama, @jeniskelamin, @tgllahir, @foto, @aktif, @angkatan);"
    query(res, qr, param);
})

app.put('/api/mahasiswa/:id', cors(),function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'angkatan', sqltype: sql.Int, value: req.body.angkatan },
      { name: 'jeniskelamin', sqltype: sql.Char, value: req.body.jeniskelamin },
      { name: 'tgllahir', sqltype: sql.Date, value: req.body.tgllahir },
      { name: 'foto', sqltype: sql.Image, value: req.body.foto },
      { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif }
    ]
    console.log(param)
    var qr = "update Mahasiswa set nrp = @nrp, nama = @nama, angkatan = @angkatan, jeniskelamin = @jeniskelamin, tgllahir = @tgllahir, foto = @foto, aktif = @aktif WHERE id = @id;"
    query(res, qr, param);
})

app.delete('/api/mahasiswa/:id', function (req, res, next) {
   var qr = "delete from Mahasiswa where id=" + req.params.id + "; DBCC CHECKIDENT ('data_mhs', RESEED, 0)";
   query(res, qr, null);
})

// Console will print the message
app.listen(8013, function () {
   console.log('CORS-enabled web server listening on port 8013')
})