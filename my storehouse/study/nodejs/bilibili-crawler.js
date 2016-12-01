var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.bilibili.com/ranking';

function searchVideoPoint(html) {
	var $ = cheerio.load(html);
	var video_info_list = [];
	var video_info = {};

	var rank_list = $('.rank-list-container').find('.rank-list');
	console.log(rank_list.html());
	// rank_list.each(function(item) {
	// 	var item = $(this);
	// 	console.log(item.text());
	// })

	// rank_items.each(function(item) {
	// 	var item = $(this);
	// 	var num = item.children('div.num').text();
	// 	var title = item.children('div.title').text();
	// 	var point = item.children('div.pts').find('div').text();
	// 	video_info.num = num;
	// 	video_info.title = title;
	// 	video_info.point = point;
	// 	console.log(item);
	// 	video_info_list.push(video_info);
	// })

	return video_info_list;
}

function printVideo(video_info_list) {

	video_info_list.forEach(function(item) {
		console.log(item + "\n");
	})
}

http.get(url, function(res) {
	var html = '';

	res.on('data' , function(data) {
		html += data;
	})

	res.on('end' , function() {
		console.log(html);
		var video_info_list =  searchVideoPoint(html);
		printVideo(video_info_list);
	})
}).on('error' ,function() {
	console.log("错误!");
})