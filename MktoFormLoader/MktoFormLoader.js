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