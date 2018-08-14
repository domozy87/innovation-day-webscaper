/**
 * Created by oudom on 8/18/16.
 */
var request = require('request');
var cheerio = require('cheerio');
var uuid = require('uuid');
var db = require('../database');

var base_url = 'http://www.itcity.com.kh/news/hot-news?page=';
var baseImageUrl = 'http://www.itcity.com.kh';
var name = 'itcity';

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
				src: 'IT CITY'
			};
			request(url, function (error, response, html) {
				var $ = cheerio.load(html);

				var topic_urls = $('article.block_topic_post_feature .title').find('a');
				var leads = $('article.block_topic_post_feature .content .text');
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
							//console.log(data);
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
							if (! data.title.trim()) console.log(data);
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
		var title = $('article.block_single_news .title a').text();
		var body = $('article.block_single_news .content').text();
		var author = $('article.block_single_news .info .author').find('a').text();
		var createdDateArray = $('article.block_single_news .info .date p').text().split('\/');
		var createdDate = createdDateArray[0].trim();
		var images = new Array();
		var imagesArray = $('article.block_single_news .content p img');
		if (imagesArray.length) {
			for(var i = 0; i < imagesArray.length; i++) {
				var src = baseImageUrl + $(imagesArray[i]).attr('src');
				images.push(src);
			}
		}
		callback(title, lead, body, author, createdDate, url, images, srcId);
	});
	return;
}
exports.getContent = getContent;
