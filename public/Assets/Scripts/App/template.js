define(["../Utils/Templating/hogan"], function (hogan) {
	
	/*
	 * In this example we use...
	 * Sections (i.e. if statement & loop depending on variable content): {{#variable}} CONDITION_IF_VARIABLE_IS_TRUE {{/variable}}
	 * Rendering HTML using the ampersand: {{& variable}} => if no & then HTML would be escaped
	 * 	- Tripple brackets works same as ampersand {{{HTML_TO_LEAVE_UNESCAPED}}}
	 * Lambdas (e.g. anonymous functions) which handle the parse of data itself
	 */
	var html = "Hi, my name is {{name}} and I'm {{age}}. \
{{#hogan}} I'm using Hogan.js for my templates{{/hogan}}. \
Lets render some {{& html}}. \
And one more time {{{html}}}. \
Loop: {{#loop}} <i>{{name}}</i> {{/loop}}{{^loop}} no list? We're like an else statement! {{/loop}} \
Lambda: {{#call}} {{name}} is awesome {{/call}}", // LAMBDA NOT WORKING IN MY AMD MODIFICATION
		template = hogan.compile(html),
		rendered = template.render({ 
			name: "Mark", 
			age: 30, 
			hogan: true, 
			html: "<b>HTML text</b>", 
			loop: [{ name: "a" }, { name: "b" }, { name: "c" }], 
			call: function(){
				return function (txt) {
					return "<em>" + template.render(txt) + "</em>";
				}
			}
		});
		
	console.log("Hogan.js rendered template: ", rendered);
	
});