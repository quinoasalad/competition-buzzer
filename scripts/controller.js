requirejs([
	'../node_modules/happyfuntimes/dist/hft',
	'../node_modules/hft-sample-ui/dist/sample-ui'
], function(hft, sampleUI) {
	"use strict";

	var GameClient = hft.GameClient;
	var CommonUI = sampleUI.commonUI;
	var Misc = sampleUI.misc;
	var MobileHacks = sampleUI.mobileHacks;
	
	var globals = {
		debug: false,
	};
	Misc.applyUrlSettings(globals);
	MobileHacks.fixHeightHack();

	var score = 0;
	var leftElem = document.getElementById("left");
	var rightElem = document.getElementById("right");
	var upElem = document.getElementById("up");
	var client = new GameClient();

	CommonUI.setupStandardControllerUI(client, globals);
	CommonUI.askForNameOnce(); // ask for the user's name if not set
	CommonUI.showMenu(true); // shows the gear menu

	var randInt = function(range) {
		return Math.floor(Math.random() * range);
	};


	// Pick a random color
	var color = 'rgb(' + randInt(256) + "," + randInt(256) + "," + randInt(256) + ")";
	// Send the color to the game.
	//
	// This will generate a 'color' event in the corresponding
	// NetPlayer object in the game.

	// client.sendCmd('color', {
	//     color: color,
	// });
	// colorElem.style.backgroundColor = color;


	// Update our score when the game tells us.
	// client.addEventListener('scored', function(cmd) {
	//     score += cmd.points;
	//     statusElem.innerHTML = "You scored: " + cmd.points + " total: " + score;
	// });


	function sendStop() {
		client.sendCmd("stop", {});
	}

	function sendLeft() {
		client.sendCmd("left", {});
	}

	function sendRight() {
		client.sendCmd("right", {});
	}

	function sendJump() {
		client.sendCmd("jump", {});
	}

	leftElem.addEventListener("touchstart", sendLeft);
	leftElem.addEventListener("touchmove", sendLeft);
	leftElem.addEventListener("touchend", sendStop);
	leftElem.addEventListener("touchcancel", sendStop);


	leftElem.addEventListener("mousedown", sendLeft);
	leftElem.addEventListener("mouseup", sendStop);



	rightElem.addEventListener("touchstart", sendRight);
	rightElem.addEventListener("touchmove", sendRight);
	rightElem.addEventListener("touchend", sendStop);
	rightElem.addEventListener("touchcancel", sendStop);


	rightElem.addEventListener("mousedown", sendRight);
	rightElem.addEventListener("mouseup", sendStop);



	upElem.addEventListener("touchstart", sendJump);
	upElem.addEventListener("mousedown", sendJump);


});