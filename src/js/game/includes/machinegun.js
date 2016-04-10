var machinegun = function(game, x, y,platform,player,enemies) {
    Phaser.Sprite.call(this, game, x, y, "machinegun");
    this.game = game;
    this.platform = platform;
    this.player = player;
    this.enemies = enemies;
    this.game.add.sprite('machinegun');
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 500;
    this.gunSound = this.game.add.audio('shoot');
    this.anchor.setTo(0.5);
    this.game.input.mouse.capture = true;
    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets.createMultiple(50, 'bullet');
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);



    this.bullets.fireRate = 200;
	this.bullets.nextFire = 200;
};

machinegun.prototype = Object.create(Phaser.Sprite.prototype);

machinegun.prototype.constructor = machinegun;


machinegun.prototype.update = function() {
	this.game.physics.arcade.collide(this, this.platform);
	if(this.game.physics.arcade.overlap(this, this.player)){
		this.grabGun(this, this.player)
		if(this.game.input.activePointer.leftButton.isDown){
			this.fire(this);
		}
	}
};

machinegun.prototype.grabGun = function(gun,player) {
	gun.rotation = this.game.physics.arcade.angleToPointer(gun);
	gun.x = player.x;
	gun.y = player.y-30;
	gun.body.gravity.y = 0;
};


machinegun.prototype.fire = function(gun) {

    if (this.game.time.now > gun.bullets.nextFire && gun.bullets.countDead() > 0)
    {
		this.gunSound.volume = 0.5;
		this.gunSound.play();
        gun.bullets.nextFire = this.game.time.now + gun.bullets.fireRate;

        var bullet = gun.bullets.getFirstDead();

        bullet.reset(gun.x, gun.y-7);

        this.game.physics.arcade.moveToPointer(bullet, 1000);
    }

};



module.exports = machinegun;