var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require,
    baseUrl: __dirname,
    paths: {
        phaser: "../node_modules/phaser-ce/build/phaser"
    },
    shim: {
        phaser: {
            exports: "Phaser"
        }
    }
});

// Start the main app logic.
requirejs([
    "../node_modules/happyfuntimes/dist/hft",
    "phaser",
    "boot",
    "load",
    "menu",
    "play",
    "player",
    "globals"
], function(happyfuntimes, Phaser, Boot, Load, Menu, Play, Player, globals) {
    "use strict";

    // Initialize Phaser
    // var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
    var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
    globals.init(game);

    var bootState = new Boot(game);
    var loadState = new Load(game);
    var menuState = new Menu(game);
    var playState = new Play(globals);

    game.state.add('boot', bootState);
    game.state.add('load', loadState);
    game.state.add('menu', menuState);
    game.state.add('play', playState);

    // Start the 'boot' state
    game.state.start('boot');

    var server = new happyfuntimes.GameServer();
    // A new player has arrived.
    server.on('playerconnect', function(netPlayer) {
        globals.addPlayer(new Player(netPlayer, globals));
        // globals.rankSprites.push(globals.game.add.text(0, 0, globals.playerId, globals.textStyle));
    });

});