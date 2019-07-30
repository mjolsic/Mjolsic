

function relativeSizeCss(){
  body = window.innerHeight - 120;
  rightPanel.style.height = "" + queueInterface.scrollHeight + "px";
  queueInterface.style.height = "" + body +"px";
  authorPage.style.height = "" + body +"px";
  morePage.style.height = "" + body +"px";
}
