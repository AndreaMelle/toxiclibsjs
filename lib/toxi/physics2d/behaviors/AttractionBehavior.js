define(["require", "exports", "module"], function(require, exports, module) {
var	AttractionBehavior = function(attractor,radius,strength,jitter){
	if(arguments.length < 3){
		throw { name: "IncorrectParameters", message: "Constructor received incorrect Parameters"};
	}
	this.jitter = jitter || 0;	
	this.attractor = attractor;
	this.strength = strength;
	this.setRadius(radius);
	this.affects = null;
};

AttractionBehavior.prototype = {
	applyBehavior: function(p){ //apply() is reserved, so this is now applyBehavior

		if(p.tag && this.affects) {
			var idx = this.affects.indexOf(p.tag);
			if (idx <= -1) {
				return;
			}
		}

		var delta = this.attractor.sub(p);
		var dist = delta.magSquared();
		if(dist < this.radiusSquared){
			var f = delta.normalizeTo((1.0 - dist / this.radiusSquared)).jitter(this.jitter).scaleSelf(this.attrStrength);
			p.addForce(f);
		}
	},
	
	configure: function(timeStep){
		this.timeStep = timeStep;
		this.setStrength(this.strength);
	},
	
	getAttractor: function(){
		return this.attractor;
	},
	
	getJitter: function(){
		return this.jitter;
	},
	
	getRadius: function(){
		return this.radius;
	},
	
	getStrength: function(){
		return this.strength;
	},
	
	setAttractor: function(attractor){
		this.attractor = attractor;
	},
	
	setJitter: function(jitter){
		this.jitter = jitter;
	},
	
	setRadius: function(r){
		this.radius = r;
		this.radiusSquared = r * r;
	},
	
	setStrength: function(strength){
		this.strength = strength;
		this.attrStrength = strength * this.timeStep;
	},

	addAffects: function(tag) {
		if(!this.affects) {
			this.affects = new Array();
		}
		this.affects.push(tag);
	},

	removeAffects: function(tag) {
		if(this.affects) {
			var i = this.affects.indexOf(tag);
			if(i > -1) {
				return this.affects.splice(i,1)[0];
			}
		}
	}
};

module.exports = AttractionBehavior;

});
