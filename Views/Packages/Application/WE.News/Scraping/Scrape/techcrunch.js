/**
 * Created by oudom on 8/18/16.
 */
var request = require('request');
var cheerio = require('cheerio');
var uuid = require('uuid');
var db = require('../database');

var base_url = 'https://techcrunch.com/page/';
var baseImageUrl = 'https://techcrunch.com';
var name = 'techcrunch';

function getContent() {
	var start = 1;
	var end = 5;
	db.select("SELECT * FROM we_news_domain_model_scrapingsource WHERE name = '" + name + "'", function (result) {
		var scrapeSrc = '';
		if (result.length > 0) {
			scrapeSrc = result[0]['persistence_object_identifier'];
		}
		for(var i = start; i <= end; i++) {
			var url = base_url + i;
			var data = {
				src: 'TECHCRUNCH'
			};
			request(url, function (error, response, html) {
				var $ = cheerio.load(html);

				var topic_urls = $('div.block-content .post-title').find('a');
				var leads = $('div.block-content p.excerpt');
				if (topic_urls.length > 0) {
					for(var j = 0; j < topic_urls.length; j++) {
						var lead = $(leads[j]).text();
						getDetail($(topic_urls[j]).attr('href'), lead, scrapeSrc, function (title, lead, body, author, createdDate, url, images, srcId) {
							data.title = title;
							data.lead = lead;
							data.body = body;
							data.author = author;
							data.createdDate = createdDate;
							data.url = url;
							data.images = images;
							data.srcId = srcId;
							var table = "we_news_domain_model_news";
							var post = {
								persistence_object_identifier: uuid.v4(),
								scrapingsource: srcId,
								title: title,
								lead: lead,
								body: body,
								author: author,
								crdate: createdDate
							};
							db.insert(table, post, function (result) {
								console.log(result);
							});
						});

					}
				}
			});
		}
	});
}

function getDetail(url, lead, srcId, callback) {
	request(url, function (err, res, html) {
		var $ = cheerio.load(html);
		var title = $('div.l-main .page-title .tweet-title').text();
		var bodyArray = $('div.l-main .article-entry.text p');
		//var body = $(bodyArray).text();
		var body = $('div.l-main .article-entry.text').html();
		var author = $('div.l-main .title-left .byline').find('a').text();
		var createdDate = $('div.l-main .title-left .byline time').attr('datetime');
		var images = new Array();
		var imagesArray = $('div.l-main .article-entry.text img');
		// Write images
		if (imagesArray.length) {
			for(var i = 0; i < imagesArray.length; i++) {
				var src = $(imagesArray[i]).attr('src');
				images.push(src);
			}
		}
		callback(title, lead, body, author, createdDate, url, images, srcId);
	});
	return;
}
exports.getContent = getContent;
