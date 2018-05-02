/*
 * Copyright (c) 2018, Yanir Calisar (ycalisar at overstack.io)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
 * The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources. 
 * We suggest citation in publications as with any code developement work. No warrantee is given.
 * Please help improve the code by sending suggestions or new code back.
 */

(function() {

	var STORE_COOKIES = true;
	var STORE_LOCAL_STORAGE = true;

	function topDomain() {
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
		return document.location.protocol + "//" + document.location.host;
	}

	var utmCookie = {
		cookieNamePrefix : "__lt_",
		cookieCumulativePrefix: "__cu_",
		cookieNameFirstTouchPrefix : "__ft_",

		utmParams : [ "utm_source", "utm_medium", "utm_campaign", "utm_term",
				"utm_content" ],

		cookieExpiryDays : 365,

		// From http://www.quirksmode.org/js/cookies.html
		createCookie : function(name, value, days) {

			if(STORE_COOKIES) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    var expires = "; expires=" + date.toGMTString();
                } else
                    var expires = "";
                document.cookie = this.cookieNamePrefix + name + "=" + value
                    + expires + ";domain=." + topDomain() + ";  path=/";
            }
            if(STORE_LOCAL_STORAGE) this.createLS(name, value);
		},

		createLS: function(name, value){
			localStorage[this.cookieNamePrefix+ name] = value;
		},

		readCookie : function(name) {

			if(STORE_COOKIES) {
                var nameEQ = this.cookieNamePrefix + name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ')
                        c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0)
                        return c.substring(nameEQ.length, c.length);
                }
                if(STORE_LOCAL_STORAGE) this.readLS(name);
                else return null;
            }
            if(STORE_LOCAL_STORAGE) this.readLS(name);
		},

		readLS: function(name){
			var val = localStorage[this.cookieNamePrefix + name];
			if(val == undefined) return null;
			else return val;
		},

		checkIfFirstTouch : function() {
			if(STORE_LOCAL_STORAGE) {
                var nameEQ = this.cookieNameFirstTouchPrefix + "utm_source=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ')
                        c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0)
                        return c.substring(nameEQ.length, c.length);
                }
                if(STORE_LOCAL_STORAGE) this.readLS(this.cookieNameFirstTouchPrefix + "utm_source");
				else return null;
            }
            if(STORE_LOCAL_STORAGE) this.readLS(this.cookieNameFirstTouchPrefix + "utm_source");
		},

		eraseCookie : function(name) {
			if(STORE_COOKIES) this.createCookie(name, "", -1);
			if(STORE_LOCAL_STORAGE) delete localStorage[name];
		},

		getParameterByName : function(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + name + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.search);
			if (results == null) {
				return "";
			} else {
				return decodeURIComponent(results[1].replace(/\+/g, " "));
			}
		},

		utmPresentInUrl : function() {
			var present = false;
			for (var i = 0; i < this.utmParams.length; i++) {
				var param = this.utmParams[i];
				var value = this.getParameterByName(param);
				if (value != "" && value != undefined) {
					present = true;
				}
			}
			return present;
		},

		writeUtmCookieFromParams : function() {
			for (var i = 0; i < this.utmParams.length; i++) {
				var param = this.utmParams[i];
				var value = this.getParameterByName(param);
				if(STORE_COOKIES) this.createCookie(param, value, this.cookieExpiryDays);
				if(STORE_LOCAL_STORAGE) localStorage[param] = value;
			}
		},

		writeCookieOnce : function(name, value) {

			if (STORE_COOKIES && !this.readCookie(name)) {
				this.createCookie(name, value, this.cookieExpiryDays);
			}
            if(STORE_LOCAL_STORAGE && this.readLS(name) == null){
				this.createLS(name,value);
			}
		},

		writeReferrerOnce : function() {
			var value = document.referrer;
			if (value === "" || value === undefined) {
				this.writeCookieOnce("referrer", "direct");
			} else {
				this.writeCookieOnce("referrer", value);
			}
		},

		referrer : function() {
			return this.readCookie("referrer");
		}
	};

	if (!utmCookie.checkIfFirstTouch()) {
		utmCookie.cookieNamePrefix = utmCookie.cookieNameFirstTouchPrefix;
		utmCookie.writeReferrerOnce();

		if (utmCookie.utmPresentInUrl()) {
			utmCookie.writeUtmCookieFromParams();
		}
		utmCookie.cookieNamePrefix = "__lt_";
	}

	utmCookie.writeReferrerOnce();

	if (utmCookie.utmPresentInUrl()) {
		utmCookie.writeUtmCookieFromParams();
		
	}
})();