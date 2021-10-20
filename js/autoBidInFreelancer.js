
console.log("On autoidInfreelancer");
let isTooManyTabs = false;
function doRobot() {
  console.log("In Do Robot function")
  isTooManyTabs = true;
    if(!isTooManyTabs) autoBid()           //First  open all new job bid window ,after that you write bid content and number and income in automatic
    /*------------------------ when new job has arrived, show all new arrived jobs by clicking new job button -S----------------*/
    const targetNode = document;
    if(targetNode == null) return;
  
    const config = { childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
      for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
        console.log(mutation);
      }
      if(!isTooManyTabs) autoBid();
      let button = document.getElementsByClassName('search-result-newProjectAlert')[0]
      if(button != undefined){
        button.click();
        console.log("successfully clicked");
      }
        
        // for(let mutation of mutationsList) {
        //     if (mutation.type === 'childList') {
        //       let
        //     }
        // }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
        /*------------------------ when new job has arrived, show all new arrived jobs by clicking new job button -S----------------*/
}
function autoBid() {
  console.log("in autoBId function")
    const descArea = document.getElementById('descriptionTextArea')
    /*-------------------in bid-------------------------*/
    if(descArea !=null){
      console.log("in bid");
      descArea.value = `Hello!

I've worked in programming and project management for almost 5 years and have worked with some professionals in the world. I have a lot of experience with javascripts( such as React js )as well as many other platforms and coding languages and feel confident I could build whatever you need.

These experiences make me qualified to lead projects of any size to completion and ensure client satisfaction. Please feel free to take a look at my portfolio. I welcome the opportunity to speak about any project type and the possibility of working together in the future.
And I wish you good health!
Thank you!

      `
      const money = document.getElementById("bidAmountInput");
      
      // money.value = money.value - money.value/10
      // if(money.value > 30) money.value = money.value/10*10
    }
    /*----------------------auto click new post----------------------*/
    else {
      if(document.getElementsByClassName("search-result-list").length == 0) return;
      console.log("in list")
      const lists = document.getElementsByClassName("search-result-list")[0].getElementsByTagName('li')
      if(lists.length == 0) return;
      for(let i = 0; i< lists.length; i++) {
        let child = (lists[i].getElementsByTagName('a'))[0]
        if(child == undefined) continue;
        if(child.getElementsByClassName('Rating-progress').length == 0) continue;
        chrome.runtime.sendMessage({url: child.href}, function(response) {
            if(response.result) window.open(child.href, '_blank')
            console.log("result is",response.result);
        });
      }
    }
  }
  doRobot();
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("received message",request)
      isTooManyTabs = request.isTooManyTabs
    }
  );