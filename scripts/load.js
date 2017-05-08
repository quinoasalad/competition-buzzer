define([], function() {
	"use strict";

	var state = function(game) {
		this._game = game;

		// Load the image
		this.preload = function() {
			this._game.load.image('sky', 'assets/sky.png');
			this._game.load.image('ground', 'assets/platform.png');
			this._game.load.image('star', 'assets/star.png');
			this._game.load.image("button", "assets/refresh_button.png");
			// this._game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
			this._game.load.spritesheet("tux", "assets/tux_from_linux.png", 56, 80);
			this._game.load.spritesheet("mikos", "assets/mikos_walk_sheet.png", 47, 66);
			this._game.load.spritesheet("razz", "assets/razz_walk_sheet.png", 67, 61);
			this._game.load.spritesheet("miks", "assets/miks_walk_sheet.png", 45, 59);
			// this._game.load.image('dude', 'assets/dude.png');
		};

		this.create = function() {
			this._game.state.start("menu");
		};
	};

	return state;
});