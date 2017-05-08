define([], function() {
	"use strict";

	var state = function(globals) {
		this._game = globals.getGame();
		this._globals = globals;
		this._players = globals.getPlayers();

		// var player;
		var platforms;
		var cursors;

		this.create = function() {

			// method to create world

			//  A simple background for our game
			var skySprite = this._game.add.sprite(0, 0, 'sky');
			skySprite.width = this._game.width;
			skySprite.scale.y = skySprite.scale.x;

			//  The platforms group contains the ground and the 2 ledges we can jump on
			platforms = this._game.add.group();

			//  We will enable physics for any object that is created in this group
			platforms.enableBody = true;

			// Here we create the ground.
			var ground = platforms.create(0, this._game.world.height - 64, 'ground');

			//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
			ground.scale.setTo(2, 2);
			ground.width = this._game.width;

			//  This stops it from falling away when you jump on it
			ground.body.immovable = true;

			//  Now let's create two ledges
			// var ledge = platforms.create(400, 400, 'ground');
			// ledge.body.immovable = true;

			// ledge = platforms.create(-150, 250, 'ground');
			// ledge.body.immovable = true;

			//  Our controls.
			cursors = this._game.input.keyboard.createCursorKeys();



			var button = this._game.add.button(30, 30, "button", this.actionOnClick, this);



			// this._game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
			// this._game.scale.startFullScreen(false);
		};

		this.actionOnClick = function() {
			this._globals.clearRank();
		};


		this.update = function() {
			// this._globals.players.forEach(function(player) {
			this._players.forEach(function(player) {
				this._game.physics.arcade.collide(player._player, platforms);
				player.update();
			}, this);
		};

	};

	return state;
});