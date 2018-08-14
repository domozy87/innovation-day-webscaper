var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var sites = require('./sites');
var app     = express();

app.get('/news', function (req, res) {
	//res.write('\<h1\>The Server is running!!!\<\/h1\>');
	return;
});

app.listen('9000');

exports = module.exports = app;


