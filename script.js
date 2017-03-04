var hero = document.getElementsByClassName("hero")[0];
hero.style.left = "0px";
hero.style.top = "0px";

var movement = {
	movingUp: false,
	movingDown: false,
	movingLeft: false,
	movingRight: false
}

var mouseX, mouseY;

document.addEventListener("keydown", function(event) {
	var key = event.keyCode;
	if (key < 41) {
		determineMovement(key);
	}
	else {
		attack();
	}
});

document.addEventListener("mousemove", function(event) {
	mouseX = event.pageX;
	mouseY = event.pageY;
	console.log(mouseX, mouseY);
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
		hero.style[direction] = directionValue + "px";
}




function attack() {
	// var beginLeft = hero.style.left;
	// var beginTop = hero.style.top;
	var style = document.createElement('style');
	style.type = 'text/css';
	var left = parseInt(hero.style["left"].split("px")[0]);
	var top = parseInt(hero.style["top"].split("px")[0]);
	var random = Math.floor(Math.random() * 1000000);
	var classRandom = 'fired' + random;
	var bulletRandom = 'bullet' + random;
	style.innerHTML = '.' + bulletRandom + ' { position: fixed; left: ' + (left) + 'px; top: ' + top + 'px; } ' + '.' + classRandom + ' { left: ' + (mouseX * 4)  + 'px; top: ' + (mouseY  * 4) + 'px; }';
	document.getElementsByTagName('head')[0].appendChild(style);

	var bullet = document.createElement("div");
	bullet.classList.add("bullet", bulletRandom);
	// bullet.style.top = beginTop;
	// console.log(bullet.style)
	hero.prepend(bullet);
	// appendedBullet = document.getElementsByClassName("bullet")[0];


	setTimeout(function() {
		bullet.classList.add(classRandom)
	}, 20)

	// appendedBullet.style.left = "100px";
	// console.log(appendedBullet.style)
}
