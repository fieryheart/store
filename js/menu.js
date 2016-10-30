



States.menu = function(game){

	this.create = function(){

		//当作背景图片
		this.add.tileSprite(0,0,game.width,game.height,'background').autoScroll(0,10);
		

		//创建存放标题的组
		var titleGroup = this.add.group();
		//创建标题
		titleGroup.create(0,0,'title');
		//调整标题组的水平位置
		titleGroup.x = 40;
		//调整标题组的垂直位置
		titleGroup.y = 120;



		//创建存放按钮的组
		var btnGroup   = this.add.group();
		//调整按钮组的水平位置
		btnGroup.x = game.width  / 2;
		btnGroup.y = game.height / 2;

		
		//对这个组添加一个tween动画，让它不停的上下移动
		// game.add.tween(titleGroup).to({ y:200 },1000,null,true,0,Number.MAX_VALUE,true); 



		//添加开始按钮
		var btn_start = this.add.button(game.width/2,game.height/2,'btn-start',function(){

		           game.state.start('play');
		           this.add.sound('button').play();

		       	},this,1,0);
		//添加帮助按钮
		var btn_help  = this.add.button(game.width/2,game.height/2 + 100,'btn-help',function(){

			game.state.start('help');
			this.add.sound('button').play();

				},this,1,0);
		//添加CREDITS按钮
		var btn_credits  = this.add.button(game.width/2,game.height/2 + 200,'btn-credits',function(){

			game.state.start('credits');
			this.add.sound('button').play();
			
				},this,1,0);


		//设置开始按钮的对准点
		btn_start.anchor.setTo(0.5,0.5);
		//设置帮助按钮的对准点
		btn_help.anchor.setTo(0.5,0.5);
		//设置制作CREDITS的对准点
		btn_credits.anchor.setTo(0.5,0.5);



	}

	

}


