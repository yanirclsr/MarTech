(function(){

    window.gdprApi = {

        doNotTrack: function(status){
            if(status || status == undefined){
                console.log("enabeling do not track");
            }
            else{
                console.log("disabling do not track");
            }
        },

        doNotStore: function(status){
            if(status || status == undefined){
                console.log("enabeling do not store");
            }
            else {
                console.log("disabling do not store");
            }
        },
        markCheckboxes: function(action){

        }


    }

    var cookies = {
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
        clearAll: function(){
            var ps = [];
            var scripts = document.getElementsByTagName("script");
            for(var i = 0; i < scripts.length; i++){
                var d = scripts[i].src.replace("https://", "").replace("http://","").split("/")[0];

                var dA = d.split(".");
                if(dA.length>=2 && ps.indexOf(d) == - 1){
                    ps.push(d);
                    var domain = "";
                    for(var dS = 0; dS < dA.length; dS ++){
                        domain = dA.join(".");
                        console.log(domain);
                        dA.shift();
                    }
                }
            }

        }

    }

})();