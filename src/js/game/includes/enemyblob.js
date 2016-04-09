enemyblob = function (game, x, y, direction,player) {
	Phaser.Sprite.call(this, game, x, y, "enemyblob");
	this.player = player;
	this.anchor.setTo(0.5);
	this.scale.setTo(0.1,0.1);
	this.animations.add('move',[0,1],5,true);
	
	this.game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 500;
	
	this.gruntSound = this.game.add.audio('grunt');
	this.rangeFinder = this.game.add.sprite(x, y, null);
	this.game.physics.enable(this.rangeFinder, Phaser.Physics.ARCADE);
	this.rangeFinder.body.setSize(300, 30);
	this.rangeFinder.anchor.setTo(0.5);
	this.rangeFinder.huntSound = this.game.add.audio('caught');
	
	this.speed = 70;
	this.rangeFinder.cache = [];
	if(direction > 0){
		this.scale.x = 0.1;
	}
	this.randomNumber = (Math.floor(Math.random() * 10) + 1);
	this.xSpeed = direction*this.speed;
	this.game.time.events.loop(Phaser.Timer.SECOND * this.randomNumber, this.randomMove, this);

};
    
enemyblob.prototype = Object.create(Phaser.Sprite.prototype);
enemyblob.prototype.constructor = enemyblob;

enemyblob.prototype.update = function() {

	
	this.rangeFinder.x = this.body.x;
	this.rangeFinder.y = this.body.y;
	
	// If not in range clear "hunt cache" else folllow
	if(this.game.physics.arcade.overlap(this.rangeFinder, this.player)){
		this.hunt(this, this.player)
		    this.animations.stop();
    		this.frame = 2;
	}
	else{
		this.animations.play("move");
		if(this.rangeFinder.cache.indexOf(this.rangeFinder.renderOrderID) > 0){
		    this.rangeFinder.cache.splice(this.rangeFinder.cache.indexOf(this.rangeFinder.renderOrderID), 1);
		}	
	}
};

enemyblob.prototype.moveEnemy = function(enemy, platform) {
    if(enemy.body.blocked.left || enemy.body.blocked.right){
		enemy.body.velocity.y = -50;
        enemy.rangeFinder.xSpeed *= -0.1;
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

enemyblob.prototype.hunt = function(enemy,player) {
	if(enemy.rangeFinder.cache.indexOf(enemy.rangeFinder.renderOrderID) == -1){
		enemy.rangeFinder.cache.push(enemy.rangeFinder.renderOrderID);
		enemy.rangeFinder.huntSound.volume = 0.5;
		enemy.rangeFinder.huntSound.play();
	}

	if(player.x > enemy.rangeFinder.x){
		enemy.xSpeed = 250;
		enemy.scale.x = -0.1;
	}
	else{
		enemy.xSpeed = -250;
		enemy.scale.x = 0.1;	
	}

}





module.exports = enemyblob;

