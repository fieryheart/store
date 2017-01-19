

States.preload = function(game){


	this.preload = function(){

		//将进度条添加为雪碧，并用setPreloadSprite来让进度条动起来
		var _preloadSprite = this.add.sprite(20,game.height - 30,'loading');
		this._Loading       = this.add.sprite(game.width / 2,game.height / 2,'Loading');
		this.load.setPreloadSprite(_preloadSprite, 0);
		this._Loading.anchor.setTo(0.5,0.5);
		//添加缓冲的动画
		this._Loading.animations.add('roll',[0,1,2,3,4,5,6,7,8,9,10,11,12],10,false);
		



		//加载游戏中需要的背景，飞机，弹幕，按钮，标题
		this.load.image('background','../images/background.png');
		this.load.image('title','../images/title.png');
		this.load.image('play-ready','../images/play_ready.png');
		this.load.image('help','../images/help.png');
		this.load.image('credits','../images/credits.png');
		this.load.image('gameOverBG','../images/gameOverBG.png');
		this.load.image('LeiMu','../images/LeiMu.png');
		this.load.image('LeiMu_M','../images/LeiMu_M.png');
		this.load.image('completeText','../images/completeText.png');
		this.load.image('Danmaku_01','../images/Danmaku_01.png');
		this.load.image('Danmaku_02','../images/Danmaku_02.png');
		this.load.image('Danmaku_03','../images/Danmaku_03.png');
		this.load.image('Danmaku_04','../images/Danmaku_04.png');
		this.load.image('Danmaku_05','../images/Danmaku_05.png');
		this.load.image('Danmaku_06','../images/Danmaku_06.png');
		// this.load.spritesheet('ready-yes','../images/ready_yes.png',100,50,2);
		// this.load.spritesheet('ready-no','../images/ready_no.png',100,50,2);
		// this.load.spritesheet('btn-start','../images/menu-START.png',160,50,2);
		// this.load.spritesheet('btn-help','../images/menu-HELP.png',160,50,2);
		// this.load.spritesheet('btn-credits','../images/menu-CREDITS.png',160,50,2);
		this.load.spritesheet('plane','../images/plane.jpg',15,15,3);		
		this.load.spritesheet('btn-start','../images/menu_start.png',160,50,2);		
		this.load.spritesheet('btn-help','../images/menu_help.png',160,50,2);
		this.load.spritesheet('btn-credits','../images/menu_credits.png',210,50,2);
		this.load.spritesheet('back','../images/back.png',100,60,2);
		this.load.audio('button','../audio/button.mp3');
		this.load.audio('BGM','../audio/BGM.mp3');
		this.load.audio('destroy','../audio/destroy.mp3');
		this.load.audio('eat_09','../audio/eat_09.mp3');
		this.load.audio('add_one','../audio/add_one.mp3');

	};

	this.create = function(){

		//进入菜单界面
		game.state.start('menu');

	};

	this.update = function(){

		//播放缓冲的动画
		this._Loading.animations.play('roll');

	}
};



