



States.help = function(game){

	this.create = function(){


		var LeiMu = this.add.sprite(0,-10,'LeiMu_M');
		game.add.tween(LeiMu).to({ y:0 },1000,null,true,0,Number.MAX_VALUE,true);
		this.add.sprite(0,0,'help');


		this.add.button(game.width - 130,game.height - 60,'back',function(){
			game.state.start('menu');
			this.add.sound('button').play();
				},this,1,0);
	}


}