var player = function(game, x, y, key, frame) {
    Phaser.Sprite.call(this, game, x, y, "dude", frame);
    this.game = game;


    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.add.sprite('dude');
    this.smoothed = false;
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.setSize(56, 72);
    this.jumpSound = this.game.add.audio('jump');
    this.body.gravity.y = 2000;
    //this.animations.add('walk',[1]);
    this.animations.add('right',[8,9,10,11],10,true);
    //this.animations.add('jump',[9,10,11,12,13,14,15,16],10,true);
    this.animations.add('left',[4,5,6,7],10,true);
    this.anchor.setTo(0.5, 1);
    this.speed = 400;
    this.game.camera.follow(this);
    this.game.camera.deadzone = new Phaser.Rectangle(100, 100, 200, 100);
    //this.body.bounce.y = 0.2;
    //this.body.gravity.y = 300;
    //this.createPlayer();

};
player.prototype = Object.create(Phaser.Sprite.prototype);

player.prototype.constructor = player;


player.prototype.update = function() {

  this.body.velocity.x = 0;

  if (this.cursors.left.isDown)
  {
      this.body.velocity.x = -this.speed;
      this.animations.play('right');
  }
  else if (this.cursors.right.isDown)
  {
      this.body.velocity.x = this.speed;
      this.animations.play('left');
  }
  else
  {
    this.animations.stop();
    this.frame = 1;
  }
  
  //  Allow the player to jump
  if (this.cursors.up.isDown && this.body.blocked.down) {
      this.body.velocity.y = -1000;
      this.jumpSound.play();

  }
  //console.log(this.body.touching.down) //Player is in air
  if(!this.body.blocked.down){
    this.animations.stop();
    this.frame = 2;
  }

};

module.exports = player;