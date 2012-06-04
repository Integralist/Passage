define(['Utils/XHR/ajax'], function(ajax){

	// Test Suite (these can have multiple 'Specs' within them)
	describe('AJAX test', function() {
		
		beforeEach(function() {
			this.addMatchers({
				toBeNumber: function(expected) {
					return /\d+/.test(this.actual);
				}
			});
			
			// Sinon.js code follows…			
			this.myAjax = sinon.useFakeXMLHttpRequest();			
	        var requests = this.requests = [];	
			this.myAjax.onCreate = function (xhr) {
	            requests.push(xhr);
	        };
  		});
  		
  		afterEach(function() {
    		// Sinon.js code follows…
    		this.myAjax.restore();
  		});
  		
  		// Spec
		it('Grabs data and returns a json object', function(){
			
			var callback = sinon.spy();
			
			ajax({
				url: 'JSON.php',
				dataType: 'json',			
				onSuccess: callback
			});
			
			this.requests[0].respond(200, { "Content-Type": "application/json" }, '[{ "id": 12, "comment": "Hey there" }]');
			
			expect(this.requests.length).toBeNumber();
			expect(this.requests.length).toBe(1);
			expect(callback.calledWith([{ id: 12, comment: "Hey there" }])).toBeTruthy();
			
		});
		
	});

});