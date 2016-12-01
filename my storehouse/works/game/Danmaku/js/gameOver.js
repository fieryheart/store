




States.gameOver = function(game){

	this.create = function(){

		this.add.tileSprite(0,100,game.width,game.height,'gameOverBG');

		this.add.button(game.width - 130,game.height - 60,'back',function(){
			game.state.start('menu');
			this.add.sound('button').play();
				},this,1,0);

	}
}