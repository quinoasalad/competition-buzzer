define([], function() {
	"use strict";

	var state = function(game) {
		this._game = game;

		// Load the image
		this.preload = function() {
			// this._game.load.image('progressBar', 'assets/progressBar.png');
		};

		this.create = function() {
			// Set some game settings
			// this._game.stage.backgroundColor = '#3498db';
			this._game.physics.startSystem(Phaser.Physics.ARCADE);
			this._game.renderer.renderSession.roundPixels = true;
			// Start the load state
			this._game.state.start("load");
		};
	};

	return state;
});