/*
 * Copyright (c) 2017, Yanir Calisar, Tel Aviv, Israel (ycalisar at gmail.com)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
 * The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources. 
 * We suggest citation in publications as with any code developement work. No warrantee is given.
 * Please help improve the code by sending suggestions or new code back.
 */
(function(x){
	if(!window.jQuery) return;
	jQuery.get(x.pageUrl, function(data){
	    
	    try {
	    	
		    var s = data.indexOf("var mktoPreFillFields");
		    var e = data.indexOf("</script>");
		    
		    if(s > -1 && e > -1){
		    
		    	dataObj = data.substring(s + 24, e);
		    	dataObj = dataObj.replace(";","").replace(/decodeURIComponent/g,"").replace(/\(/g,"").replace(/\)/g,"");
		    	var dataObjParsed = JSON.parse(dataObj);
		    	
		    	for (var key in dataObjParsed) {
		    		console.log(key);
	    			if (dataObjParsed.hasOwnProperty(key) && dataObjParsed[key] != "null" && dataObjParsed[key] != null) {
	    				var newFields = document.getElementsByName(key);
	    				var val = decodeURIComponent(dataObjParsed[key]);
	    				console.log(key + " >> " + val);
	    				for(var m=0; m<newFields.length; m++){
	    					newFields[m].value = val;
	    				}
		    		}
		    	}
		    }
		} catch (e) {
			console.error(e);
		}
	 
	});
	
})(
	{"pageUrl": "http://info.yourdomain.com/form-Prefill"})
	