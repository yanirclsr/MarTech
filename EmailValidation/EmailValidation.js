/*
 * Copyright (c), Yanir Calisar (ycalisar at overstack.io)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
 * The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources.
 * We suggest citation in publications as with any code developement work. No warrantee is given.
 * Please help improve the code by sending suggestions or new code back.
 */

(function(){
    window.MktoForms2 = window.MktoForms2 || {};
    MktoForms2.whenReady(function (form) {

        function validateStracture(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        // function focusError() {
        //
        // }

        var formEl = form.getFormElem()[0], emailEl = formEl.querySelector('#Email');

        //check if there's an email field in the form
        debugger;
        var vals = form.getValues();
        console.log(vals);
        if(vals["Email"] != undefined){

            debugger;

            form.submittable(false);

            form.onValidate(function(builtInValidation) {

                if (!builtInValidation) return;

                var email = form.getValues()["Email"];

                if(!validateStracture(email)){
                    emailEl.classList.add('mktoInvalid');
                    return;
                }else {
                    emailEl.classList.remove('mktoInvalid');
                    form.submittable(true);
                }

            })
        }

    });
})();






//
//
// (function(){
//
//
//     document.addEventListener('input', function (evt) {
//         if(evt != undefined
//             && evt.target.value != undefined
//             && evt.target.value.indexOf("@") > -1){
//
//             console.log("evt != undefined && evt.target.value != undefined");
//             var email = evt.target.value;
//             console.log(evt.target.value);
//             if(!isValidEmail(email))
//                 console.log("invalid email: "+ email);
//             else
//                 console.log("valid email: "+ email);
//
//             if(!isNotFreeEmail(email))
//                 console.log("is free email: " + email)
//             else
//                 console.log("is not free email: "+ email);
//
//         }
//     });
//
//     function isValidEmail(email){
//
//         if(!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/.test(email)){
//             return false;
//         }
//         return true;
//     }
//
//     function isNotFreeEmail(email){
//         if(!/^([\w-.]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)([\w-]+.)+[\w-]{2,4})?$/
//             .test(email)) return false;
//
//         return true;
//     }
//
//     // function
//
//
//
// })();