enemyblob = function (game, x, y, direction, speed) {
	Phaser.Sprite.call(this, game, x, y, "enemyblob");
	this.anchor.setTo(0.5);
	this.scale.setTo(0.1,0.1);
	this.animations.add('move');
	this.animations.play("move",5,true);
	this.game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 500;
	this.xSpeed = direction*speed;
};
    
enemyblob.prototype = Object.create(Phaser.Sprite.prototype);
enemyblob.prototype.constructor = enemyblob;

enemyblob.prototype.update = function() {};


module.exports = enemyblob;