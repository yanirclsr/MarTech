
function parse(arrArr){
    var url = "https://www.linkedin.com/sales/search/people?companyTimeScope=CURRENT" +
        "&seniorityIncluded=4%2C5%2C6%2C7&titleIncluded=salesforce%2Ccustomer%2Cclient%2Cservice%2Csales%2Cgerente%2Ccrm%2Cvendas%2Cclientes%2CClient%2520Manager%3A493%2CCustomer%2520Specialist%3A2809%2CClient%2520Specialist%3A3464%2CClient%2520Services%2520Manager%3A447%2CCustomer%2520Consultant%3A3532%2CCustomer%2520Relations%2520Specialist%3A1384&titleTimeScope=CURRENT" +
        "&companyIncluded=";
    // var arr = [["GS&MD - Gouvêa de Souza","82281"],["Direcional Engenharia","580116"]];
    var arr = arrArr;
    var str = [];
    for(var i= 0; i < arr.length; i ++){

        var cArr = arr[i];
        //%2520
        //%3A
        var s = encodeURIComponent(cArr[0]) + "%3A" + cArr[1];
        str.push(s);

    }
    console.log(url + str.join("%2C"));
}

function parseOne(domain, id){
    parse([[domain, id]]);
}

function parseMany(arr){

}