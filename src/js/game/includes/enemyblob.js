enemyblob = function (game, x, y, direction,player) {
	Phaser.Sprite.call(this, game, x, y, "enemyblob");
	this.anchor.setTo(0.5);
	this.scale.setTo(0.1,0.1);
	this.animations.add('move');
	this.animations.play("move",5,true);
	this.game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 500;
	this.speed = 70;
	this.gruntSound = this.game.add.audio('grunt');
	if(direction > 0){
		this.scale.x = -0.1;
	}
	this.randomNumber = (Math.floor(Math.random() * 10) + 1);
	this.xSpeed = direction*this.speed;
	this.game.time.events.loop(Phaser.Timer.SECOND * this.randomNumber, this.randomMove, this);
};
    
enemyblob.prototype = Object.create(Phaser.Sprite.prototype);
enemyblob.prototype.constructor = enemyblob;

enemyblob.prototype.update = function() {

};

enemyblob.prototype.moveEnemy = function(enemy, platform) {
    if(enemy.body.blocked.left || enemy.body.blocked.right){
		enemy.body.velocity.y = -50;
        enemy.xSpeed *= -1;
		if(enemy.xSpeed > 0){
			enemy.scale.x = -0.1;
		}
		else{
			enemy.scale.x = 0.1;
		}
    }

}

enemyblob.prototype.randomMove = function() {
	this.gruntSound.volume = 0.1;
	this.gruntSound.play();
	this.xSpeed = Math.floor(Math.random() * 200) + 70;
	this.body.velocity.y = -(Math.floor(Math.random() * 200) + 50);
	this.xSpeed *= -1;
	if(this.xSpeed > 0){
		this.scale.x = -0.1;
	}
	else{
		this.scale.x = 0.1;
	}
    
}

module.exports = enemyblob;