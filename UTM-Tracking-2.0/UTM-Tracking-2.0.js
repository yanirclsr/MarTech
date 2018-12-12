/*
 * Copyright (c), Yanir Calisar (ycalisar at overstack.io)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
 * The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources.
 * We suggest citation in publications as with any code developement work. No warrantee is given.
 * Please help improve the code by sending suggestions or new code back.
 */


(function(){

    var MT_COOKIE_NAME = "__mt_attribution";
    var DEFAULT_COOKIE_LIFETIME = 2 * 365 * 24 * 60;

    var COOKIE = {

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

        create : function(key, value, minutes) {
            var date = new Date();
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
            document.cookie = key + "=" + value
                + expires + ";domain=." + COOKIE.topDomain() + ";  path=/";

        },
        read : function(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ')
                        c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0)
                        return c.substring(nameEQ.length, c.length);
                }
        }
    }

    var SESSION = {
        cookieName: "__mt_attr_session",
        isNew: function () {
            if(!COOKIE.read(SESSION.cookieName)){
                //new session
                COOKIE.create(SESSION.cookieName, "true", 30);
                console.log("new session");
                return true;
            }else {
                //existing session - renewing 30m cookie
                COOKIE.create(SESSION.cookieName, "true", 30);
                return false;
            }
        },
        hasUtm: function () {
            return location.search.indexOf("utm_") > -1;
        },
        hasReferrer: function(){return document.referrer.length > 0 && document.referrer.indexOf(COOKIE.topDomain()) === -1;}
    };

    var ATTRIBUTION = {
        params: {
            "utm_source" : "U",
            "utm_medium": "M",
            "utm_campaign": "N",
            "utm_term": "T",
            "utm_content": "C"
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

        isTouchpoint: function(){
            return SESSION.hasUtm() || SESSION.hasReferrer();
        },
        objectize: function(){

            var str = "TS=" + Date.now();
            if(SESSION.hasReferrer()) str += "&R=" + document.referrer;
            for (var key in this.params) {
                var val = this.getParameterByName(key);
                console.log(key + " -> " + val);
                if (val.length > 0) {
                    console.log(">>>" + key + " -> " + val);
                    str += "&" + this.params[key] + "=" + val;
                }
            }
            console.log(str);
            return str;
        },
        touchpoint: function () {

            var obj = this.objectize();

            //check if visitor already has some attribution data stored in cookies
            var oldMtCookie = COOKIE.read(MT_COOKIE_NAME);

            var newMtCookie = oldMtCookie? oldMtCookie +"::"+ obj : obj;

            COOKIE.create(MT_COOKIE_NAME, newMtCookie, DEFAULT_COOKIE_LIFETIME);

        }

    };

    //RUNTIME
    // check if a new session and some attribution context exists in the session
    if(SESSION.isNew() && ATTRIBUTION.isTouchpoint()){

        ATTRIBUTION.touchpoint();

    }

})();