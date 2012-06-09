define(['Utils/isIE', 'Utils/isHost'], function(isIE, isHost){

	// Test Suite
	describe('Host tests', function() {
		
		// Spec
		it('should test host methods detection', function(){
		
			expect(isHost.method(document, 'appendChild')).toBeTruthy();
		
			if (!isIE) {
				expect(isHost.method(document, 'attachEvent')).toBeFalsy();
			} else {
				expect(isHost.method(document, 'attachEvent')).toBeTruthy();
			}
		
		});
		
		// Spec
		it('should test host collections detection', function(){
		
			expect(isHost.collection(document.getElementsByTagName('h2'), 'item')).toBeTruthy();
			
			// Removed this check as it didn't have a consistent implementation across browsers (did we expect anything less from a host object)
			// Fails in WebKit (Safari/Chrome) but passes in Firefox & Internet Explorer
			//expect(isHost.collection(document.getElementsByTagName('h2'), 'namedItem')).toBeTruthy();
		
		});
		
		// Spec
		it('should test host objects detection', function(){
		
			// Removed this check as it didn't have a consistent implementation across browsers (did we expect anything less from a host object)
			// Fails in Internet Explorer <= 8
			//expect(isHost.object(document, 'appendChild')).toBeFalsy(); // …false; because this is a method NOT an object/property
			expect(isHost.object(document, 'body')).toBeTruthy();
		
		});

	});

});