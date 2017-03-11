function Ability(args) {

	this.name = args.name;
	this.width = args.width;
	this.hitBox = buildCircularHitBox(this.width);
	this.range = args.range;
	this.speed = args.speed;
	this.cooldown = args.cooldown;
	this.key = args.key;

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
