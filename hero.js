
function Hero(domNode, startingPosition, speed, controlling, abilites) {

	var hero = this;

	hero.speed = speed;
	hero.target;

	var movementFrames,
	abilityMap;

	var cooldownMap = {};

	hero.hitBox = buildCircularHitBox(50, startingPosition[0] + 25, startingPosition[1] + 25 );

	hero.movement = {
		movingUp: false,
		movingDown: false,
		movingLeft: false,
		movingRight: false
	}


	setup();

	function buildAbilityMap(abilities) {
		var abilityMap = {};
		abilities.forEach(function(ability) {
			abilityMap[ability.key] = ability;
			cooldownMap[ability.key] = false;
		});
		return abilityMap;
	}

	function move(direction, value, movementAction) {
		var directionValue = parseInt(hero.domNode.style[direction].split("px")[0]);
		directionValue += value;
		hero.domNode.style[direction] = directionValue + "px";

		hero.hitBox.forEach(function(element, index) {
			element[direction] += value;

		});
	}

	function attack(ability) {

		var abilityStyles = document.createElement('style');
		abilityStyles.type = 'text/css';
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

		var abilityDestX = p1.x + Math.cos(angleRadians) * ability.range;
		var abilityDestY = p1.y + Math.sin(angleRadians) * ability.range;

		var random = Math.floor(Math.random() * 1000000);
		var classRandom = 'fired' + random;
		var abilityRandom = ability.name + random;

		// Animate the ability using transform. Old way using left/top values is in pit.js.
		abilityStyles.innerHTML = '.' + abilityRandom + ' { height: ' + ability.width + 'px; width: ' + ability.width + 'px; position: fixed; left: ' + (left) + 'px; top: ' + top + 'px; } ' + '.' + classRandom + ' { transform: translate(' + (abilityDestX - left)  + 'px, ' + (abilityDestY - top) + 'px); }';

		document.getElementsByTagName('head')[0].appendChild(abilityStyles);

		var abilityDiv = document.createElement("div");
		abilityDiv.classList.add(ability.name, abilityRandom);

		abilityDiv.style.transition = "all " + (ability.speed * .004) + "s linear";

		hero.domNode.prepend(abilityDiv);

		setTimeout(function() {
			abilityDiv.classList.add(classRandom);
		}, 20);

		var currentFrame = 0;

		var didHit = setInterval(function() {
			if (currentFrame < ability.speed * 4) {
				currentFrame += 1;
			}
			var abilityLeft = (((abilityDestX - left) / ability.speed) * currentFrame) + left;
			var abilityTop = (((abilityDestY - top) / ability.speed) * currentFrame) + top;
			// console.log(currentFrame, "I started at [", left, top, "] I am currently at [", abilityLeft, abilityTop, "] I am going to [", abilityDestX, abilityDestY, "]");
			didItHit(ability, hero.target, abilityLeft, abilityTop, removeAbility);
		}, 1);

		function removeAbility() {
			abilityDiv.remove();
			abilityStyles.remove();
			clearInterval(didHit);
		}
		cooldownMap[ability.key] = true;
		setTimeout(function() {
			cooldownMap[ability.key] = false;
		}, ability.cooldown * 1000)

		setTimeout(removeAbility, ability.speed * 4)

	}

	function didItHit(ability, target, left, top, callback) {
		var abilityHitBox = buildCircularHitBox(ability.width, left, top);
		abilityHitBox.forEach(function(abilityBox) {
			target.hitBox.forEach(function(targetBox) {
				if (Math.abs(targetBox["left"] - abilityBox["left"]) <= 2 && Math.abs(targetBox["top"] - abilityBox["top"]) <= 2) {
					showHits(ability, left, top, abilityHitBox, target.hitBox);
					callback();
				}
			})
		})
	}

	function showHits(ability, left, top) {

		var abilityDiv = document.createElement("div");
		var random = Math.floor(Math.random() * 1000000);
		var abilityRandom = ability.name + random;
		var abilityStyles = document.createElement('style');
		abilityStyles.type = 'text/css';
		abilityDiv.classList.add(ability.name, abilityRandom);
		abilityStyles.innerHTML = '.' + abilityRandom + ' { height: ' + ability.width + 'px; width: ' + ability.width + 'px; position: fixed; left: ' + (left) + 'px; top: ' + top + 'px; }';
		document.getElementsByTagName('head')[0].appendChild(abilityStyles);

		hero.domNode.prepend(abilityDiv);

		setTimeout(function() {
				abilityDiv.remove();
			}, 3000)

	}

	function setup() {

		hero.domNode = document.getElementsByClassName(domNode)[0];
		hero.domNode.style.left = startingPosition[0] + "px";
		hero.domNode.style.top = startingPosition[1] + "px";

		hero.left;

		abilityMap = buildAbilityMap(abilities);

		if (controlling) {
			addListeners();
		}

		movementFrames = setInterval(function() {

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

	}

	function addListeners() {

		document.addEventListener("keydown", function(event) {
			var key = event.keyCode;
			if (key < 41) {
				determineMovement(key);
			}
			else if (key > 48 < 54){
				var ability = abilityMap[key];
				if (cooldownMap[key] === false) {
					attack(ability);
				}
			}
		});

		document.addEventListener("keyup", cancelMovement);

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

	function cancelMovement(event) {
		switch(event.keyCode) {
			case 37:
				hero.movement.movingLeft = false;
				break;
			case 38:
				hero.movement.movingUp = false;
				break;
			case 39:
				hero.movement.movingRight = false;
				break;
			case 40:
				hero.movement.movingDown = false;
				break;
		}
	}

	function determineMovement(key) {

		switch(key) {
			case 37:
				if (hero.movement.movingLeft === false) {
					hero.movement.movingLeft = true;
				}
				break;
			case 38:
				if (hero.movement.movingUp === false) {
					hero.movement.movingUp = true;
				}
				break;
			case 39:
				if (hero.movement.movingRight === false) {
					hero.movement.movingRight = true;
				}
				break;
			case 40:
				if (hero.movement.movingDown === false) {
					hero.movement.movingDown = true;
				}
				break;
		}
	}

}
