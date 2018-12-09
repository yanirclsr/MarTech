/*
 * Copyright (c) 2018, Yanir Calisar (ycalisar at overstack.io)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
 * The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources. 
 * We suggest citation in publications as with any code developement work. No warrantee is given.
 * Please help improve the code by sending suggestions or new code back.
 */

(function () {

    if (!Array.prototype.indexOf) { Array.prototype.indexOf = function(obj, start) { for (var i = (start || 0), j = this.length; i < j; i++) { if (this[i] === obj) { return i; } } return -1; } }

    var settings = {
        cookieNameFirstTouchPrefix : "__ft_",
        cookieNamePrefix : "__lt_",
        utmParams : [ "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content" ],
        cookieExpiryDays : 365,
        isFirstTouch: null
    };

    var utils = {
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
            return document.location.hostname;
        },
        isFirstTouch: function(){
            if(settings.isFirstTouch != null) return settings.isFirstTouch;
            else {
                var f = document.cookie.indexOf(settings.cookieNameFirstTouchPrefix) === -1;
                console.log("first touch: " + f);
                settings.isFirstTouch = f;
                return f;
            }

        },
        isNewSession: function(){
            var c = "__utm_tracking_session";
            var r = cookies.read(c) === undefined;
            cookies.create(c, true, 1 / 48);
            return r;
        }
    };

    var cookies = {
        create : function(name, value, days) {

            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else
                var expires = "";

            var c = name + "=" + value
                + expires + ";domain=." + utils.topDomain() + ";  path=/";
            document.cookie = c;
        },
        writeCookieOnce: function (name, value) {

            if(utils.isFirstTouch()){
                this.create(settings.cookieNameFirstTouchPrefix + name,
                    value,
                    settings.cookieExpiryDays);

            }
            this.create(settings.cookieNamePrefix + name,
                value,
                settings.cookieExpiryDays);
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
        },
        erase: function(name) {
            this.createCookie(name, "", -1);
        }
    }

    var base = {
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
            for (var i = 0; i < settings.utmParams.length; i++) {
                var param = settings.utmParams[i];
                var value = this.getParameterByName(param);
                if (value !== "" && value !== undefined) {
                    return true;
                }
            }
            return false;
        },
        writeUtmCookieFromParams : function() {
            if(this.utmPresentInUrl()){
                for (var i = 0; i < settings.utmParams.length; i++) {
                    var param = settings.utmParams[i];
                    var value = this.getParameterByName(param);
                    cookies.writeCookieOnce(param, value);
                }
            }
        },
        writeReferrer: function () {
            var value = document.referrer;
            var key = "referrer";
            if (value && value !== "" && value !== undefined && value.indexOf(document.location.host) === -1) {
                console.log(value);
                cookies.writeCookieOnce(key, value);
            }else{
                cookies.writeCookieOnce(key, "direct");
            }
        },
        storeParamsInCookies: function(){
            if(utils.isNewSession()){
                this.writeUtmCookieFromParams();
                this.writeReferrer();
            }
        }
    };

    base.storeParamsInCookies();

})();