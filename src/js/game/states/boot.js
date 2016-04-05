var Stats = require('Stats'),
    boot = {};

boot.preload = function() {
    this.game.load.image('preloaderBackground',
        'images/preloader_background.jpg');
    this.game.load.image('preloaderBar', 'images/preloadr_bar.png');
};

boot.create = function() {
    addStats(this.game);
    this.game.sound.mute = false;
    this.game.state.start('preloader');
};

function addStats(game) {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
    // In order to correctly monitor FPS, we have to make calls to the stats package before and after phaser's update.
    var oldUpdate = game.update;
    game.update = function() {
        stats.begin();
        oldUpdate.apply(game, arguments);
        stats.end();
    };
}
module.exports = boot;