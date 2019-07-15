

function relativeSizeCss(){
  rightPanel.style.height = queueInterface.offsetHeight;
  body = window.innerHeight - 120;
  queueInterface.style.height = "" + body +"px";

}
