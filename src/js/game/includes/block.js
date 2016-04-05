var addPlatform = function (posX,posY,asset,group) {
	platform = game.add.sprite(posX,posY,asset)
	platform.anchor.setTo(0.5);
	game.physics.enable(platform, Phaser.Physics.ARCADE);
	platform.body.allowGravity = false;
	platform.body.immovable = true;
	group.add(platform);	
}

module.exports = addPlatform;