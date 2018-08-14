var express = require('express');
var request = require('request');
var itcity = require('./Scrape/itcity');
var techcrunch = require('./Scrape/techcrunch');
var app     = express();

app.get('/itcity', function (req, res) {
	res.write('\<h1\>The Server is running!!!\<\/h1\>');
	itcity.getContent();
	return;
});

app.get('/techcrunch', function (req, res) {
	res.write('\<h1\>The Server is running!!!\<\/h1\>');
	techcrunch.getContent();
	return;
});

app.listen('9000');
console.log('Server is running on port 9000');

exports = module.exports = app;


