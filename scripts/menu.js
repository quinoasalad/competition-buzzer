define([], function() {
	"use strict";

	var state = function(game) {
		this._game = game;

		this.create = function() {
			this._game.state.start("play");
		};
	};

	return state;
});