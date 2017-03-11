function Ability(name, width, range, speed, cooldown, key) {

	this.name = name;
	this.width = width;
	this.hitBox = buildCircularHitBox(width);
	this.range = range;
	this.speed = speed;
	this.cooldown = cooldown;
	this.key = key;

	function buildCircularHitBox(width, centerX, centerY) {

		centerX = centerX || 0;
		centerY = centerY || 0;

		var hitBox = [];
		var radius = width / 2;

		for (var i = 0; i < width; i++) {
			xValue = (centerX + radius * Math.cos(2 * Math.PI * i / width));
			yValue = (centerY + radius * Math.sin(2 * Math.PI * i / width));
			hitBox.push({left: Math.round(xValue), top: Math.round(yValue)});
		}
		return hitBox;
	}
}
