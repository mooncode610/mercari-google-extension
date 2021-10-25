
console.log("background started");
chrome.runtime.onInstalled.addListener(() => {

});
let visitedURL = [];

const filter = {
    url: [
        // {urlContains: "jp.mercari.com/item"},
    ],
};
var callback = function(details) {};
var opt_extraInfoSpec = [];
let lastURL = "";
chrome.tabs.onUpdated.addListener((tabId, changeInfo,tab) => {                        //on document ready event
    console.log("will start",tab.url,changeInfo.status)
    if(changeInfo.status !== "complete") return;
    // if(lastURL === tab.url) return;
    // console.log(lastURL, tab.url);
    lastURL = tab.url;
    if(tab.url.includes("jp.mercari.com/item")){
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files:['js/addInfo.js']
        },
        (injectionResults) => {
            
        });
    }
    if(tab.url.includes("jp.mercari.com/user/reviews")){
        console.log("review")
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files:['js/review.js']
        },
        (injectionResults) => {
            
        });
    }
    
});
chrome.webNavigation.onCompleted.addListener(function(tab) {
    
});