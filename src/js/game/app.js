var _ = require('lodash'),
    states = {
        boot: require('./states/boot.js'),
        preloader: require('./states/preloader.js'),
        mainmenu: require('./states/mainmenu.js'),
        game: require('./states/game.js')
    },
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
// Register each state.
_.each(states, function(state, key) {
    game.state.add(key, state);
});
game.state.start('boot');