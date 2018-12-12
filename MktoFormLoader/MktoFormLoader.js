/*
 * Copyright (c), Yanir Calisar (ycalisar at overstack.io)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
 * The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources.
 * We suggest citation in publications as with any code developement work. No warrantee is given.
 * Please help improve the code by sending suggestions or new code back.
 */

(function(o){
    if(o.loadForms2) {var s = document.createElement('script');s.src = "//" + o.host + "/js/forms2/js/forms2.min.js";s.type = "text/javascript";s.async = false;document.getElementsByTagName('head')[0].appendChild(s);}
    var d = document, f = d.querySelectorAll("form[id*='mktoForm_']");
    for(var i = 0; i < f.length; i ++){
        var id = f[i].id.replace("mktoForm_", "");
        console.log("loading form ID: " + id);
        MktoForms2.loadForm("//" + o.host,o.munchkin , id);
    }
})({
    "host" : "app-xyz.marketo.com",
    "munchkin": "111-ABC-222",
    "loadForms2": false
});