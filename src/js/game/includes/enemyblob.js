enemyblob = function (game, x, y, direction,player) {
	Phaser.Sprite.call(this, game, x, y, "enemyblob");
	this.player = player;
	this.anchor.setTo(0.5);
	this.scale.setTo(0.1,0.1);
	this.animations.add('move');
	this.animations.play("move",5,true);
	this.game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 500;
	
	this.gruntSound = this.game.add.audio('grunt');
	this.rangeFinder = this.game.add.sprite(x, y, null);
	this.game.physics.enable(this.rangeFinder, Phaser.Physics.ARCADE);
	this.rangeFinder.width = 300;
	this.rangeFinder.height = 300;
	this.rangeFinder.body.setSize(300, 300, 0, 0);
	this.rangeFinder.anchor.setTo(0.5);

	
	this.rangeFinder.speed = 70;
	if(direction > 0){
		this.scale.x = -0.1;
	}
	this.randomNumber = (Math.floor(Math.random() * 10) + 1);
	this.rangeFinder.xSpeed = direction*this.rangeFinder.speed;
	this.xSpeed = this.rangeFinder.xSpeed;
	this.game.time.events.loop(Phaser.Timer.SECOND * this.randomNumber, this.randomMove, this);

};
    
enemyblob.prototype = Object.create(Phaser.Sprite.prototype);
enemyblob.prototype.constructor = enemyblob;

enemyblob.prototype.update = function() {
	if(this.rangeFinder.xSpeed == NaN){
			console.log("nan")
	}
	
	this.rangeFinder.x = this.body.x;
	this.rangeFinder.y = this.body.y;
	this.xSpeed = this.rangeFinder.xSpeed;
	this.game.physics.arcade.overlap(this.rangeFinder, this.player,this.hunt);
};

enemyblob.prototype.moveEnemy = function(enemy, platform) {
    if(enemy.body.blocked.left || enemy.body.blocked.right){
		enemy.body.velocity.y = -50;
        enemy.rangeFinder.xSpeed *= -1;
		if(enemy.rangeFinder.xSpeed > 0){
			enemy.rangeFinder.scale.x = -0.1;
		}
		else{
			enemy.rangeFinder.scale.x = 0.1;
		}
    }

}

enemyblob.prototype.randomMove = function() {
	this.gruntSound.volume = 0.1;
	this.gruntSound.play();
	this.rangeFinder.xSpeed = Math.floor(Math.random() * 200) + 70;
	this.body.velocity.y = -(Math.floor(Math.random() * 200) + 50);
	this.rangeFinder.xSpeed *= -1;
	if(this.rangeFinder.xSpeed > 0){
		this.rangeFinder.scale.x = -0.1;
	}
	else{
		this.rangeFinder.scale.x = 0.1;
	}
    
}

enemyblob.prototype.hunt = function(rangeFinder,player) {
	this.speed = 250;
	if(player.x > rangeFinder.x){
		rangeFinder.xSpeed = Math.abs(rangeFinder.xSpeed);
		rangeFinder.scale.x = -0.1;
	}
	else{
		rangeFinder.xSpeed *= -1;
		rangeFinder.scale.x = 0.1;	
	}
	
	
}

module.exports = enemyblob;

