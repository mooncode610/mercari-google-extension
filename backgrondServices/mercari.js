
console.log("background started");
chrome.runtime.onInstalled.addListener(() => {

});
let visitedURL = [];

const filter = {
    url: [
        {hostContains: "jp.mercari.com"},
    ],
};
var callback = function(details) {};
var opt_extraInfoSpec = [];

chrome.webNavigation.onCompleted.addListener((details) => {                        //on document ready event
    console.log("on docu ready",details);
    
    chrome.scripting.executeScript(
    {
        target: {tabId: details.tabId},
        files:['js/addInfo.js']
    },
    (injectionResults) => {
        
    }
);
}, filter);
