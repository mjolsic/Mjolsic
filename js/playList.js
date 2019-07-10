const QUEUE_STATE_KEY = "QueueStatus"
var queueStateLS;
var queueStat = false;

function queueStatus(){
  if(localStorage){
    queueStateLS = localStorage.setItem(QUEUE_STATE_KEY, queueStat);
  }
  else{
    alert("Error Code: 101");
  }
}
