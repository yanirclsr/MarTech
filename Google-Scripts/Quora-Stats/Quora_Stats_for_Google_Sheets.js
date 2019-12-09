/* Imports Quora stats to your spreadsheet Ex: quora("https://www.quora.com/What-is-Quora-112")
* @param url URL of your Quora page as string
* @customfunction
*/

function quora(url) {


    var vals = [];
    url = !url ? "https://www.quora.com/What-is-Quora-112":url;


    var res = UrlFetchApp.fetch(url);
    var content = res.getContentText();

    var xmldoc = Xml.parse(content, true);
    var title = xmldoc.html.head.getElements("title")[0].getText().replace(" - Quora","").replace(/"/g, "'");

    if(title && title.length > 0){

        vals.push(url);
        vals.push(title);
        vals.push(getTopics(content));
        vals.push(getAnswers(content));

        var logs = getLogs(url);
//    vals.push(logs);
        vals.push(logs.views);
        vals.push(logs.followers);

        return [vals];

    }else{
        return [["Failed to get data! Check your link."]];
    }

}

function getLogs(url){

    url = removeLastSlashIfExists(url) + "/log";

    var html = UrlFetchApp.fetch(url).getContentText();
    var data = {
        views: getViews(html),
        followers: getFollowers(html)
    }

    return data;

}

function getTopics(html){

    //QuestionTopicListItems
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
        }else{
            return str;
        }
    }catch(e){
        return 0;
    }
}

function getViews(html){
    try{
        return html.substring(html.indexOf(" Views") - 10,html.indexOf(" Views") ).replace(/\D/g,'');
    }catch(e){
        return 0;
    }
}

function getFollowers(html){
    try{
        return html.substring(html.indexOf("Public Followers") - 10, html.indexOf("Public Followers") ).replace(/\D/g,'');
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