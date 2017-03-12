function attack(ability) {

	var abilityStyles = document.createElement('style');
	abilityStyles.type = 'text/css';
	var left = parseInt(hero.domNode.style["left"].split("px")[0]) + (ability.width/2);
	var top = parseInt(hero.domNode.style["top"].split("px")[0]) + (ability.width/2);


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

	abilityDiv.style.transition = "all " + (ability.speed * .0035) + "s linear";

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

	setTimeout(removeAbility, ability.speed * 4);
	setCooldown(ability);

	function removeAbility() {
		clearInterval(didHit);
		setTimeout(function() {
			abilityDiv.remove();
			abilityStyles.remove();
		}, 60)

	}

	function setCooldown(ability) {
		cooldownMap[ability.key] = true;
		setTimeout(function() {
			cooldownMap[ability.key] = false;
		}, ability.cooldown * 1000);
	}

}
