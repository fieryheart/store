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