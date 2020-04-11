var mssql = require('mssql');
var dbConfig = require('./config');

module.exports.execQuery = function(req, res, param){
    var exec = mssql.connect(dbConfig, function(err){
        if(err){
            res.end("Connection error " + err);
        }
        else{
            var request = new mssql.Request();
            // Ketika ada input parameter
            if(param != null){
                param.forEach(function(i){
                    request.input(i.name, i.sqlType, i.value);
                });
            }
            request.query(req, function(err, response){
                if(err){
                    console.log("Query error");
                }
                else{
                    res.send(response.recordset);
                }
            });
        }
    });
    return exec;
}    