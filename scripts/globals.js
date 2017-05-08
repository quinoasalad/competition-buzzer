define([], function() {
	"use strict";

	// var _playerCount = 0,
	var _players = [],
		_textStyle = {
			font: "32px Courier",
			fill: "#00ff44"
		},
		_game,
		_spriteGroup,
		_rank = [],
		_rankSprites = [];

	return {
		init: function(game) {
			_game = game;
		},

		getPlayerCount: function() {
			return _players.length;
		},
		getPlayers: function() {
			return _players;
		},
		getTextStyle: function() {
			return _textStyle;
		},
		getGame: function() {
			return _game;
		},


		addPlayer: function(player) {
			_players.push(player);
			var sprite = _game.add.text(0, 0, this.getPlayerCount(), _textStyle);
			sprite.visible = false;
			_rankSprites.push(sprite);
		},

		addSpriteToGroup: function(sprite) {
			if (!_spriteGroup) {
				_spriteGroup = _game.add.group();
				_spriteGroup.enableBody = true;
			}
			_spriteGroup.add(sprite);
		},

		removePlayer: function(player) {
			var index = _players.indexOf(player);
			if (index !== -1) {
				_players.splice(index, 1);
			}
		},

		buzz: function(player) {
			// globals.array first buzz, add
			if (_rank.indexOf(player) === -1) {
				_rank.push(player);
			}
		},

		displayRank: function(player) {
			var index = _rank.indexOf(player);
			if (index !== -1) {
				var rankSprite = _rankSprites[index];
				if (!rankSprite.visible) {
					rankSprite.visible = true;
				}
				rankSprite.alignTo(player._player, Phaser.BOTTOM_CENTER, 16);
			}
		},

		clearRank: function() {
			_rank = [];
			_rankSprites.forEach(function(sprite) {
				sprite.visible = false;
			});
		},

		collidePlayers: function(player) {
			_game.physics.arcade.collide(player, _spriteGroup);
		}



		// var index = this._globals.rank.indexOf(this);
		// if (index !== -1) {
		// 	var rankSprite = this._globals.rankSprites[index];
		// 	rankSprite.alignTo(this._player, Phaser.BOTTOM_CENTER, 16);
		// }



	};

});