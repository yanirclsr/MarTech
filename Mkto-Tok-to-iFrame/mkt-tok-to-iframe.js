//To be placed before the </body> tag
(function(){

    //capture the mkt_tok parameter from the URL
    var mt = new URL(document.location.href).searchParams.get("mkt_tok");

    //if no mkt_tok stop script
    if(mt == null) return;

    //find all iframes on the page
    var iframes = document.querySelectorAll('iframe');

    //identify the top level domain (for filtering relevant iframe URLs
    var h = document.location.host.split('.');
    h = h[h.length - 2] + '.' + h[h.length -1];

    //loop through all the iframes
    for(var f =0; f < iframes.length; f ++){

        //capture the iframe's source URL
        var src = iframes[f].src;

        //check if iframe's source URL is on the same top level domain
        var sameDomain = src.substring(src.indexOf('//') + 2, src.length).split('/')[0].indexOf(h) > -1;

        if(src !== '' && sameDomain){

            //append the mkt_tok parameter to the iframe's source URL
            var newSrc = src.indexOf('?') > -1 ? src + '&' : src + '?';
            iframes[f].src = newSrc + "mkt_tok=" + mt;

        }
    }
})();