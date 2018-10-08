(function(){


    document.addEventListener('input', function (evt) {
        if(evt != undefined
            && evt.target.value != undefined
            && evt.target.value.indexOf("@") > -1){

            console.log("evt != undefined && evt.target.value != undefined");
            var email = evt.target.value;
            console.log(evt.target.value);
            if(!isValidEmail(email))
                console.log("invalid email: "+ email);
            else
                console.log("valid email: "+ email);

            if(!isNotFreeEmail(email))
                console.log("is free email: " + email)
            else
                console.log("is not free email: "+ email);

        }
    });

    function isValidEmail(email){

        if(!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/.test(email)){
            return false;
        }
        return true;
    }

    function isNotFreeEmail(email){
        if(!/^([\w-.]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)([\w-]+.)+[\w-]{2,4})?$/
            .test(email)) return false;

        return true;
    }

    // function



})();