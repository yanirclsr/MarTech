/*
 * Copyright (c), Yanir Calisar (ycalisar at overstack.io)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
 * The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources.
 * We suggest citation in publications as with any code developement work. No warrantee is given.
 * Please help improve the code by sending suggestions or new code back.
 */

(function () {

    var COOKIE_LIFETIME = 30;
    var A_COOKIE_PTITLE = "ovtc_last_page_title";
    var A_COOKIE_PURL = "ovtc_last_page_url";
    var B_COOKIE_PTITLE = "ovtc_this_page_title";
    var B_COOKIE_PURL = "ovtc_this_page_url";

    window.overstack = window.overstack || {};
    window.overstack.cookie = window.overstack.cookie ||
    {
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
                + expires + ";domain=." + this.topDomain() + ";  path=/";

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
    };

    function saveCookie(key, val) {
        overstack.cookie.create(key, val, COOKIE_LIFETIME);
    }

    function getCookie(key){
        return overstack.cookie.read(key);
    }

    //run time
    if(!getCookie(A_COOKIE_PURL)) {
        if (document.referrer.length > 0){
            saveCookie(A_COOKIE_PURL, document.referrer);
            saveCookie(A_COOKIE_PTITLE, document.referrer);
        }else{
            saveCookie(A_COOKIE_PURL, "direct");
            saveCookie(A_COOKIE_PTITLE, "direct");
        }
    }else{
        saveCookie(A_COOKIE_PURL, getCookie(B_COOKIE_PURL));
        saveCookie(A_COOKIE_PTITLE, getCookie(B_COOKIE_PTITLE));
    }
    saveCookie(B_COOKIE_PURL, location.href);
    saveCookie(B_COOKIE_PTITLE, document.title);


})();