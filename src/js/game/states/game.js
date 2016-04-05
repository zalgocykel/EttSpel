var player = require('../includes/player'),
    //addPlatform = require('../includes/block'),
    enemyblob = require('../includes/enemyblob'),
    game = {};
var enemySpeed = -70;
game.create = function() {
    this.game.add.sprite(0, 0, 'gridmap');
    //this.platformgroup = this.game.add.group();
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    this.addPlatform(0, this.game.world.height - 25, "longBlock", this.platforms);
    this.addPlatform(100, this.game.world.height - 25, "block", this.platforms);
    this.addPlatform(200, this.game.world.height - 25, "block", this.platforms);
    this.addPlatform(300, this.game.world.height - 25, "longBlock", this.platforms);
    this.addPlatform(400, this.game.world.height - 25, "block", this.platforms);
    this.addPlatform(500, this.game.world.height - 75, "longBlock", this.platforms);
    this.addPlatform(600, this.game.world.height - 125, "longBlock", this.platforms);
    this.addPlatform(400, 325, "longBlock", this.platforms);
    this.addPlatform(240, 60, "longBlock", this.platforms);
    this.enemyblob = new enemyblob(this.game, 400, 260, 1, enemySpeed);
    this.add.existing(this.enemyblob);
    console.log(this.enemyblob.xSpeed)
    this.player = new player(this.game, 0, 0);
    this.game.add.existing(this.player);
    //console.log(this.player)
    console.log(this.player)
    this.world.setBounds(0, 0, this.convertWidth * 4, this.convertHeight);
};
game.update = function() {
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.enemyblob, this.platforms, this.moveEnemy);
    this.enemyblob.body.velocity.x = this.enemyblob.xSpeed;
};
game.moveEnemy = function(enemy, platform) {
    if (enemy.xSpeed > 0 && enemy.x > platform.x + platform.width / 2 ||
        enemy.xSpeed < 0 && enemy.x < platform.x - platform.width / 2) {
        enemy.xSpeed *= -1;
        enemy.scale.x *= -1;
    }
}
game.addPlatform = function(posX, posY, asset, group) {
    platform = this.game.add.sprite(posX, posY, asset)
    platform.anchor.setTo(0.5);
    this.game.physics.enable(platform, Phaser.Physics.ARCADE);
    platform.body.immovable = true;
    group.add(platform);
    //platform.body.debug = true;
}
game.quitGame = function() {
    this.state.start('mainmenu');
};
module.exports = game;