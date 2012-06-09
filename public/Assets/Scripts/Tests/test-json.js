define(['Utils/DOM/getType', 'Utils/json'], function(getType, json){

	// Test Suite
	describe('JSON tests', function() {

		beforeEach(function(){
			this.addMatchers({
				toBeArray: function(expected) {
					return getType(this.actual) === 'Array' ? true : false;
				},
				toBeNumber: function(expected) {
					return /\d+/.test(this.actual);
				},
				toBeString: function(expected) {
					return getType(this.actual) === 'String' ? true : false;
				}
			});
		});
		
		it('should test stringify method of json object by returning a valid json formatted object from a string', function(){
			
			var object = {
				name: 'Mark',
				location: 'UK',
				telephone: 1234567890,
				friends: [
					'Catherine',
					'Ben',
					'Zara',
					'Richard',
					'Katie'
				]
			};
			
			var result = json.stringify(object);
			
			expect(result).toBeString();
			expect(result).toBe('{"name":"Mark","location":"UK","telephone":1234567890,"friends":["Catherine","Ben","Zara","Richard","Katie"]}');
			
		});	
		
		it('should test parse method of json object by returning a valid js object from a json string', function(){
			
			var original = {
				name: 'Mark',
				location: 'UK',
				telephone: 1234567890,
				friends: [
					'Catherine',
					'Ben',
					'Zara',
					'Richard',
					'Katie'
				]
			};
			
			var string = '{"name":"Mark","location":"UK","telephone":1234567890,"friends":["Catherine","Ben","Zara","Richard","Katie"]}';
			
			var result = json.parse(string);
			
			expect(result).toEqual(original);
			expect(result.name).toBe('Mark');
			expect(result.telephone).toBeNumber();
			expect(result.friends).toBeArray();
			
		});
		
	});

});