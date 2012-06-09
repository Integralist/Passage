define(['Utils/DOM/getType', 'Utils/string'], function(getType, string){

	// Test Suite
	describe('String tests', function() {
		
		beforeEach(function(){
			this.addMatchers({
				toBeString: function(expected) {
					return getType(this.actual) === 'String' ? true : false;
				}
			});
		});
		
		// Spec
		it('should take hyphenated string and return it camel-cased', function(){
		
			var hyphenated = 'this-is-my-hyphenated-string';
			
			var result = string.toCamelCase(hyphenated);
			
			expect(result).toBeString();
			expect(result).toBe('thisIsMyHyphenatedString');
		
		});
		
		// Spec
		it('should take camel-cased string and return it hyphenated', function(){
		
			var camelcased = 'thisIsMyCamelCasedString';
			
			var result = string.toHyphens(camelcased);
			
			expect(result).toBeString();
			expect(result).toBe('this-is-my-camel-cased-string');
		
		});
		
		// Spec
		it('should shorten the specified string by the specified number and end it with the specified suffix', function(){
		
			var long = 'this is my very long sentence that I will truncated with exclamation marks';
			
			var test1 = string.truncate(long, 10, '!!!');
			var test2 = string.truncate(long, 5);
			
			expect(test1).toBeString();
			expect(test2).toBeString();
			expect(test1.substring(test1.length-3, test1.length)).toBe('!!!');
			expect(test2).toBe('th...');
		
		});
		
	});

});