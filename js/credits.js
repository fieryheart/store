

States.credits = function(game){

	this.create = function(){

		this.add.tileSprite(0,0,game.width,game.height,'background').autoScroll(0,10);

		this.add.sprite(0,0,'credits');

		this.add.button(game.width - 130,game.height - 60,'back',function(){
			game.state.start('menu');
			this.add.sound('button').play();
				},this,1,0);

	}

}