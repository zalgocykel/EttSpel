var mainmenu = {};

mainmenu.create = function () {
	this.game.music = this.game.add.audio('titleMusic');
	this.game.music.play();

	this.background = this.game.add.sprite(0, 0, 'titlepage');
	this.background.width = 1000;
	this.background.height = 1000;
	this.game.playButton = this.game.add.button(50,  50, 'playButton', this.startGame, this);
	this.game.playButton.anchor.setTo(0.5, 0.5);
};

mainmenu.update = function () {

	//	Do some nice funky main menu effect here

};

mainmenu.startGame = function () {

	//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
	this.game.music.stop();

	//	And start the actual game
	this.game.state.start('game');

}


module.exports = mainmenu;
