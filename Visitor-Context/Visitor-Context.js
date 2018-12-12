/*
 * Copyright (c), Yanir Calisar (ycalisar at overstack.io)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
 * The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources.
 * We suggest citation in publications as with any code developement work. No warrantee is given.
 * Please help improve the code by sending suggestions or new code back.
 */

var x = 	{
		"cookieLifeTime" : 30,
		"exclusions" : []
};

function run(x) {
	// check if URL or part of it is excluded
	var excluded = false;
	for (var i = 0; i < x.exclusions.length; i++) {
		if (location.href.indexOf(x.exclusions[i]) > -1)
			excluded = true;
		return;
	}

	var cookies = {
		context: "__vContext",
		obj: "__vContext__obj",
		topDomain: function() {
			var i, h, top_level_cookie = 'top_level_domain=cookie', hostname = document.location.hostname
					.split('.');
			for (i = hostname.length - 1; i >= 0; i--) {
				h = hostname.slice(i).join('.');
				document.cookie = top_level_cookie + ';domain=.' + h + ';';
				if (document.cookie.indexOf(top_level_cookie) > -1) {
					document.cookie = top_level_cookie.split('=')[0] + '=;domain=.'
							+ h + ';expires=Thu, 01 Jan 1970 00:00:01 GMT;';
					return h;
				}
			}
		},
		create: function(name, value, days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			} else
				var expires = "";
			var v = name + "=" + value
			+ expires + ";domain=." + this.topDomain() + ";  path=/";
			console.log(v);
			document.cookie = v; 
		},
		read: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ')
					c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0)
					return c.substring(nameEQ.length, c.length);
			}
			return "";
		},
		erase: function(name) {
			this.createCookie(name, "", -1);
		},
		parse: function(){
			var cs = this.read(this.obj);
			var obj = {};
			
			if(cs.length > 3){
				//validate there's already some context
				var properties = cs.split(',');
				properties.forEach(function(property) {
				    var tup = property.split(':');
				    var val = Number(tup[1]);
				    obj[tup[0]] = val;
				});
			}
			return obj;
		},
		stringify(obj){
		    var str = '';
		    for (var p in obj) {
		        if (obj.hasOwnProperty(p)) {
		            str += p + ':' + obj[p] + ',';
		        }
		    }
		    return str.substring(0, str.length-1);
		}
	}
	
	function myContext(obj){
		var c;
		var s = 0;
		for (var key in obj) {
		    if (obj.hasOwnProperty(key)) {
		        console.log(key + " -> " + obj[key]);
		        if(obj[key] > s){
		        	c = key;
		        	s = obj[key];
		        }
		        
		    }
		}
		return c;
	}

	if (!excluded) {
		var pathArr = location.pathname.split("/");
		var context = pathArr[1].length > 0 ? pathArr[1] : pathArr[2].length > 0? pathArr[2]: null;
		console.log(context);
		var obj = cookies.parse();
		
		//continue only if found a context
		if (context != null) {
			console.log("context: " + context);
			
			//check if context exists in Obj
			if(obj[context] == undefined)
				obj[context] = 1;
			else
				++obj[context]; 
			
			console.log(obj);
			cookies.create(cookies.obj, cookies.stringify(obj),x.cookieLifeTime);
			cookies.create(cookies.context, myContext(obj) ,x.cookieLifeTime);
			
		}
	}
}
//)({
//	"cookieLifeTime" : 30,
//	"exclusions" : []
//})