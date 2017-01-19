


States.Complete = function(game){

	this.create = function(){

		//添加通关文本
		_completeText = game.add.sprite(0,200,'completeText');
		//文本补间动画
		game.add.tween(_completeText).to({ y:300 },1000,null,true,0,Number.MAX_VALUE,true);

		this.input.onDown.addOnce(this.Complete, this);

	}

	this.Complete = function(){

		//文本清除
		_completeText.destroy();
		//添加福利图片
		game.add.sprite(0,0,'LeiMu');

		this.add.button(game.width - 130,game.height - 60,'back',function(){
			game.state.start('menu');
			this.add.sound('button').play();
				},this,1,0);

	}

}