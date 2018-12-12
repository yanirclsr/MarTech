/*
 * Copyright (c), Yanir Calisar (ycalisar at overstack.io)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
 * The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources.
 * We suggest citation in publications as with any code developement work. No warrantee is given.
 * Please help improve the code by sending suggestions or new code back.
 */

(function () {

    window.overstack = window.overstack || {};
    window.overstack.preloadLinks = {
        preloaded: []
    };

    function areTheSameUrls(a, b){
        a = a.toLowerCase();
        b = b.toLowerCase();
        if(a === b) return true;
        a = a.split("?")[0];
        b = b.split("?")[0];
        a = a.split("#")[0];
        b = b.split("#")[0];

        if(a === b) return true;

        return false;
    }

    var mX, mY, d, h, ph;
    $element  = $('a');

    function calculateDistance(elem, mouseX, mouseY) {
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
    }

    $(document).mousemove(function(e) {
        mX = e.pageX;
        mY = e.pageY;
        d = calculateDistance($element, mX, mY);
        // console.log($( e.target ).closest( "a" ));

        ph = e.target.parentElement.href;

        h = e.target.href ? e.target.href : ph ? ph : "";
        console.log(h);
        console.log(d);

        var didntLoadAlready = overstack.preloadLinks.preloaded.indexOf(h) === -1;
        var isNotEmpty = h.length > 5;
        // var notTheSamePage = areTheSameUrls(h, location.href);
//&& didntLoadAlready && isNotEmpty
        if(d < 400 ){
            console.log(h);
            overstack.preloadLinks.preloaded.push(h);
        }

    });

})();

$( document ).on( "mousemove", function( event ) {
    console.log($( event.target ).closest( "a" ));
});

