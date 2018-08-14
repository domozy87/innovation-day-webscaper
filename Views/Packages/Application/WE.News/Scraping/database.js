/**
 * Created by oudom on 8/18/16.
 */
var mysql = require('mysql');

var pool      =    mysql.createPool({
	connectionLimit : 100, //important
	host     : '0.0.0.0',
	port     : 3307,
	user     : 'root',
	password : 'root',
	database : 'dockerflow',
	debug    :  false
});

function select(query, callback) {

	pool.getConnection(function (err, connection) {
		if (err) {
			console.log({"code" : 100, "status" : "Error in connection database"});
			return;
		}

		console.log('connected as id ' + connection.threadId);

		connection.query(query, function(err, rows){
			connection.release();
			if(! err) {
				callback(rows);
			} else {
				callback(err);
			}
		});

		connection.on('error', function(err) {
			console.log({"code" : 100, "status" : "Error in connection database"});
			return;
		});
	});
}

function insert(table, data, callback) {

	pool.getConnection(function (err, connection) {
		if (err) {
			console.log({"code" : 100, "status" : "Error in connection database"});
			return;
		}

		//console.log('connected as id ' + connection.threadId);

		connection.query("INSERT INTO " + table + " SET ?", data, function(err, result){
			connection.release();
			if(!err) {
				callback(result);
			}
		});

		connection.on('error', function(err) {
			console.log({"code" : 100, "status" : "Error in connection database"});
			return;
		});
	});
}

exports.select =  select;
exports.insert = insert;
