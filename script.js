
var hero = new Hero("hero", [0, 0], 5, true);
var enemy = new Hero("enemy", [400, 300], 5);

hero.target = enemy;

var mouseX = 1, mouseY = 1;


document.addEventListener("mousemove", function(event) {
	mouseX = event.pageX;
	mouseY = event.pageY;
});


setTimeout(function(){
	setInterval(function() {

		setTimeout(function() {
			enemy.movement.movingDown = false;
			enemy.movement.movingUp = true;
		}, 2000)

		setTimeout(function() {
			enemy.movement.movingUp = false;
			enemy.movement.movingDown = true;
		})

	}, 4000)

}, 2400)

function Hero(domNode, startingPosition, speed, controlling) {

	var hero = this;
	hero.speed = speed;

	hero.target;
	hero.move = move;

	hero.hitBox = buildCircularHitBox(50, startingPosition[0] + 25, startingPosition[1] + 25 );

	hero.movement = {
		movingUp: false,
		movingDown: false,
		movingLeft: false,
		movingRight: false
	}

	setup();

	function setup() {

		hero.domNode = document.getElementsByClassName(domNode)[0];
		hero.domNode.style.left = startingPosition[0] + "px";
		hero.domNode.style.top = startingPosition[1] + "px";

		hero.left;

		if (controlling) {
			addListeners();
		}

	}

	function buildCircularHitBox(width, centerX, centerY) {

		var hitBox = [];
		var radius = width / 2;

		for (var i = 0; i < width; i++) {
		    xValue = (centerX + radius * Math.cos(2 * Math.PI * i / width));
		    yValue = (centerY + radius * Math.sin(2 * Math.PI * i / width));
			hitBox.push({left: Math.round(xValue), top: Math.round(yValue)});
		}
		return hitBox;
	}

	var movementFrames = setInterval(function() {

		if (hero.movement.movingLeft) {
			move("left", -(hero.speed), "movingLeft");
		}
		if (hero.movement.movingRight) {
			move("left", hero.speed, "movingRight")
		}
		if (hero.movement.movingUp) {
			move("top", -(hero.speed), "movingUp");
		}
		if (hero.movement.movingDown) {
			move("top", hero.speed, "movingDown")
		}
	}, 40)

	function addListeners() {

		document.addEventListener("keydown", function(event) {
			var key = event.keyCode;
			if (key < 41) {
				determineMovement(key);
			}
			else {
				attack();
			}
		});

		document.addEventListener("keyup", function(event) {
			switch(event.keyCode) {
				case 37:
					hero.movement.movingLeft = false;
					// clearInterval(currentlyMovingLeft);
					break;
				case 38:
					hero.movement.movingUp = false;
					// clearInterval(currentlyMovingUp);
					break;
				case 39:
					hero.movement.movingRight = false;
					// clearInterval(currentlyMovingRight);
					break;
				case 40:
					hero.movement.movingDown = false;
					// clearInterval(currentlyMovingDown);
					break;
			}
		});
	}

	function determineMovement(key) {

		switch(key) {
			case 37:
				if (hero.movement.movingLeft === false) {
					hero.movement.movingLeft = true;
					currentlyMovingLeft = setInterval(function() {
						// move("left", -(hero.speed), "movingLeft")
					}, 10)
				}
				break;
			case 38:
				if (hero.movement.movingUp === false) {
					hero.movement.movingUp = true;
					currentlyMovingUp = setInterval(function() {
						// move("top", -(hero.speed), "movingUp")
					}, 10)
				}
				break;
			case 39:
				if (hero.movement.movingRight === false) {
					hero.movement.movingRight = true;
					currentlyMovingRight = setInterval(function() {
						// move("left", hero.speed, "movingRight")
					}, 10)
				}
				break;
			case 40:
				if (hero.movement.movingDown === false) {
					hero.movement.movingDown = true;
					currentlyMovingDown = setInterval(function() {
						// move("top", hero.speed, "movingDown")
					}, 10)
				}
				break;
		}
	}

	function move(direction, value, movementAction) {
			var directionValue = parseInt(hero.domNode.style[direction].split("px")[0]);
			directionValue += value;
			hero.domNode.style[direction] = directionValue + "px";

			// if (value > 0) {
				// for (var i = 0; i < value; i++) {
					// setTimeout(function() {
						// console.log("Down")
						hero.hitBox.forEach(function(element, index) {
							element[direction] += value;
							// console.log(element[direction])
							// showHits(element.left, element.top);
						})
					// }, (i * 200))
				// }
			// } else {
				// for (var i = 0; i > value; i--) {
					// setTimeout(function() {
					// 	// console.log("Up")
						// hero.hitBox.forEach(function(element, index) {
							// element[direction] -= 1;
					// 		// console.log(element[direction])
							// showHits(element.left, element.top);
						// })
					// }, (i * 200))
				// }
			// }

	}



	function attack() {

		var bulletStyles = document.createElement('style');
		bulletStyles.type = 'text/css';
		var left = parseInt(hero.domNode.style["left"].split("px")[0]);
		var top = parseInt(hero.domNode.style["top"].split("px")[0]);


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

		var bulletDestX = p1.x + Math.cos(angleRadians) * 1000;
		var bulletDestY = p1.y + Math.sin(angleRadians) * 1000;

		var random = Math.floor(Math.random() * 1000000);
		var classRandom = 'fired' + random;
		var bulletRandom = 'bullet' + random;

		// left/top vs transform

		// bulletStyles.innerHTML = '.' + bulletRandom + ' { position: fixed; left: ' + (left) + 'px; top: ' + top + 'px; } ' + '.' + classRandom + ' { left: ' + (bulletDestX)  + 'px; top: ' + (bulletDestY) + 'px; }';
		bulletStyles.innerHTML = '.' + bulletRandom + ' { position: fixed; left: ' + (left) + 'px; top: ' + top + 'px; } ' + '.' + classRandom + ' { transform: translate(' + (bulletDestX - left)  + 'px, ' + (bulletDestY - top) + 'px); }';

		document.getElementsByTagName('head')[0].appendChild(bulletStyles);

		var bullet = document.createElement("div");
		bullet.classList.add("bullet", bulletRandom);

		hero.domNode.prepend(bullet);

		setTimeout(function() {
			bullet.classList.add(classRandom);
		}, 20);

		var currentFrame = 0;

		var didHit = setInterval(function() {
			if (currentFrame < 200) {
				currentFrame += 1;
			}
			var bulletLeft = (((bulletDestX - left) / 200) * currentFrame) + left;
			var bulletTop = (((bulletDestY - top) / 200) * currentFrame) + top;
			// console.log(currentFrame, "I started at [", left, top, "] I am currently at [", bulletLeft, bulletTop, "] I am going to [", bulletDestX, bulletDestY, "]");
			didItHit(hero.target, bulletLeft, bulletTop, removeBullet);
		}, 1);

		function removeBullet() {
			bullet.remove();
			bulletStyles.remove();
			clearInterval(didHit);
		}

		setTimeout(removeBullet, 1000)

	}

	function didItHit(target, left, top, callback) {

		target.hitBox.forEach(function(element) {
			if (Math.abs(element["left"] - left) <= 2 && Math.abs(element["top"] - top) <= 2) {
				showHits(left, top);
				callback();
			}
		})
	}

	function showHits(left, top) {

		var bullet = document.createElement("div");
		var random = Math.floor(Math.random() * 1000000);
		var bulletRandom = 'bullet' + random;
		var bulletStyles = document.createElement('style');
		bulletStyles.type = 'text/css';
		bullet.classList.add("bullet", bulletRandom);
		bulletStyles.innerHTML = '.' + bulletRandom + ' { position: fixed; left: ' + (left) + 'px; top: ' + top + 'px; }';
		document.getElementsByTagName('head')[0].appendChild(bulletStyles);

		hero.domNode.prepend(bullet);

		setTimeout(function() {
			bullet.remove();
		}, 3000)
	}

	// function buildSquareHitBox(hitBox, width, topX, topY) {
	//
	// 	for (var i = 0; i < width; i++) {
	// 		for (var j = 0; j < width; j++) {
	// 			hitBox.push([topX + i, topY + j]);
	// 		}
	// 	}
	//
	// }

}
