(function(){
    var FIELD_NAME = "gAClientID";
    var CID = ga.getAll()[0].get('clientId');
    console.log(CID);
    jQuery('input[name=' + FIELD_NAME + ']').each(function () {
        jQuery(this).val(CID);
    });
})();