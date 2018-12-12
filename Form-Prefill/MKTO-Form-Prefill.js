/*
 * Copyright (c), Yanir Calisar (ycalisar at overstack.io)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
 * The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources.
 * We suggest citation in publications as with any code developement work. No warrantee is given.
 * Please help improve the code by sending suggestions or new code back.
 */
//	var url = "http://info.yourdomain.com/form-Prefill";
if (window.MktoForms2 && window.jQuery) {
	var url = "";
	var fieldsToIgnore = ["lastFormSubmitURL","referral","UTM_Term__c","UTM_Source__c","UTM_Content__c","UTM_Medium__c","UTM_Campaign__c"];
	
	MktoForms2.whenReady(function(form) {
		jQuery.get(url, function(data) {

			try {

				var s = data.indexOf("var mktoPreFillFields");
				var e = data.indexOf("</script>");

				if (s > -1 && e > -1) {

					dataObj = data.substring(s + 24, e);
					dataObj = dataObj.replace(";", "").replace(
							/decodeURIComponent/g, "").replace(/\(/g, "")
							.replace(/\)/g, "");
					var dataObjParsed = JSON.parse(dataObj);
					console.log(dataObjParsed);
					for (var key in dataObjParsed) {
					    if (dataObjParsed.hasOwnProperty(key)) {
					        if(fieldsToIgnore.indexOf(key) > -1 || dataObjParsed[key] == null){
					        	delete dataObjParsed[key];
					        }else{
						        console.log(key + " -> " + dataObjParsed[key]);
						        dataObjParsed[key] = decodeURIComponent(dataObjParsed[key]);
					        }
					    }
					}
					form.setValues(dataObjParsed);
				}
			} catch (e) {
				console.error(e);
			}

		});
	});
}