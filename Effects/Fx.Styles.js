/*
Script: Fx.Styles.js
	Contains <Fx.Styles>

License:
	MIT-style license.
*/

/*
Class: Fx.Styles
	Allows you to animate multiple css properties at once;
	Colors must be in hex format.
	Inherits methods, properties, options and events from <Fx.Base>.

Arguments:
	el - the $(element) to apply the styles transition to
	options - the fx options (see: <Fx.Base>)

Example:
	(start code)
	var myEffects = new Fx.Styles('myElement', {duration: 1000, transition: Fx.Transitions.linear});

	//height from 10 to 100 and width from 900 to 300
	myEffects.start({
		'height': [10, 100],
		'width': [900, 300]
	});

	//or height from current height to 100 and width from current width to 300
	myEffects.start({
		'height': 100,
		'width': 300
	});
	(end)
*/

Fx.Styles = new Class({
	
	Extends: Fx.Base,

	initialize: function(element, options){
		this.parent($(element), options);
	},

	setNow: function(){
		for (var p in this.from) this.now[p] = Fx.CSS.compute(this.from[p], this.to[p], this);
	},

	set: function(to){
		var parsed = {};
		for (var p in to) parsed[p] = Fx.CSS.set(to[p]);
		return this.parent(parsed);
	},

	/*
	Property: start
		Executes a transition for any number of css properties in tandem.

	Arguments:
		obj - an object containing keys that specify css properties to alter and values that specify either the from/to values (as an array)
		or just the end value (an integer).

	Example:
		see <Fx.Styles>
	*/

	start: function(obj){
		if (this.timer && this.options.wait) return this;
		this.now = {};
		var from = {}, to = {};
		for (var p in obj){
			var parsed = Fx.CSS.prepare(this.element, p, obj[p]);
			from[p] = parsed.from;
			to[p] = parsed.to;
		}
		return this.parent(from, to);
	},

	increase: function(){
		for (var p in this.now) this.element.setStyle(p, Fx.CSS.serve(this.now[p], this.options.unit));
	}

});

/*
Class: Element
	Custom class to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

Element.extend({

	/*
	Property: effects
		Applies an <Fx.Styles> to the Element; This a shortcut for <Fx.Styles>.

	Example:
		>var myEffects = $(myElement).effects({duration: 1000, transition: Fx.Transitions.Sine.easeInOut});
 		>myEffects.start({'height': [10, 100], 'width': [900, 300]});
	*/

	effects: function(options){
		return new Fx.Styles(this, options);
	}

});