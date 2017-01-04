var hero = document.getElementsByClassName("hero")[0];
hero.style.left = "0px";
hero.style.top = "0px";

var movement = {
	movingUp: false,
	movingDown: false,
	movingLeft: false,
	movingRight: false
}

var currentlyMoving;

document.addEventListener("keydown", function(event) {
	determineMovement(event.keyCode)
});

document.addEventListener("keyup", function(event) {
	switch(event.keyCode) {
		case 37:
			movement.movingLeft = false;
			clearInterval(currentlyMovingLeft);
			break;
		case 38:
			movement.movingUp = false;
			clearInterval(currentlyMovingUp);
			break;
		case 39:
			movement.movingRight = false;
			clearInterval(currentlyMovingRight);
			break;
		case 40:
			movement.movingDown = false;
			clearInterval(currentlyMovingDown);
			break;
	}
});

function determineMovement(key) {

	switch(key) {
		case 37:
			if (movement.movingLeft === false) {
				movement.movingLeft = true;
				currentlyMovingLeft = setInterval(function() {
					move("left", -5, "movingLeft")
				}, 10)
			}
			break;
		case 38:
			if (movement.movingUp === false) {
				movement.movingUp = true;
				currentlyMovingUp = setInterval(function() {
					move("top", -5, "movingUp")
				}, 10)
			}
			break;
		case 39:
			if (movement.movingRight === false) {
				movement.movingRight = true;
				currentlyMovingRight = setInterval(function() {
					move("left", 5, "movingRight")
				}, 10)
			}
			break;
		case 40:
			if (movement.movingDown === false) {
				movement.movingDown = true;
				currentlyMovingDown = setInterval(function() {
					move("top", 5, "movingDown")
				}, 10)
			}
			break;
	}
}

function move(direction, value, movementAction) {
		var directionValue = parseInt(hero.style[direction].split("px")[0]);
		directionValue += value;
		console.log(directionValue)
		hero.style[direction] = directionValue + "px";
}
