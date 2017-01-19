


//创建States对象，饱含所有的游戏画面
var States = {};

States.boot = function(game){

	//加载进度条动态图片
	this.preload = function(){

	this.load.spritesheet('Loading','../images/loading.png',72,72,12);
	this.load.image('loading','../images/preload.png');


	};

	//进度条图片加载完毕后进入缓冲阶段
	this.create  = function(){

			this.state.start('preload');

		}
	};