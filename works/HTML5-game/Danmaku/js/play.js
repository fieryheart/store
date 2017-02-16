

var GAME  = {

	_width    	: 	false,
	_height   	: 	false,
	_hasStart 	: 	false,
	_gameOver 	: 	true,
	_timer    	: 	null, 
	_otherTimer :   null,
	_09_Timer 	: 	null,
	_bg       	: 	null,
	_ready      :   null,
	_text       :   null,
	_completeText : null,
	_timing     :   120,
	_counter    : 	0,
	_clockText  : 	null,
	_BGM		: 	null,
	// _yes        :   null,
	// _no         :   null,

};

var plane = {

	//飞机的雪碧
	_play  	: 	null,
	//飞机的宽度
	_width 	: 	null,
	//飞机的长度
	_height : 	null,
	//飞机的初始横坐标
	_positionX 	: 	null,
	//飞机的初始纵坐标
	_positionY 	: 	null,
	//飞机的速度
	_speed 	: 	null,
	//飞机的血量
	_HP    	: 	null,

};




var KEY = {

	W		: 	null,
	A		: 	null,
	S		: 	null,
	D		: 	null,
	UP		: 	null,
	LEFT	: 	null,
	DOWN	: 	null,
	RIGHT	: 	null,
	ESC     :   null,

};

var two_three;
var zero_nine;


States.play = function(game){



	this.create = function(){

		// this.physics.startSystem(Phaser.Physics.ARCADE);


		//创建游戏背景，并使之沿Y轴以每秒10像素向下移动
		GAME._bg = this.add.tileSprite(0,0,game.width,game.height,'background');
		GAME._bg.autoScroll(0,10);
		//添加背景音乐
		GAME._BGM = this.add.sound('BGM',0.5,true);
		//添加“倒计时”文本
		GAME._clockText = game.add.text(game.width - 95,0,'倒计时：',{ font: "16px 微软雅黑", fill: "#ffffff", align: "center" });
		//添加计时文本
		GAME._text = game.add.text(game.width - 30,1.5,'120',{ font: "16px SG09", fill: "#ff0000", align: "center" });
		
		//创建弹幕组
		game.DanmakuGroup = game.add.group();
		game.DanmakuGroup.enableBody = true;

		//创建其他弹幕组
		game.otherDanmakuGroup = game.add.group();

		//创建顶部弹幕组
		game.DanmakuTopGroup = game.add.group();
		game.DanmakuTopGroup.enableBody = true;
		//创建左边弹幕组
		game.DanmakuLeftGroup = game.add.group();
		game.DanmakuLeftGroup.enableBody = true;
		
		//添加“点击屏幕开始游戏”的字样
		GAME._ready = this.add.sprite(0,0,'play-ready');
		// GAME._yes = this.add.button(game.width / 2 - 150,game.height / 2,'ready-yes',function(){
			
		// 		},this,1,0);
		// GAME._no  = this.add.button(game.width / 2 + 50,game.height / 2,'ready-no',function(){
			
		// 		},this,1,0);


		//创建飞机图像
		plane._play = this.add.sprite(230,600,'plane');
		//给飞机一个物理引擎
		this.physics.enable(plane._play,Phaser.Physics.ARCADE);
		//飞机的准心设置在中点处
		plane._play.anchor.setTo(0.5,0.5);
		plane._play.collideWorldBounds = true;


		//增加飞机的向左向右的动画效果
		plane._play.animations.add('default',[0,1,2],10,false);
		plane._play.animations.add('right', [1], 1, false);
		plane._play.animations.add('left',[2],1,false);

		// 鼠标拖动
		plane._play.inputEnabled = true;
		
		plane._play.input.enableDrag(false, true);
		
		plane._play.input.allowVerticalDrag = true;



		//设置键盘事件
		KEY.W = this.input.keyboard.addKey(Phaser.Keyboard.W);
		KEY.A = this.input.keyboard.addKey(Phaser.Keyboard.A);
		KEY.S = this.input.keyboard.addKey(Phaser.Keyboard.S);
		KEY.D = this.input.keyboard.addKey(Phaser.Keyboard.D);
		KEY.UP = this.input.keyboard.addKey(Phaser.Keyboard.UP);
		KEY.LEFT = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		KEY.DOWN = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		KEY.RIGHT = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		KEY.ESC = this.input.keyboard.addKey(Phaser.Keyboard.ESC);


		//利用时钟事件来循环产生弹幕
		GAME._timer = this.time.events.loop(500,this.generalDanmaku, this);
		this.time.events.loop(Phaser.Timer.SECOND,this.updateCounter,this);
		GAME._otherTimer = this.time.events.loop(2400,this.otherDanmaku,this);
		GAME._09_Timer   = this.time.events.loop(3200,this._09_Danmaku,this);
		//先不要启动时钟
		this.time.events.stop(false);
		// 点击屏幕后正式开始游戏
		this.input.onDown.addOnce(this.startGame, this);

	};




	this.update = function(){

		//键盘事件
		if((KEY.D.isDown || KEY.RIGHT.isDown) && plane._play.x < GAME._width - plane._width)  {
			plane._play.x += plane._speed;
			plane._play.animations.play('right');
		}
		else if((KEY.A.isDown || KEY.LEFT.isDown) && plane._play.x > plane._width) {
			plane._play.x -= plane._speed;
			plane._play.animations.play('left');
		}
		else if((KEY.W.isDown || KEY.UP.isDown) && plane._play.y > plane._height) {
			plane._play.y -= plane._speed;
			plane._play.animations.play('default');
		}
		else if((KEY.S.isDown || KEY.DOWN.isDown) && plane._play.y < GAME._height - plane._height) {
			plane._play.y += plane._speed;
			plane._play.animations.play('default');
		}
		if(KEY.ESC.isDown){

			//返回菜单界面
			game.state.start('menu');
			//关闭背景音乐
			GAME._BGM.destroy();

		}

		if( GAME._timing <= GAME._counter ){


			
			//关闭背景音乐
			GAME._BGM.destroy();
			//背景清除
			GAME._bg.destroy();
			//弹幕清除
			game.DanmakuGroup.destroy();
			//文本清除
			GAME._text.destroy();
			//"倒计时清除"
			GAME._clockText.destroy();
			//飞机清除
			plane._play.destroy();
			//进入通关界面
			game.state.start('Complete');
			
			

		}

		//开启碰撞判定
		this.physics.arcade.overlap(plane._play,game.DanmakuGroup,this.hitDanmaku,null,this);
		this.physics.arcade.overlap(plane._play,game.DanmakuTopGroup,this.increaseTime,null,this);
		this.physics.arcade.overlap(plane._play,game.otherDanmakuGroup,this.reduceTime,null,this);
	}

	//创建弹幕对象，添加名字属性和加载方法
	var Danmaku = {

		Add : function( _num , _speedX , _speedY){

			if( _speedX ){

				//随机产生弹幕的横坐标值
				var  positionY = Math.floor(Math.random() * GAME._height);
				//创建弹幕
				var Danmaku = game.DanmakuLeftGroup.create(GAME._width,positionY,_num);
				//给弹幕物理引擎
				game.physics.enable(Danmaku,Phaser.Physics.ARCADE);
				//设置弹幕有个沿X轴的速度
				Danmaku.body.velocity.x = -_speedX;
				//添加到整个组中
				game.DanmakuGroup.add(Danmaku);

			}

		},

	};



	this.generalDanmaku = function(_num,_speedX,_speedY){

		// console.log(2);
		
		Danmaku.Add('Danmaku_02',150,0);
		Danmaku.Add('Danmaku_04',150,0);
		Danmaku.Add('Danmaku_05',300,0);
		Danmaku.Add('Danmaku_06',100,0)

	}

	this.otherDanmaku = function(){

		//随机产生弹幕的横坐标值
		var  positionY = Math.floor(Math.random() * GAME._height);
		//创建弹幕
		two_three = game.otherDanmakuGroup.create(GAME._width,positionY,'Danmaku_03');
		//给弹幕物理引擎
		game.physics.enable(two_three,Phaser.Physics.ARCADE);
		//设置弹幕有个沿X轴的速度
		two_three.body.velocity.x = -200;


	}

	this._09_Danmaku = function(){

		//随机产生弹幕的横坐标值
		var positionX = Math.floor(Math.random() * GAME._width);
		//创建弹幕
		zero_nine = game.DanmakuTopGroup.create(positionX,0,'Danmaku_01');
		//给弹幕物理引擎
		game.physics.enable(zero_nine,Phaser.Physics.ARCADE);
		//设置弹幕有沿Y轴的速度
		zero_nine.body.velocity.y = 200;
		

	}

	this.hitDanmaku = function() {
		
		//判断飞机是否存活
	    if (plane._play.alive == false)
	         return;
		
		//飞机被击毁
	    plane._play.alive = false;

		//销毁弹幕循环
	    this.time.events.remove(GAME._timer);
		
		//让游戏中所有的弹幕停止
	    game.DanmakuGroup.forEachAlive(function(d){
		//velocity为速度
			d.body.velocity.x = 0;
	        d.body.velocity.y = 0;

	    }, this);

		//销毁飞机
		plane._play.kill();
		//关闭背景音乐
		GAME._BGM.destroy();
		//进入游戏结束画面
		this.add.sound('destroy').play();

		

		game.state.start('gameOver');
		//test
		console.log(1);

	};


	this.increaseTime = function(){

		GAME._counter --;
		zero_nine.kill();
		this.add.sound('eat_09').play();

	}

	this.reduceTime = function(){

		GAME._counter ++;
		two_three.kill();
		this.add.sound('add_one').play();

	}

	//倒计时的计算
	this.updateCounter = function(){


		GAME._counter ++;
		GAME._text.setText(GAME._timing - GAME._counter);

	}




	//开启游戏，初始化各项数据
	this.startGame = function(){

		GAME._width  = 480;
		GAME._height = 640;
		GAME._hasStart = true;
		GAME._gameOver = false;
		GAME._ready.destroy();
		GAME._timing  = 120;
		GAME._counter = 0;
		GAME._BGM.play();

		plane._width     = 15;
		plane._height    = 15;
		plane._positionX = 230;
		plane._positionY = 600;
		plane._speed     = 2;
		plane._HP        = 3;

		
		//先不要启动时钟
		this.time.events.start();


	}


}