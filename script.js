var hero = document.getElementsByClassName("hero")[0];
hero.style.left = "0px";
hero.style.top = "0px";

var enemy = document.getElementsByClassName("enemy")[0];
enemy.left = 400;
enemy.top = 300;

var hitBox = [];
for (var i = 0; i < 50; i++) {
	for (var j = 0; j < 50; j++) {
	hitBox.push([enemy.left + i, enemy.top + j])
	}
}

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

	var bulletStyles = document.createElement('style');
	bulletStyles.type = 'text/css';
	var left = parseInt(hero.style["left"].split("px")[0]);
	var top = parseInt(hero.style["top"].split("px")[0]);


	var p1 = {
		x: left,
		y: top
	};

	var p2 = {
		x: mouseX,
		y: mouseY
	};

	// angle in radians
	var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

	var bulletDestX = p1.x + Math.cos(angleRadians) * 300;
	var bulletDestY = p1.y + Math.sin(angleRadians) * 300;

	var random = Math.floor(Math.random() * 1000000);
	var classRandom = 'fired' + random;
	var bulletRandom = 'bullet' + random;
	// bulletStyles.innerHTML = '.' + bulletRandom + ' { position: fixed; left: ' + (left) + 'px; top: ' + top + 'px; } ' + '.' + classRandom + ' { left: ' + (bulletDestX)  + 'px; top: ' + (bulletDestY) + 'px; }';
	bulletStyles.innerHTML = '.' + bulletRandom + ' { position: fixed; left: ' + (left) + 'px; top: ' + top + 'px; } ' + '.' + classRandom + ' { transform: translate(' + (bulletDestX - left)  + 'px, ' + (bulletDestY - top) + 'px); }';
	document.getElementsByTagName('head')[0].appendChild(bulletStyles);

	var bullet = document.createElement("div");
	bullet.classList.add("bullet", bulletRandom);

	hero.prepend(bullet);

	var hypX = mouseX - left;
	var hypY = mouseY - top;


	setTimeout(function() {
		bullet.classList.add(classRandom)
	}, 20);

	var currentFrame = 0;

	var didHit = setInterval(function() {
		if (currentFrame < 200) {
			currentFrame += 1;
		}
		var bulletLeft = (((bulletDestX - left) / 200) * currentFrame) + left;
		var bulletTop = (((bulletDestY - top) / 200) * currentFrame) + top;
		// console.log(currentFrame, "I started at [", left, top, "] I am currently at [", bulletLeft, bulletTop, "] I am going to [", bulletDestX, bulletDestY, "]");
		// console.log(bulletLeft, bulletTop);
		didItHit(bulletLeft, bulletTop);
	}, 1);

	setTimeout(function() {
		bullet.remove();
		bulletStyles.remove();
		clearInterval(didHit);

	}, 1000)

}

function didItHit(left, top) {
	left = Math.round(left);
	top = Math.round(top);
	// console.log(left, top)

	hitBox.forEach(function(element) {
		// console.log(element, left, top)
		// if (Math.abs(element[0] - left) <= 2 && Math.abs(element[1] - top) <= 2) {
		if (element[0] === left && element[1] === top) {
			// document.add
			console.log("HIT!!!");
			var bullet = document.createElement("div");
			var random = Math.floor(Math.random() * 1000000);
			var bulletRandom = 'bullet' + random;
			var bulletStyles = document.createElement('style');
			bulletStyles.type = 'text/css';
			bullet.classList.add("bullet", bulletRandom);
			bulletStyles.innerHTML = '.' + bulletRandom + ' { position: fixed; left: ' + (left) + 'px; top: ' + top + 'px; }';
			document.getElementsByTagName('head')[0].appendChild(bulletStyles);

			hero.prepend(bullet);
		}
	})
}
