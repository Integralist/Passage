define(['Utils/DOM/getType', 'Utils/dom'], function(getType, dom){
	
	// Test Suite
	describe('DOM tests', function() {
		
		beforeEach(function(){
			this.addMatchers({
				toBeString: function(expected) {
					return getType(this.actual) === 'String' ? true : false;
				}
			});
		});
		
		afterEach(function(){
    		var current = document.getElementById('mytest'),
    			original = document.createElement('h1');
	    		original.id = 'mytest';
    			original.innerHTML = 'Unit <code>Tests</code>';
    		
    		/*
	    		// Firebug is better at display HTML in its entirety using 'dirxml'
	    		console.group('afterEach');
	    			console.dirxml(current);
	    			console.dirxml(original);
	    		console.groupEnd();
    		*/
    		
    		current.parentNode.replaceChild(original, current);
  		});
		
		// Spec
		it('should return the next/previous siblings regardless of white space/TEXT_NODES', function(){
		
			var header = document.getElementsByTagName('h2'),
				next = dom.elementSiblings.nextElementSibling(header[0]), // <h2 class="myclassa myclassb">
				prev = dom.elementSiblings.prevElementSibling(header[0]); // <h1 id="mytest">
			
			expect(next.nodeType).toBe(1);
			expect(next.tagName.toLowerCase()).toBe('h2');
			expect(prev.nodeType).toBe(1);
			expect(prev.tagName.toLowerCase()).toBe('h1');
		
		});
		
		it('should insert the specified node before another referenced element', function(){
		
			var header = document.getElementById('mytest'),
				newnode = document.createElement('h3'),
				newtext = document.createTextNode('A header3 created for insertAfter test');
			
			newnode.appendChild(newtext);
			dom.insertAfter(newnode, header);
			
			expect(dom.elementSiblings.nextElementSibling(header).tagName.toLowerCase()).toBe('h3');
			expect(dom.elementSiblings.nextElementSibling(header).innerHTML).toBe('A header3 created for insertAfter test');
		
		});
		
		it('should return as a string the referenced element as well as its content', function(){
		
			var header = document.getElementById('mytest');
			
			expect(header.outerHTML).toBeString();
			
			// Removed this check as it didn't have a consistent implementation across browsers (did we expect anything less from a host object)
			// Fails in Internet Explorer <= 8 because IE A.) includes white space around the result B.) uppercases the tags C.) doesn't quote its attributes
			//expect(header.outerHTML).toBe('<h1 id="mytest">Unit <code>Tests</code></h1>');
		
		});
		
		it('should set as HTML the referenced element as well as its content', function(){
		
			// No point in storing 'mytest' reference in a variable (for this spec) because
			// after we set the outerHTML value the variable will be a reference to the element before the outerHTML was set			
			
			document.getElementById('mytest').outerHTML = '<h2 id="mytest">Changed to <code>h2</code> via outerHTML test</h2>';
			
			expect(document.getElementById('mytest').tagName.toLowerCase()).toBe('h2');
			
			// Removed this check as it didn't have a consistent implementation across browsers (did we expect anything less from a host object)
			// Fails in Internet Explorer <= 8 because IE A.) includes white space around the result B.) uppercases the tags C.) doesn't quote its attributes
			//expect(document.getElementById('mytest').outerHTML).toBe('<h2 id="mytest">Changed to <code>h2</code> via outerHTML test</h2>');
		
		});
		
		it('should parse the specified string as HTML and insert into DOM at specified location', function(){
		
			var header = document.getElementById('mytest');
			
			header.insertAdjacentHTML('beforebegin', '<p>my beforebegin</p>');
			header.insertAdjacentHTML('afterbegin', '<p>my afterbegin</p>');
			header.insertAdjacentHTML('beforeend', '<p>my beforeend</p>');
			header.insertAdjacentHTML('afterend', '<p>my afterend</p>');
			
			expect(dom.elementSiblings.prevElementSibling(header).tagName.toLowerCase()).toBe('p');
			expect(dom.elementSiblings.prevElementSibling(header).innerHTML).toBe('my beforebegin');			
			expect(dom.elementSiblings.nextElementSibling(header).tagName.toLowerCase()).toBe('p');
			expect(dom.elementSiblings.nextElementSibling(header).innerHTML).toBe('my afterend');			
			
			// Removed this check as it didn't have a consistent implementation across browsers (did we expect anything less from a host object)
			// Fails in Internet Explorer <= 8 because IE A.) includes white space around the result B.) uppercases the tags C.) doesn't quote its attributes
			//expect(header.innerHTML).toBe('<p>my afterbegin</p>Unit <code>Tests</code><p>my beforeend</p>');
		
		});
		
	});

});