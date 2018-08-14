var mysql = require('mysql');
var uuid = require('uuid');
var Xray = require('x-ray');

var xray = Xray();
var connection = mysql.createConnection({
	host     : '0.0.0.0',
	port     : '3307',
	user     : 'root',
	password : 'root',
	database : 'dockerflow'
});


connection.connect();
connection.query('SELECT * FROM we_news_domain_model_scrapingsource where persistence_object_identifier="b221a681-b2bd-4341-a4c2-8798a13cfd51"', function(err, rows) {
	if (err) throw err;

	if (rows.length) {
		// workaround: truncate for re-scraping
		connection.query('TRUNCATE we_news_domain_model_news', function(err) {
			if (err) throw err;
		});

		for (var i = 0, len = rows.length; i < len; i++) {
			var row = rows[i];
			var scrapeSourceId = row.persistence_object_identifier;
			var scrapeUrl = row.url;
			var listSelector = row.listhtmlselector;
			var detailSelector = row.detailhtmlselector;
			var titleSelector = row.titlehtmlselector;
			var leadSelector = row.leadhtmlselector;
			var bodySelector = row.bodyhtmlselector;
			var authorSelector = row.authorhtmlselector;
			var dateSelector = row.datehtmlselector;
			var detailUrlSelector = row.detailurlhtmlselector;
			var thumbnailSelector = row.thumbnailhtmlselector;

			// scrap list by selector
			xray(scrapeUrl, listSelector,
				[{
					title: titleSelector,
					lead: leadSelector,
					detailUrl: detailUrlSelector,
					thumbnail: thumbnailSelector
				}]
			)(function(err, elements) { // todo: define .paginate('.next@href').limit(3)
					if (err) throw err;

					for (var i=0, x = elements.length; i < x; i++) {
						var detailUrl = elements[i]['detailUrl'];
						var post = {
							scrapingsource: scrapeSourceId,
							title: elements[i]['title'],
							lead: elements[i]['lead'],
							crdate: new Date().toISOString()
						};

						//scrap news overview by selector
						xray(detailUrl, detailSelector,
							{
								author: authorSelector,
								createdDate: dateSelector,
								body: bodySelector,
								image: 'img@src'
							}
						)(function(err, element) {
							var data = post;
							data.author = element.author;
							data.body = element.body;
							data.persistence_object_identifier = uuid.v4();
							// connection.query('INSERT INTO we_news_domain_model_news SET ?', data, function (err) {
							// 	if (err) throw err.message;
							// 	console.log('Data is written.');
							// });
							console.log(data);
						});
					}
			});
		}
	} else {
		console.log('Scraping source not found!!!');
	}
});

// connection.end();
