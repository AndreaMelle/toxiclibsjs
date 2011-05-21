// toxi-physics2d.js r34 - http://github.com/hapticdata/toxiclibsjs
toxi.physics2d=toxi.physics2d||{};toxi.physics2d.removeItemFrom=function(a,b){var c=b.indexOf(a);if(c>-1)return b.splice(c,1)};toxi.physics2d.VerletParticle2D=function(a,b,c){this.force=new toxi.Vec2D;if(a instanceof toxi.Vec2D)if(a instanceof toxi.physics2d.VerletParticle2D){b=a.y;c=a.weight;a=a.x;this.isLocked=a.isLocked}else{if(b===undefined){b=a.y;c=1}else{c=b;b=a.y}a=a.x}this.isLocked=false;this.init(a,b);this.prev=new toxi.Vec2D(this);this.temp=new toxi.Vec2D;c=c===undefined?1:c;this.setWeight(c)};
toxi.extend(toxi.physics2d.VerletParticle2D,toxi.Vec2D);toxi.physics2d.VerletParticle2D.prototype.addBehavior=function(a,b){if(this.behaviors===undefined)this.behaviors=[];if(a===undefined)throw{name:"TypeError",message:"behavior was undefined"};b=b===undefined?1:b;a.configure(b);this.behaviors.push(a);return this};toxi.physics2d.VerletParticle2D.prototype.addConstraint=function(a){if(this.constraints===undefined)this.constraints=[];this.constraints.push(a);return this};
toxi.physics2d.VerletParticle2D.prototype.addForce=function(a){this.force.addSelf(a);return this};toxi.physics2d.VerletParticle2D.prototype.addVelocity=function(a){this.prev.subSelf(a);return this};toxi.physics2d.VerletParticle2D.prototype.applyBehaviors=function(){if(this.behaviors!==undefined){var a=0;for(a=0;a<this.behaviors.length;a++)this.behaviors[a].applyBehavior(this)}};
toxi.physics2d.VerletParticle2D.prototype.applyConstraints=function(){if(this.constraints!==undefined){var a=0;for(a=0;a<this.constraints.length;a++)this.constraints[a].applyConstraint(this)}};toxi.physics2d.VerletParticle2D.prototype.clearForce=function(){this.force.clear();return this};toxi.physics2d.VerletParticle2D.prototype.clearVelocity=function(){this.prev.set(this);return this};toxi.physics2d.VerletParticle2D.prototype.getInvWeight=function(){return this.invWeight};
toxi.physics2d.VerletParticle2D.prototype.getPreviousPosition=function(){return this.prev};toxi.physics2d.VerletParticle2D.prototype.getVelocity=function(){return this.sub(this.prev)};toxi.physics2d.VerletParticle2D.prototype.getWeight=function(){return this.weight};toxi.physics2d.VerletParticle2D.prototype.lock=function(){this.isLocked=true;return this};toxi.physics2d.VerletParticle2D.prototype.removeAllBehaviors=function(){this.behaviors=[];return this};
toxi.physics2d.VerletParticle2D.prototype.removeAllConstraints=function(){this.constraints=[];return this};toxi.physics2d.VerletParticle2D.prototype.removeBehavior=function(a){return toxi.physics2d.removeItemFrom(a,this.behaviors)};toxi.physics2d.VerletParticle2D.prototype.removeConstraint=function(a){return toxi.physics2d.removeItemFrom(a,this.constraints)};toxi.physics2d.VerletParticle2D.prototype.scaleVelocity=function(a){this.prev.interpolateToSelf(this,1-a);return this};
toxi.physics2d.VerletParticle2D.prototype.setPreviousPosition=function(a){this.prev.set(a);return this};toxi.physics2d.VerletParticle2D.prototype.setWeight=function(a){this.weight=a;this.invWeight=a!==0?1/a:0};toxi.physics2d.VerletParticle2D.prototype.unlock=function(){this.clearVelocity();this.isLocked=false;return this};
toxi.physics2d.VerletParticle2D.prototype.update=function(){if(!this.isLocked){this.applyBehaviors();this.temp.set(this);this.addSelf(this.sub(this.prev).addSelf(this.force.scale(this.weight)));this.prev.set(this.temp);this.force.clear();this.applyConstraints()}};toxi.physics2d.VerletSpring2D=function(a,b,c,d){this.a=a;this.b=b;this.restLength=c;this.strength=d};toxi.physics2d.VerletSpring2D.EPS=1.0E-6;
toxi.physics2d.VerletSpring2D.prototype={getRestLength:function(){return this.restLength},getStrength:function(){return this.strength},lockA:function(a){this.isALocked=a;return this},lockB:function(a){this.isALocked=a;return this},setRestLength:function(a){this.restLength=a;this.restLengthSquared=a*a;return this},setStrength:function(a){this.strength=a;return this},update:function(a){var b=this.b.sub(this.a),c=b.magnitude()+toxi.physics2d.VerletSpring2D.EPS;c=(c-this.restLength)/(c*(this.a.invWeight+
this.b.invWeight))*this.strength;if(!this.a.isLocked&&!this.isALocked){this.a.addSelf(b.scale(c*this.a.invWeight));a&&this.a.applyConstraints()}if(!this.b.isLocked&&!this.isBLocked){this.b.addSelf(b.scale(-c*this.b.invWeight));a&&this.b.applyConstraints()}}};toxi.physics2d.AttractionBehavior=function(a,b,c,d){if(arguments.length<3)throw{name:"IncorrectParameters",message:"Constructor received incorrect Parameters"};this.jitter=d||0;this.attractor=a;this.strength=c;this.setRadius(b)};
toxi.physics2d.AttractionBehavior.prototype={applyBehavior:function(a){var b=this.attractor.sub(a),c=b.magSquared();if(c<this.radiusSquared){b=b.normalizeTo(1-c/this.radiusSquared).jitter(this.jitter).scaleSelf(this.attrStrength);a.addForce(b)}},configure:function(a){this.timeStep=a;this.setStrength(this.strength)},getAttractor:function(){return this.attractor},getJitter:function(){return this.jitter},getRadius:function(){return this.radius},getStrength:function(){return this.strength},setAttractor:function(a){this.attractor=
a},setJitter:function(a){this.jitter=a},setRadius:function(a){this.radius=a;this.radiusSquared=a*a},setStrength:function(a){this.strength=a;this.attrStrength=a*this.timeStep}};toxi.physics2d.ConstantForceBehavior=function(a){this.initConstantForceBehavior(a)};
toxi.physics2d.ConstantForceBehavior.prototype={applyBehavior:function(a){a.addForce(this.scaledForce)},configure:function(a){this.timeStep=a;this.setForce(this.force)},getForce:function(){return this.force},initConstantForceBehavior:function(a){this.force=a;this.scaleForce=new toxi.Vec2D;this.timeStep=0},setForce:function(a){this.force=a;this.scaledForce=this.force.scale(this.timeStep)},toString:function(){return"behavior force: "+this.force+" scaledForce: "+this.scaledForce+" timeStep: "+this.timeStep}};
toxi.physics2d.GravityBehavior=function(a){this.initConstantForceBehavior(a)};toxi.physics2d.GravityBehavior.prototype=new toxi.physics2d.ConstantForceBehavior;toxi.physics2d.GravityBehavior.prototype.constructor=toxi.physics2d.GravityBehavior;toxi.physics2d.GravityBehavior.prototype.parent=toxi.physics2d.ConstantForceBehavior.prototype;toxi.physics2d.GravityBehavior.prototype.configure=function(a){this.timeStep=a;this.scaledForce=this.force.scale(a*a)};
toxi.physics2d.AngularConstraint=function(a,b){if(arguments.length>1){this.theta=b;this.rootPos=new toxi.Vec2D(a)}else{this.rootPos=new toxi.Vec2D;this.theta=a}if(parseInt(this.theta)!=this.theta)this.theta=toxi.MathUtils.radians(this.theta)};toxi.physics2d.AngularConstraint.prototype.applyConstraint=function(a){var b=a.sub(this.rootPos),c=toxi.MathUtils.floor(b.heading()/this.theta)*this.theta;a.set(this.rootPos.add(toxi.Vec2D.fromTheta(c).scaleSelf(b.magnitude())))};
toxi.physics2d.AxisConstraint=function(a,b){this.axis=a;this.constraint=b};toxi.physics2d.AxisConstraint.prototype.applyConstraint=function(a){a.setComponent(this.axis,this.constraint)};toxi.physics2d.CircularConstraint=function(a,b){if(arguments.length==1)this.circle=a;else{console.log("a: "+a);this.circle=new toxi.Circle(a,b)}};toxi.physics2d.CircularConstraint.prototype.applyConstraint=function(a){this.circle.containsPoint(a)&&a.set(this.circle.add(a.sub(this.circle).normalizeTo(this.circle.getRadius())))};
toxi.physics2d.MaxConstraint=function(a,b){this.axis=a;this.threshold=b};toxi.physics2d.MaxConstraint.prototype.applyConstraint=function(a){a.getComponent(this.axis)>this.threshold&&a.setComponent(this.axis,this.threshold)};toxi.physics2d.MinConstraint=function(a,b){this.axis=a;this.threshold=b};toxi.physics2d.MinConstraint.prototype.applyConstraint=function(a){a.getComponent(this.axis)<this.threshold&&a.setComponent(this.axis,this.threshold)};
toxi.physics2d.RectConstraint=function(a,b){if(arguments.length==1)this.rect=a.copy();else if(arguments.length>1)this.rect=new toxi.Rect(a,b);this.intersectRay=new toxi.Ray2D(this.rect.getCentroid(),new toxi.Vec2D)};
toxi.physics2d.RectConstraint.prototype={applyConstraint:function(a){this.rect.containsPoint(a)&&a.set(this.rect.intersectsRay(this.intersectRay.setDirection(this.intersectRay.sub(a)),0,Number.MAX_VALUE))},getBox:function(){return this.rect.copy()},setBox:function(a){this.rect=a.copy();this.intersectRay.set(this.rect.getCentroid())}};toxi.physics2d.ParticlePath2D=function(a){toxi.Spline2D.call(this,a);this.particles=[]};toxi.extend(toxi.physics2d.ParticlePath2D,toxi.Spline2D);
(function(){toxi.physics2d.ParticlePath2D.prototype.createParticles=function(a,b,c,d){this.particles=[];this.computeVertices(b);b=0;c=this.getDecimatedVertices(c,true);for(b=0;b<c;b++){var f=this.createSingleParticle(v,d);this.particles.push(f);a.addParticle(f)}return this.particles}})();
toxi.physics2d.ParticleString2D=function(a,b,c,d,f,j){this.physics=a;this.links=[];var g=undefined,e=undefined,i=undefined,h=0;if(arguments.length===3){j=c;this.particles=b||[];for(h=0;h<this.particles.length;h++){e=this.particles[h];this.physics.addParticle(e);if(g!==undefined){i=this.createSpring(g,e,g.distanceTo(e),c);this.links.push(i);this.physics.addSpring(i)}g=e}}else{var k=b.copy(),l=c.magnitude();this.particles=[];for(h=0;h<d;h++){e=new toxi.physics2d.VerletParticle2D(k.copy(),f);this.particles.push(e);
this.physics.particles.push(e);if(g!==undefined){i=this.createSpring(g,e,l,j);this.links.push(i);this.physics.addSpring(i)}g=e;k.addSelf(c)}}};
toxi.physics2d.ParticleString2D.prototype={clear:function(){for(var a=0,b=this.links.length;a<b;a++)this.physics.removeSpringElements(s);this.particles.clear();this.links.clear()},createSpring:function(a,b,c,d){return new toxi.physics2d.VerletSpring2D(a,b,c,d)},getHead:function(){return this.particles[0]},getNumParticles:function(){return this.particles.length},getTail:function(){return this.particles[this.particles.length-1]}};
toxi.physics2d.PullBackString2D=function(a,b,c){toxi.physics2d.VerletSpring2D.call(this,a,b,0,c);a.lock();this.setRestLength(0.5)};toxi.extend(toxi.physics2d.PullBackString2D,toxi.physics2d.VerletSpring2D);toxi.physics2d.PullBackString2D.prototype.update=function(a){this.b.distanceToSquared(this.a)>this.restLengthSquared&&this.parent.update.call(this,a)};
toxi.physics2d.VerletConstrainedSpring2D=function(a,b,c,d,f){toxi.physics2d.VerletSpring2D.call(this,a,b,c,d);this.limit=f===undefined?Number.MAX_VALUE:f};toxi.extend(toxi.physics2d.VerletConstrainedSpring2D,toxi.physics2d.VerletSpring2D);
toxi.physics2d.VerletConstrainedSpring2D.update=function(a){var b=this.b.sub(this.a),c=b.magnitude()+toxi.physics2d.VerletSpring2D.EPS;c=(c-this.restLength)/(c*(this.a.invWeight+this.b.invWeight))*this.strength;if(!this.a.isLocked&&!this.isALocked){this.a.addSelf(b.scale(c*this.a.invWeight).limit(this.limit));a&&this.a.applyConstraints()}if(!this.b.isLocked&&!this.isBLocked){this.b.subSelf(b.scale(c*this.b.invWeight).limit(this.limit));a&&this.b.applyConstraints()}};
toxi.physics2d.VerletMinDistanceSpring2D=function(a,b,c,d){toxi.physics2d.VerletSpring2D.call(this,a,b,c,d);this.setRestLength(c)};toxi.extend(toxi.physics2d.VerletMinDistanceSpring2D,toxi.physics2d.VerletSpring2D);toxi.physics2d.VerletMinDistanceSpring2D.prototype.update=function(a){this.b.distanceToSquared(this.a)<this.restLengthSquared&&this.parent.update.call(this,a)};
toxi.physics2d.VerletPhysics2D=function(a,b,c,d){this.behaviors=[];this.particles=[];this.springs=[];this.numIterations=b===undefined?50:b;this.timeStep=d===undefined?1:d;this.setDrag(c||0);a!==undefined&&this.addBehavior(new toxi.physics.GravityBehavior(a))};toxi.physics2d.VerletPhysics2D.addConstraintToAll=function(a,b){for(var c=0;c<b.length;c++)b[c].addConstraint(a)};toxi.physics2d.VerletPhysics2D.removeConstraintFromAll=function(a,b){for(var c=0;c<b.length;c++)b[c].removeConstraint(a)};
toxi.physics2d.VerletPhysics2D.prototype={addBehavior:function(a){if(a===undefined)throw{name:"TypeError",message:"Incorrect Parameters for toxi.physics2d.VerletPhysics2D addBehavior"};a.configure(this.timeStep);this.behaviors.push(a)},addParticle:function(a){this.particles.push(a);return this},addSpring:function(a){this.getSpring(a.a,a.b)===undefined&&this.springs.push(a);return this},clear:function(){this.particles=[];this.springs=[];return this},constrainToBounds:function(){var a=undefined,b=0;
for(b=0;b<this.particles.length;b++){a=this.particles[b];a.bounds!==undefined&&a.constrain(a.bounds)}if(this.worldBounds!==undefined)for(b=0;b<this.particles.length;b++){a=this.particles[b];a.constrain(this.worldBounds)}},getCurrentBounds:function(){var a=new toxi.Vec2D(Number.MAX_VALUE,Number.MAX_VALUE),b=new toxi.Vec2D(Number.MIN_VALUE,Number.MIN_VALUE),c=0,d=undefined;for(c=0;c<this.particles.length;c++){d=this.particles[c];a.minSelf(d);b.maxSelf(d)}return new toxi.Rect(a,b)},getDrag:function(){return 1-
this.drag},getNumIterations:function(){return this.numIterations},getSpring:function(a,b){var c=0;for(c=0;c<this.springs.length;c++){var d=this.springs[c];if(d.a===a&&d.b===b||d.a===b&&d.b===b)return d}},getTimeStep:function(){return this.timeStep},getWorldBounds:function(){return this.worldBounds},removeBehavior:function(a){return toxi.physics2d.removeItemFrom(a,this.behaviors)},removeParticle:function(a){return toxi.physics2d.removeItemFrom(a,this.particles)},removeSpring:function(a){return toxi.physics2d.removeItemFrom(a,
this.springs)},removeSpringElements:function(a){if(this.removeSpring(a)!==undefined)return this.removeParticle(a.a)&&this.removeParticle(a.b);return false},setDrag:function(a){this.drag=1-a},setNumIterations:function(a){this.numIterations=a},setTimeStep:function(a){this.timeStep=a;var b=0;for(b=0;b<this.behaviors.length;b++)this.behaviors[b].configure(a)},setWorldBounds:function(a){this.worldBounds=a;return this},update:function(){this.updateParticles();this.updateSprings();this.constrainToBounds();
return this},updateParticles:function(){var a=0,b=0,c=undefined,d=undefined;for(a=0;a<this.behaviors.length;a++){c=this.behaviors[a];for(b=0;b<this.particles.length;b++){d=this.particles[b];c.applyBehavior(d)}}for(b=0;b<this.particles.length;b++){d=this.particles[b];d.scaleVelocity(this.drag);d.update()}},updateSprings:function(){var a=0,b=0;for(a=this.numIterations;a>0;a--)for(b=0;b<this.springs.length;b++)this.springs[b].update(a===1)}};
