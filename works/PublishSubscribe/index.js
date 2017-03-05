const gridUpdate = function( topic, data) {

	if( data !== "undefined") {
		addGredRow(data);
		updateCounter(data);
	}
};


// 在stockInformation topic上面创建一个订阅
const stockInformation = pubsub.subscribe( "stockInformation", gridUpdate );

// 返回稍后界面上要到的当前本地时间
const getCurrentTime = function() {

	let date = new Date(),
	     m     = date.getMonth() + 1,
	     d      = date.getDate(),
	     y       = date.getFullYear(),
	     t       = date.toLocaleTimeString().toLowerCase();

	     return (m + "/" + d + "/" + y + " " + t);
};


// 向网格组件上添加新数据行
function addGredRow( data ) {
	
	console.log( "updated grid component with:" + data.stockPrice);
}

// 更新网格上的最新更新时间
function updateCounter( data ){
	console.log( "data last updated at: " + getCurrentTime() + " with " + data.stockPrice);
}

pubsub.publish( "stockInformation" , {
	summary: "Apple made $5 billion",
	identifier: "APPLE",
	stockPrice: 570.91
});

pubsub.publish( "stockInformation", {
	summary: "Microsoft made $20 million",
	identifier: "MSFT",
	stockPrice: 30.85
})


var request = new XMLHttpRequest();

request.onreadystatechange = (e) => {
	if(request.readyState !== 4){
		return ;
	}

	if(request.status === 200){
		return request.responseText;
	}else{
		console.log(warn('error'))
	}
};

request.open('GET', 'http://news-at.zhihu.com/api/4/news/latest')
request.open();

var req = new Request('http://news-at.zhihu.com/api/4/news/latest',{Content-Security-Policy-Report-Only: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;});

fetch(req)
       .then((response) => response.json() )
       .catch((error) => {
         console.error(error);
       });