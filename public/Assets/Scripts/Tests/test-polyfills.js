define(['Utils/DOM/getType','Utils/polyfills'], function(getType){

	// Test Suite
	describe('Polyfill tests', function() {
		
		beforeEach(function(){
			this.addMatchers({
				toBeString: function(expected) {
					return getType(this.actual) === 'String' ? true : false;
				}
			});
		});
		
		// Spec
		it('should create a new object which inherits from an existing object', function(){
		
			var originalObject = {
					name: 'Mark'
				},
				newObject = Object.create(originalObject);
				
			expect(typeof newObject).toEqual('object');
			expect(newObject.name).toBeDefined();
			expect(newObject.name).toBeString();
		
		});
		
		// Spec
		it('should return a random id as a string', function(){
		
			expect(typeof Math.guid()).toBeString();
		
		});
		
	});

});