(function(pageUrl){

	jQuery.get(pageUrl, function(data){
	    
	    try {
	    	
		    var s = data.indexOf("var mktoPreFillFields");
		    var e = data.indexOf("</script>");
		    
		    if(s > -1 && e > -1){
		    
		    	dataObj = data.substring(s + 24, e);
		    	dataObj = dataObj.replace(";","").replace(/decodeURIComponent/g,"").replace(/\(/g,"").replace(/\)/g,"");
		    	var dataObjParsed = JSON.parse(dataObj);
		    	
		    	for (var key in dataObjParsed) {
		    		console.log(key);
	    			if (dataObjParsed.hasOwnProperty(key) && dataObjParsed[key] != "null" && document.getElementById(key) != null) {
	    				document.getElementById(key).value = decodeURIComponent(dataObjParsed[key]);
	    				console.log(key + " >> " + dataObjParsed[key]);
		    		}
		    	}
		    }
		} catch (e) {
			console.error(e);
		}
	 
	});
	
})("go.yourdomain.com/form-landing-page.html")