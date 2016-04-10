var preloader = {},
fileloadText,
audioDecodeText,
count = 0,
dots = [],
showDots;
preloader.preload = function () {
	this.game.background = null;
	this.game.preloadBar = null;

	this.game.ready = false;
	
	this.game.load.onFileComplete.add(this.fileComplete, this.game);
	//this.load.spritesheet('cat', 'images/cat.png',542,474,8);
	this.game.load.spritesheet('dude', 'images/dude.png', 56, 71);
	this.game.load.spritesheet('enemyblob', 'images/enemy.png',359,367);
	//	These are the assets we loaded in Boot.js542 474
	//	A nice sparkly background and a loading progress bar

	this.game.background = this.game.add.sprite(0, 0, 'preloaderBackground');
	this.game.preloadBar = this.game.add.sprite(300, 400, 'preloaderBar');
	fileloadText = this.game.add.text(32, 32, '', { fill: '#ffffff' });
	audioDecodeText = this.game.add.text(32, 64, '', { fill: '#ffffff' });
	//	This sets the preloadBar sprite as a loader sprite.
	//	What that does is automatically crop the sprite from 0 to full-width
	//	as the files below are loaded in.
	this.game.load.setPreloadSprite(this.game.preloadBar);


	//	Here we load the rest of the assets our game needs.
	this.game.load.image('gridmap', 'images/gridmap.png');
	this.game.load.image('bullet', 'images/bullet.png');
	this.game.load.image('sky', 'images/blue.jpg');
	this.game.load.image('gravityGun', 'images/gravityGun.png');
	this.game.load.image('machinegun', 'images/machinegun.png');
	this.game.load.spritesheet('beam', 'images/beam.png', 100, 20);
	this.game.load.image('playButton', 'images/winner.png');
	this.game.load.image('titlepage', 'images/title.jpg');
	this.game.load.image('block', 'images/test.png');
	this.game.load.image('longBlock', 'images/test.png');
	//this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
	this.game.load.audio('titleMusic', ['audio/CloZee-Koto.mp3']);
	this.game.load.tilemap('map', 'maps/collide_test.json', null, Phaser.Tilemap.TILED_JSON);
	this.game.load.image('sheet', 'maps/sheet.png');
	this.game.load.audio('jump', 'audio/jump.wav');
	this.game.load.audio('grunt', 'audio/enemyblurb-noise.wav');
	this.game.load.audio('caught', 'audio/gotIt.wav');
	this.game.load.audio('beam', 'audio/beam.wav');
	this.game.load.audio('shoot', 'audio/shoot.wav');

};
console.log
preloader.create = function () {
	this.game.preloadBar.cropEnabled = false;
};


preloader.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
		fileloadText.setText("File Progress: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
}

preloader.update = function () {
	count++;
	//	Wait for our audio file to be decoded before proceeding to the MainMenu.
	if(!this.game.cache.isSoundDecoded('titleMusic') && this.game.ready == false){
		if(count % 10 && !(dots.length > 3)){
			dots.push(".");
		}
		else{
			dots = []
		}
		showDots = dots.join("")
		audioDecodeText.setText("Decoding sound"+dots);
	}
	//if (this.game.cache.isSoundDecoded('titleMusic') && this.game.ready == false)
	//{
		this.game.ready = true;
		this.game.state.start('mainmenu');
	//}

};

module.exports = preloader;
