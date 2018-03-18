jQuery(document).ready(function(){
    var FIELD_NAME = "gAClientID";
    jQuery('input[name=' + FIELD_NAME + ']').each(function () {
        jQuery(this).val(ga.getAll()[0].get('clientId'));
    });
})