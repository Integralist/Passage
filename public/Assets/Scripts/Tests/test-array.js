define(['Utils/DOM/getType', 'Utils/array'], function(getType, array){

	// Test Suite
	describe('Array tests', function() {
		
		var data;
		
		beforeEach(function() {
			data = ['a', 'a', 1, 'b', 'b', 2, 'c', 'c', 3, 'd'];
			
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
  		
  		// Spec
  		it('should create a new array with all numeric items that pass the test implemented by the provided function', function(){
  			
  			var newArray = array.filter(data, function(item){
  				return (typeof item == 'number') ? true : false;
  			});
  			
  			expect(newArray).toBeArray();
  			expect(newArray[0]).toBeNumber();
  			expect(newArray).toEqual([1, 2, 3]);
  			
  		});
  		
  		// Spec
  		it('should execute provided function once per array element which will increment number items by value of 1', function(){
  			
  			array.forEach(data, function(item, index){
  				if (typeof item == 'number') {
  					data[index] = ++item;
  				}
  			});
  			
  			expect(data).toBeArray();
  			expect(data[0]).toBeString();
  			expect(data[2]).toBeNumber();
  			expect(data).toEqual(['a', 'a', 2, 'b', 'b', 3, 'c', 'c', 4, 'd']);
  			
  		});
  		
  		// Spec
  		it('should return the first index at which the given item can be found in the array (or -1 if not found)', function(){
  			
  			var search1 = array.indexOf(data, 'c'),
  				search2 = array.indexOf(data, 'xyz');
  			
  			expect(search1).toBeNumber();
  			expect(search1).toBe(6);
  			expect(search2).toBe(-1);
  			
  		});
  		
  		// Spec
  		it('should return the last index at which the given item can be found in the array (or -1 if not found)', function(){
  			
  			var search1 = array.lastIndexOf(data, 'c'),
  				search2 = array.lastIndexOf(data, 'xyz');
  			
  			expect(search1).toBeNumber();
  			expect(search1).toBe(7);
  			expect(search2).toBe(-1);
  			
  		});
  		
  		// Spec
  		it('should create a new array with the results of calling the provided function on every item in this array', function(){
  			
  			var newArray = array.map(data, function(item, index){
  				if (typeof item == 'string') {
  					return item + '!!!';
  				} else if (typeof item == 'number') {
  					return ++item;
  				}  				
  			});
  			
  			expect(newArray).toBeArray();
  			expect(newArray[0]).toBeString();
  			expect(newArray[2]).toBeNumber();
  			expect(newArray).toEqual(["a!!!", "a!!!", 2, "b!!!", "b!!!", 3, "c!!!", "c!!!", 4, "d!!!"]);
  			
  		});
  		
  		// Spec
  		it('should create a single value from applying a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value', function(){
  			var result = array.reduce(data, function(previousValue, currentValue, index){
  				return previousValue + currentValue;
  			});
  			
  			expect(result).not.toBeArray();
  			expect(result).toBeString();
  			expect(result).toBe('aa1bb2cc3d');
  			
  		});
  		
  		// Spec
  		it('should create a single value from applying a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value', function(){
  			var result = array.reduceRight(data, function(previousValue, currentValue, index){
  				return previousValue + currentValue;
  			});
  			
  			expect(result).not.toBeArray();
  			expect(result).toBeString();
  			expect(result).toBe('d3cc2bb1aa');
  			
  		});
  		
  		// Spec
  		it('should return a normalised array with only unique items', function(){
  			
  			var result = array.unique(data);
  			
  			expect(result).toBeArray();
  			expect(result[0]).toBeString();
  			expect(result[1]).toBeNumber();
  			expect(result[0]).toBe("a");
  			expect(result[5]).toBe(3);
  			
  		});
		
	});

});