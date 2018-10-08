// /*
//  * Copyright (c) 2017, Yanir Calisar, Tel Aviv, Israel (ycalisar at gmail.com)
//  *
//  * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code.
//  * The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources.
//  * We suggest citation in publications as with any code developement work. No warrantee is given.
//  * Please help improve the code by sending suggestions or new code back.
//  */
// var FEED = "http://yourcompany.com/feed/"
//
// //Marketo Details
// var ENDPOINT = "111-ABC-222.mktorest.com";
// var CLIENT_ID = "";
// var CLIENT_SECRET = "";
//
// var PROGRAM_ID = 0000;
// var CAMPAIGN_ID = 1111; // this campaign sends the email
//
//
// function parseRSS() {
//
// //    var id = Utilities.base64Encode(FEED);
//     var item, date, title, link, desc, guid, content, creator,img;
//
//     var txt = UrlFetchApp.fetch(FEED).getContentText();
//     var doc = Xml.parse(txt, false);
//
//     //Getting all items in the RSS feed channel
//     var items = doc.getElement().getElement("channel").getElements("item");
//
//     // Parsing first (most recent) item in the RSS Feed
//     try {
//         item  = items[0];
//         title = item.getElement("title").getText();
//         link  = item.getElement("link").getText();
//         date  = item.getElement("pubDate").getText();
//         desc = item.getElement("description").getText();
//         img = item.getElement("image").getText();
//         creator =  item.creator.Text;
//         content  = item.encoded.getText();
//     } catch (e) {
//         Logger.log(e);
//     }
//
//     if(checkIfNewPost(link)){
//         updateTokens("text", "Post Title", title);
//         updateTokens("text", "Post Link", link);
//         updateTokens("text", "Post Creator", creator);
//         updateTokens("text", "Post Img", img);
//         updateTokens("date", "Post Date", date);
//         updateTokens("rich text", "Post Intro", desc);
//         updateTokens("rich text", "Post Content", content);
//     }
// }
//
// function checkIfNewPost(link){
//     //this checks the cell A1 and if the link is similar to the link returned from the 1st post in the feed - the flow will stop
//     var ss = SpreadsheetApp.getActiveSpreadsheet();
//     var sheet = ss.getSheets()[0];
//     var cell = sheet.getRange("A1");
//     var lastLink = cell.getValue();
//     if(lastLink != link){
//         cell.clearContent();
//         cell.setValue(link);
//         return true;
//     }else return false;
//
// }
//
// function mktoToken(){
//     var url = "https://" + ENDPOINT + "/identity/oauth/token?grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET;
//     var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
//     var dataAll = JSON.parse(response.getContentText());
//     return dataAll["access_token"];
// }
//
// function updateTokens(type, name, value){
//     //documentation: http://developers.marketo.com/rest-api/assets/tokens/#create_and_update
//     var url = "https://" + ENDPOINT + "/rest/asset/v1/folder/" + PROGRAM_ID + "/tokens.json?"
//         + "access_token=" + mktoToken()
//         + "&folderType=Program"
//         + "&type=" + type
//         + "&name=" + name
//         + "&value=" + encodeURIComponent(value);
//     var options = {
//         'method' : 'post',
//         'contentType': 'application/json'
//     };
//     UrlFetchApp.fetch(url, options);
// }
//
// function triggerEmail(){
//     var url = "https://" + ENDPOINT + "/rest/v1/campaigns/" + CAMPAIGN_ID + "/schedule.json?access_token=" + mktoToken();
//     var options = {
//         'method' : 'post',
//         'contentType': 'application/json'
//     };
//     UrlFetchApp.fetch(url, options);
// }