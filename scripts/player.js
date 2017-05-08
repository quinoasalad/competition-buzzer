define([], function() {
	"use strict";


	// world
	// sprite animation
	// handle buzz, tint


	var spriteSpecs = [{
		key: "tux",
		frames: [3, 4, 5]
	}, {
		key: "mikos",
		frames: [0, 1, 2, 3]
	}, {
		key: "razz",
		frames: [0, 1, 2, 3]
	}, {
		key: "miks",
		frames: [0, 1]
	}];

	var player = function(netPlayer, globals) {
		this._netPlayer = netPlayer;
		// this._name = name;
		this._playerId = globals.getPlayerCount();
		this._globals = globals;
		this._game = globals.getGame();

		this._jump = false;
		this._left = false;
		this._right = false;
		this._buzz = false;



		this._netPlayer.addEventListener('disconnect', player.prototype.disconnect.bind(this));
		this._netPlayer.addEventListener("jump", player.prototype.jump.bind(this));
		this._netPlayer.addEventListener("left", player.prototype.left.bind(this));
		this._netPlayer.addEventListener("right", player.prototype.right.bind(this));
		this._netPlayer.addEventListener("stop", player.prototype.stop.bind(this));

		this._netPlayer.addEventListener("_hft_setname_", function(event) {
			if (this._name) {
				this._name.destroy();
			}
			this._name = this._game.add.text(0, 0, event.name, this._globals.getTextStyle());
		}.bind(this));


		this._netPlayer.addEventListener("_hft_busy_", function(event) {});

		this._netPlayer.addEventListener("color", function() {});
		// netPlayer.sendCmd('color', this.color);
		this.createSprite(this._game);
		// this.createName(game);

	};

	player.prototype.disconnect = function() {
		this._globals.removePlayer(this);
		this._player.destroy();
		this._name.destroy();
	};

	player.prototype.jump = function(cmd) {
		this._jump = true;
		this._buzz = true;
		this._globals.buzz(this);
	};

	player.prototype.left = function(cmd) {
		this._left = true;
		if (this._player.scale.x > 0) {
			this._player.scale.x *= -1;
		}
	};

	player.prototype.right = function(cmd) {
		this._right = true;
		if (this._player.scale.x < 0) {
			this._player.scale.x *= -1;
		}
	};

	player.prototype.stop = function(cmd) {
		this._right = false;
		this._left = false;
	};

	player.prototype.createSprite = function(game) {
		// The player and its settings
		// this._player = game.add.sprite(32 + 50 * this._playerId, 600 - 150, 'dude');

		// //
		// this._player = game.add.sprite(32 + 50 * this._playerId, 300, 'dude');
		// // animation sprite dep
		// this._player.animations.add("left", [3, 4, 5], 10, true);
		// this._player.animations.add("right", [3, 4, 5], 10, true);

		var params = spriteSpecs[Math.floor(Math.random() * spriteSpecs.length)];
		this._player = game.add.sprite(32 + 50 * this._playerId, 300, params.key);
		this._player.animations.add("walk", params.frames, 10, true);



		this._globals.addSpriteToGroup(this._player);

		// this._player.scale.setTo(4, 4);

		//  We need to enable physics on the player
		game.physics.arcade.enable(this._player);

		//  Player physics properties. Give the little guy a slight bounce.
		this._player.body.bounce.y = 0.2;
		this._player.body.gravity.y = 300;
		this._player.body.collideWorldBounds = true;

		//  Our two animations, walking left and right.
		// this._player.animations.add('left', [0, 1, 2, 3], 10, true);
		// this._player.animations.add('right', [5, 6, 7, 8], 10, true);
	};

	// player.prototype.createSprite = function() {
	// 	// sprite name 56x80
	// 	// walking anim
	// 	// this._player.animations.add("right", [3, 4, 5], 10, true);
	// };

	// player.prototype.createName = function(game) {
	// 	this._text1 = game.add.text(0, 0, "Alya", this._globals.textStyle);
	// 	// text2.alignTo(sprite1, Phaser.RIGHT_CENTER, 16);
	// 	// text3.alignTo(sprite1, Phaser.RIGHT_BOTTOM, 16);
	// };

	player.prototype.update = function() {
		this._globals.collidePlayers(this._player);

		//  Allow the player to jump if they are touching the ground.
		if (this._jump && this._player.body.touching.down) {
			this._player.body.velocity.y = -350;
			this._jump = false;
		}
		if (this._left) {
			this._player.body.velocity.x = -150;
			this._player.animations.play("walk");
		} else if (this._right) {
			this._player.body.velocity.x = 150;
			this._player.animations.play("walk");
		} else {
			this._player.body.velocity.x = 0;
			this._player.animations.stop();
			this._player.frame = 4;
		}

		if (this._name) {
			this._name.alignTo(this._player, Phaser.TOP_CENTER, 16);
		}



		this._globals.displayRank(this);
		// var index = this._globals.rank.indexOf(this);
		// if (index !== -1) {
		// 	var rankSprite = this._globals.rankSprites[index];
		// 	rankSprite.alignTo(this._player, Phaser.BOTTOM_CENTER, 16);
		// }

	};

	// tint flash order
	player.prototype.tint = function() {
		// flash number
		//  flash sprite
	};



	return player;
});