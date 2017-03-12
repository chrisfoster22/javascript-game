function Ability(args) {

	this.name = args.name;
	this.width = args.width;
	this.range = args.range;
	this.speed = args.speed;
	this.cooldown = args.cooldown;
	this.key = args.key;
	this.damage = args.damage;

	this.hitBox = buildCircularHitBox(this.width);

	var statusEffects = {
		freeze: function(target, value) {
			var initialSpeed = target.speed;
			target.speed -= 4;
			setTimeout(function() {
				target.speed = initialSpeed;
			}, value * 1000);
		},

		poison: function(target, value) {
			var poisonCounter = setInterval(function() {
				target.damage(target, value)
			}, 1000);
			setTimeout(function() {
				clearInterval(poisonCounter)
			}, 3000);
		}
	}

	if (args.statusEffect) {
		this.statusEffect = {
			effect: statusEffects[args.statusEffect.name],
			value: args.statusEffect.value
		}
	}

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
