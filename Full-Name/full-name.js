(function(){
	if(window.splitFullNameActive || !window.MktoForms2) return;
	else window.splitFullNameActive = true;
	
	//support IE
	if (!Array.prototype.indexOf) {
	    Array.prototype.indexOf = function(obj, start) {
	         for (var i = (start || 0), j = this.length; i < j; i++) {
	             if (this[i] === obj) { return i; }
	         }
	         return -1;
	    }
	}
	
	MktoForms2.whenReady(function(form) {
		
		if(!window.fullNameAppended){
			window.fullNameAppended = true;
		}else{
			return;
		}
		
		function splitFullName(a, b, c) {
			
			var fullNameFields = document.getElementsByName(c);
			var fnameFields = document.getElementsByName(a);
			var lnameFields = document.getElementsByName(b);
			
			String.prototype.capitalize = function() {
				return this.charAt(0).toUpperCase() + this.slice(1);
			};
			
			// prefill initial Values
			if (document.getElementsByName(c)[0].value.length < 2
					&& document.getElementsByName(b)[0].value.length > 2
					&& document.getElementsByName(a)[0].value.length > 2) {
				var first = document.getElementsByName(a)[0].value.capitalize();
				var last = document.getElementsByName(b)[0].value.capitalize();
				var fullName = first + " " + last;
				//insert full name to all the full name fields
				for(var i = 0; i < fullNameFields.length; i++){
					fullNameFields[i].value = fullName;
				}
			}
			
			//append on input event
			for(var i = 0; i < fullNameFields.length; i++){
				fullNameFields[i].oninput = function(){appendOnInput();}
			}
			
				
			function appendOnInput() {
				var fullName = document.getElementsByName(c)[0].value;
				if ((fullName.match(/ /g) || []).length === 0
						|| fullName.substring(fullName.indexOf(" ") + 1,
								fullName.length) === "") {
					var first = fullName.capitalize();
					;
					var last = "";
				} else if (fullName.substring(0, fullName.indexOf(" "))
						.indexOf(".") > -1) {
					var first = fullName.substring(0, fullName.indexOf(" "))
					.capitalize()
					+ " "
					+ fullName.substring(fullName.indexOf(" ") + 1,
							fullName.length).substring(
									0,
									fullName.substring(fullName.indexOf(" ") + 1,
											fullName.length).indexOf(" "))
											.capitalize();
					var last = fullName
					.substring(first.length + 1, fullName.length)
					.capitalize();
				} else {
					var first = fullName.substring(0, fullName.indexOf(" "))
					.capitalize();
					var last = fullName.substring(fullName.indexOf(" ") + 1,
							fullName.length).capitalize();
				}
				backFill(first, last);
			};
			
			//back fill first and last name fields
			function backFill(first, last){
				
				for(var i = 0; i < fnameFields.length; i++){
					fnameFields[i].value = first;
				}
				
				for(var i = 0; i < lnameFields.length; i++){
					lnameFields[i].value = last;
				}
				
			}
			
		}
		splitFullName("FirstName", "LastName", "leadFullName");
	});
})();


/*
 * Copyright (c), Yanir Calisar (ycalisar at overstack.io)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code. The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources. We suggest citation in publications as with any code developement work. No warrantee is given. Please help improve the code by sending suggestions or new code back.
 */