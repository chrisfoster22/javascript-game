function buildSquareHitBox(hitBox, width, topX, topY) {

	for (var i = 0; i < width; i++) {
		for (var j = 0; j < width; j++) {
			hitBox.push([topX + i, topY + j]);
		}
	}

}



// left/top vs transform
bulletStyles.innerHTML = '.' + bulletRandom + ' { position: fixed; left: ' + (left) + 'px; top: ' + top + 'px; } ' + '.' + classRandom + ' { left: ' + (bulletDestX)  + 'px; top: ' + (bulletDestY) + 'px; }';


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
