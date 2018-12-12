/*
 * Copyright (c), Yanir Calisar (ycalisar at overstack.io)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
 * The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources.
 * We suggest citation in publications as with any code developement work. No warrantee is given.
 * Please help improve the code by sending suggestions or new code back.
 */

javascript:(function(){

    var d = document;

    var mkto = function(){

        var u = d.querySelector("script[src*='.marketo.com/js/forms2/js/forms2.min.js']");
        if(localStorage.mktoLp !== undefined){
            return localStorage.mktoLp;

        }else if(u != null){
            var bu = u.src.split("js/")[0];
            console.log(bu);
            bu = bu.replace("http://","https://");
            localStorage.mktoLp = bu;
            return localStorage.mktoLp;

        }else{
            var pod = prompt("Please enter Marketo POD\n(https://app-YOURPOD.marketo.com/#LP...)", "");
            if (pod != null) {
                var u = "https://app-" + pod +".marketo.com/";
                localStorage.mktoLp = u;
                console.log(u);
                return u;
            }else return null;

        }

    };


    //forms
    var forms = d.querySelectorAll("form[id*='mktoForm_']");
    if(forms!= null){
        for(var i=0; i < forms.length; i ++){
            var f = forms [i];
            var fid = f.id.replace("mktoForm_","");
            openLink("#FO", fid);
        }
    }

    //landing page
    var lp = d.querySelector("input[name='lpId']");
    if(lp != null){
        var lpid = lp.value;
        openLink("#LP", lpid);
    }

    if(lp == null && forms.length === 0){
        alert("Couldn't find any Marketo elements on the page");
    }

    function openLink(type, id){
        var ty = type === "#FO" ? "form" : "landing page";
        var r = confirm("Open " + ty + " - " + id + "?");
        var url = mkto() + type +  id;
        console.log(url);
        if (r === true) {
            var w = "win" + id;
            window[w] = window.open(url, '_blank');
        }

    }

})();