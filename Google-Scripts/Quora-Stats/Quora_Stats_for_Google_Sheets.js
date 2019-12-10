/* Imports Quora stats to your spreadsheet Ex: quora("https://www.quora.com/What-is-Quora-112")
* @param url URL of your Quora page as string
* @customfunction
*/

var headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
    "sec-fetch-user": "?1",
    "sec-fetch-site":"cross-site",
    "upgrade-insecure-requests": 1,
    "pragma": "no-cache"
}

var options =  {
    "method" : "get",
    "muteHttpExceptions": true,
    "headers": headers
};

//the function that exposed in the sheet
function quora(url) {


    var vals = [];

    if(url != undefined && url.indexOf("quora.com") > 0) {

        var res = UrlFetchApp.fetch(url + "?" + new Date().getDate(), options);
        var content = res.getContentText();

        var xmldoc = Xml.parse(content, true);
        var title = getTitle(xmldoc, content);

        if (title && title.length > 0) {

            vals.push(url);
            vals.push(title);
            vals.push(getTopics(content));
            vals.push(getAnswers(content));

            var logs = getLogs(url);
            vals.push(logs.views);
            vals.push(logs.followers);

            return [vals];

        } else {
            return [["Failed to get data! Check your link."]];
        }
    }else
        return [["Please provide a valid link to some Quora question"]];

}

function getTitle(xmldoc, content){
    try{
        var t = "unknown!";
        var elm = xmldoc && xmldoc.html && xmldoc.html.head ? xmldoc.html.head.getElements("title") : "";
        if(elm.length > 0){
            t = elm[0].getText();
        }else{
            var c = content.substring(content.indexOf("h1>"),content.indexOf("h1>") + 50);
            t = c;
        }

        return t.replace(" - Quora","").replace(/"/g, "'");
//        return [0].getText().replace(" - Quora","").replace(/"/g, "'");
    }catch(e){
        return "unknown";
    }
}

function getLogs(url){

    url = removeLastSlashIfExists(url) + "/log" + "?" + new Date().getDate();

    var html = UrlFetchApp.fetch(url, options).getContentText();
    var data = {
        views: getViews(html),
        followers: getFollowers(html)
    }

    return data;

}

function getTopics(html){

    try{
        var txt = "";
        var elms = html.substring(html.indexOf("QuestionTopicListItems") + 20,html.indexOf("QuestionTopicListItems") + 3000).split("TopicNameSpan");
        for(var i =1; i < elms.length; i ++){

            var e = elms[i];
            txt += e.substring(e.indexOf(">") + 1, e.indexOf("<"));
            if(i < elms.length -1)
                txt += ", ";
        }

        return txt;

    }catch(e){
        return 0;
    }

}

function getAnswers(html){

    try{
        var str = html.substring(html.indexOf("answer_count") + 10,html.indexOf("answer_count") + 30 ).replace(/\D/g,'');
        if(str == 100){
            return "100+";
        }else if(str.length > 0){
            return str;
        }else{
            return "0";
        }
    }catch(e){
        return 0;
    }
}

function getViews(html){
    try{
        var e = html.substring(html.indexOf(" Views") - 10,html.indexOf(" Views") ).replace(/\D/g,'');
        e = e.length > 0 ? e : "0";
        return e;
    }catch(e){
        return 0;
    }
}

function getFollowers(html){
    try{
        var e = html.substring(html.indexOf("Public Followers") - 10, html.indexOf("Public Followers") ).replace(/\D/g,'');
        e = e.length > 0 ? e : "0";
        return e;
    }catch(e){
        return 0;
    }
}

function removeLastSlashIfExists(url){
    var slash = url.substring(url.length -1, url.length);
    if(slash === "/"){
        return url.substring(0, url.length -1);
    }
    else return url;
}