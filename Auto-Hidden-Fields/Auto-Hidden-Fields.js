(function(){

    var f = {
        readCookie : function(cname) {

            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        getCid: function() {
            try {
                var gaObj = window[window["GoogleAnalyticsObject"]];
                if (gaObj !== undefined) return gaObj.getAll()[0].get("clientId");
                else return "";
            }catch (e){
                return "";
            }
        }
    };
    setTimeout(function() {
        window.mapping = {
            "ft_utm_source": f.readCookie("__ft_utm_source"),
            "ft_utm_medium": f.readCookie("__ft_utm_medium"),
            "ft_utm_campaign": f.readCookie("__ft_utm_campaign"),
            "ft_utm_term": f.readCookie("__ft_utm_term"),
            "ft_utm_content": f.readCookie("__ft_utm_content"),
            "ft_referrer": f.readCookie("__ft_referrer"),

            "lt_utm_source": f.readCookie("__lt_utm_source"),
            "lt_utm_medium": f.readCookie("__lt_utm_medium"),
            "lt_utm_campaign": f.readCookie("__lt_utm_campaign"),
            "lt_utm_term": f.readCookie("__lt_utm_term"),
            "lt_utm_content": f.readCookie("__lt_utm_content"),
            "lt_referrer": f.readCookie("__lt_referrer"),
            "gaClientId": f.getCid()
        };

        window.MktoForms2 = window.MktoForms2 || {whenReady: function(){}};
        MktoForms2.whenReady( function (form) {
            form.addHiddenFields(mapping);
        });
    }, 1500);

})();

//		utmParams : [ "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content" ],