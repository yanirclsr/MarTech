var SHEET_NAME = "Version Control";
var EXTENSION_URL = "";  //example: https://chrome.google.com/webstore/detail/aaaabbbbbccccdddd
var EXTENSION_NAME = ""; //example: My Extension
var MY_EMAIL = ""; //example: myname@gmail.com
var WEBHOOK_URL = ""; //example https://hook.integromat.com/webhook?msg=

var ss = getVersionControlSheet();

function checkExtensionPage() {
    var html = UrlFetchApp.fetch(EXTENSION_URL).getContentText();

    if(!isNewVersion(html))
        if(!hasNewUsers(html))
            if(!ratingValueChanged(html))
                hasNewReviews(html);
}

function hasNewUsers(html){
    var users = html.substring(html.indexOf("UserDownloads")+14,html.length);
    users = users.substring(0,users.indexOf("\""));
    users = users;
    var usrs = ss.getRange(2, 2).getValue();
    if(usrs != users){
        ss.getRange(2, 2).setValue(users);
        notify("New Users, Total: " + users + " (was " + usrs + ")" );
        return users;
    }
    return false;
}

function hasNewReviews(html){
    var reviews = html.substring(html.indexOf("itemprop=\"ratingCount\" content=") + 32,html.length);
    reviews = reviews.substring(0,reviews.indexOf("\""));
    reviews = reviews;
    var rvw = ss.getRange(2, 4).getValue();
    if(rvw != reviews){
        ss.getRange(2, 4).setValue(reviews);
        notify("New Review, Total: " + reviews + " (was " + rvw + ")" );
        return reviews;
    }
    return false;
}

function ratingValueChanged(html){
    var rating = html.substring(html.indexOf("itemprop=\"ratingValue\" content=") + 32,html.length);
    rating = rating.substring(0,rating.indexOf("\""));
    rating = rating;
    var rtng = ss.getRange(2, 3).getValue();
    if(rtng != rating){
        ss.getRange(2, 3).setValue(rating);
        notify("Rating Changed: " + rating + " (was " + rtng + ")" );
        return rating;
    }

    return false;
}

function isNewVersion(html){

    html = html.substring(html.indexOf( "meta itemprop=\"version\" content=") + 33, html.length);
    var current = html.substring(0, html.indexOf("\""));
    var vrsn = ss.getRange(2, 1).getValue();
    vrsn = vrsn;
    if(vrsn != current){
        ss.getRange(2, 1).setValue(current);
        notify("New Version: " + current + " (was " + vrsn + ")" );
        return current;
    }
    return false;
}


function notify(msg){
    MailApp.sendEmail(MY_EMAIL,"[" + EXTENSION_NAME + "] " + msg , "See Changes Now: " + EXTENSION_URL);
    if(WEBHOOK_URL !== "") UrlFetchApp.fetch(WEBHOOK_URL + encodeURIComponent(msg));
}

function getVersionControlSheet(){

    var ss = SpreadsheetApp.getActiveSpreadsheet()
    var s = ss.getSheetByName(SHEET_NAME);
    if(s == null){
        s = ss.insertSheet();
        s = s.setName(SHEET_NAME);
        s.getRange(1,1,1,4).setValues([["Version", "User Downloads","Rating", "Reviews"]])
        s.setFrozenRows(1);
    }
    return s;
}



/*
 * Copyright (c), Yanir Calisar (ycalisar at overstack.io)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this code and associated documentation files, to deal in the code without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the code. The user assumes responsibility for determining appropriate use of the code, for consequences of its use, and for checking functionality against other reliable sources. We suggest citation in publications as with any code developement work. No warrantee is given. Please help improve the code by sending suggestions or new code back.
 */