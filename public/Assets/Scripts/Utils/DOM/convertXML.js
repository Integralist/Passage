define(function(){

    // http://davidwalsh.name/convert-xml-json
    function xml_to_json(xml) {
    	
    	// create the return object
    	var obj = {};
    
    	if (xml.nodeType == 1) { // element
    		// do attributes
    		if (xml.attributes.length > 0) {
    		obj["@attributes"] = {};
    			for (var j = 0; j < xml.attributes.length; j++) {
    				var attribute = xml.attributes.item(j);
    				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
    			}
    		}
    	} else if (xml.nodeType == 3) { // text
    		obj = xml.nodeValue;
    	}
    
    	// do children
    	if (xml.hasChildNodes()) {
    		for(var i = 0; i < xml.childNodes.length; i++) {
    			var item = xml.childNodes.item(i);
    			var nodeName = item.nodeName;
    			if (typeof(obj[nodeName]) == 'undefined') {
    				obj[nodeName] = xml_to_json(item);
    			} else {
    				if (typeof(obj[nodeName].length) == 'undefined') {
    					var old = obj[nodeName];
    					obj[nodeName] = [];
    					obj[nodeName].push(old);
    				}
    				obj[nodeName].push(xml_to_json(item));
    			}
    		}
    	}
    	
    	return obj;
    	
    };

    return xml_to_json;

});