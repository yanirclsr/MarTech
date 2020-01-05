(function(){
    var form = $("form");
    var formUrl = form.action;
    var inputs = document.querySelectorAll("form .freebirdFormviewerViewItemList .freebirdFormviewerViewNumberedItemContainer");
    var qArr = [];

    for(var i= 0; i < inputs.length; i ++){

        console.log(inputs[i]);
        var elm = inputs[i];
        var lable = elm.querySelector(".freebirdFormviewerViewItemsItemItemHeader").innerText;
        var name = elm.querySelector("input").name;
        console.log(name, lable);
        qArr.push(name + "={{" + lable +  "}}")

    }

    console.log("POST: " + formUrl);
    console.log("Form Params: " + qArr.join("&"));

})();