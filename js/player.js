var audioTag = document.getElementById("playerSource");
var playPause = document.getElementById("play-pause");
var juiceBarDuration = document.getElementById("juiceBarDuration");
var volumeIcon = document.getElementById("volume");
var volumeSlider = document.getElementById("volumeRange");
var startTime = document.getElementById("start");
var endTime = document.getElementById("end");
var previousIcon = document.getElementById("previous");
var nextIcon = document.getElementById("next");
var songLeftContainer = document.getElementById("song-Title");
var songPicture = document.getElementById("songPicture");
var playListQueue = document.getElementById("playListQueue");
var queueInterface = document.querySelector(".queueInterface");
var songPicLoadingClass = document.getElementsByClassName('songPicLoading');
var selectedSong;
//Variable for css
var body;
var rightPanel = document.getElementsByClassName('songInformations-rightPanel')[0];
//
var sliderState = false;
var color;
var colorOut;
var seeking = false;
var currentPlaying = "";
var tableOutput = "";
var songTitleArray = [];
var authPlusTitleArray = [];
var indexOfDisplayedSongTitle;
var songNameInSongs;
var titleNameofSTA;
var indexInTheWholeCollection;
var dataValue;
var realName;
var currentPlayingTitle;


//Initiating Table Variables
var tableBody = document.querySelector('.queueList tbody');
var nameInTableContent = [];

//Initiating Current playing song picture
var queueSongPicture = document.getElementsByClassName('queueSongPicture')[0];
var queueSongTitleText = document.getElementsByClassName('queueSongTitle')[0];
var queueSongAuthorText = document.getElementsByClassName('queueSongAuthor')[0];


//Initiate button variable
var rippleButton = document.getElementsByClassName('rippleBtn')[0];


window.addEventListener("load",initialisePlayer());


function initialisePlayer(){
  //getSongs();
  eventsListenerCompilation();
  relativeSizeCss();
  queueStatus();

  if (sliderState === false){
    juiceBarDuration.style.background = colorOut;
  }
  else if(sliderState === true){
    juiceBarDuration.style.background = color;
  }
}

function elementsAddEventListener(input, events, anonymousFunction, parameters){
  if (parameters){
    input.addEventListener(events, function(){window[anonymousFunction](parameters)});
    return true;
  }
  else{
    input.addEventListener(events, window[anonymousFunction]);
    return false;
  }
}

function eventsListenerCompilation(){
  elementsAddEventListener(juiceBarDuration, "input", "seekSong");
  elementsAddEventListener(juiceBarDuration, "mousemove", "colorChangeOnHover", juiceBarDuration);
  elementsAddEventListener(juiceBarDuration, "click", "colorChangeOnHover", juiceBarDuration);
  elementsAddEventListener(juiceBarDuration, "mouseleave", "colorChangeOnOver", juiceBarDuration);
  elementsAddEventListener(juiceBarDuration, "mouseout", "colorChangeOnOver", juiceBarDuration);
  elementsAddEventListener(audioTag, "timeupdate", "seekSongUpdate");
  elementsAddEventListener(volumeIcon, "click", "mute");
  elementsAddEventListener(volumeSlider, "mousemove", "setVolume");
  elementsAddEventListener(volumeSlider, "mousemove", "colorChangeOnHover", volumeSlider);
  elementsAddEventListener(volumeSlider, "input", "colorChangeOnHover", volumeSlider);
  elementsAddEventListener(volumeSlider, "click", "colorChangeOnHover", volumeSlider);
  elementsAddEventListener(volumeSlider, "mouseleave", "colorChangeOnOver", volumeSlider);
  elementsAddEventListener(volumeSlider, "mouseout", "colorChangeOnOver", volumeSlider);
  elementsAddEventListener(window, "resize", "relativeSizeCss");
  elementsAddEventListener(document, "click", "seeIfChecked", event);
}

function getSongs(){
  var ulClearFix = document.getElementById("ulClearFix");
  ulClearFix.innerHTML = "";
  var output = "";
  var songTitles;
  var authorPlusTitle = {};
  for (var songsList = 4; songsList <= 7; songsList++){
    authorPlusTitle = {};
    songTitles = songs[0].list[songsList].authorName + "-" + songs[0].list[songsList].name;
    songNameInSongs = songs[0].list.map(function(x){return x.name});
    authorPlusTitle.authorName = songs[0].list[songsList].authorName;
    authorPlusTitle.titleName = songs[0].list[songsList].name;
    songTitleArray.push(authorPlusTitle);
    authPlusTitleArray.push(authorPlusTitle);
    output += '<li class="col-md-2 col-sm-3 col-xs-4">';
    output += '<div class="songPicLoading" data-value="'+ authorPlusTitle.titleName +'" style="background-image:url(image/Chinese/' + songTitles + '.jpg);"' + '></div>';
    output += '<div class="title">';
    output += '<h5 class="text-overflow">';
    output += '<a href="">' + songTitles + '</a>';
    output += '</h5>';
    output += '</div>';
    output += '</li>';
  }
  ulClearFix.innerHTML = output;
}

function addAudioSource(input){
  localStorage.QueueStatus = true;
  //Extract title names in song title array
  titleNameofSTA = songTitleArray.map(function(x){return x.titleName});
  //Index to build table
  indexOfDisplayedSongTitle = titleNameofSTA.indexOf(input);
  //Index in the whole song collection
  indexInTheWholeCollection = songNameInSongs.indexOf(input);
  var authName = authPlusTitleArray[indexOfDisplayedSongTitle].authorName;
  var titleName = authPlusTitleArray[indexOfDisplayedSongTitle].titleName;
  realName = authName + "-" + titleName;
  if(currentPlaying === ""){
    generateTableContent(authName,titleName);
    styleOfTable();
  }
  else if(currentPlaying === audioTag.currentSrc){
    audioTag.pause();
    styleOnAction("ended");
    audioTag.setAttribute("src", 'https://drive.google.com/uc?export=download&id=' + songs[0].list[indexInTheWholeCollection].driveUrl + '');
    seeIfSame(realName,authName,titleName);
  }
  audioTag.innerHTML = '<source src="https://drive.google.com/uc?export=download&id=' + songs[0].list[indexInTheWholeCollection].driveUrl + '">';
  playPause.firstElementChild.innerText = "pause";
  currentPlaying = 'https://drive.google.com/uc?export=download&id=' + songs[0].list[indexInTheWholeCollection].driveUrl + '';
  songPicture.style.backgroundImage = "url('image/Chinese/" + realName + ".jpg')";
  songLeftContainer.innerText = songs[0].list[indexInTheWholeCollection].name;
  songLeftContainer.style.color = "white";
  queueSongPicture.style.backgroundImage = "url('image/Chinese/" + realName + ".jpg')";
  queueSongTitleText.innerText = titleName;
  queueSongAuthorText.innerText = "By " + authName;
  audioTag.play();
}

function pausePlay(){
  if(audioTag.innerHTML !== "" && localStorage.QueueStatus !== "false"){
    if(audioTag.paused){
      audioTag.play();
      playPause.firstElementChild.innerText = "pause";
    }
    else{
      audioTag.pause();
      playPause.firstElementChild.innerText = "play_arrow";
    }
  }
}

function seekSong(){
  var juicePosition = juiceBarDuration.value/100 * audioTag.duration;
  audioTag.currentTime = juicePosition;
}

function seekSongUpdate(){
  if(isNaN(audioTag.currentTime) === false && isNaN(audioTag.duration) === false){
    var newTime = audioTag.currentTime * (100 / audioTag.duration);
    juiceBarDuration.value = newTime;
    styleOnAction("started");
    color = "linear-gradient(90deg, #33E2FF " + juiceBarDuration.value + "%, grey " + juiceBarDuration.value + "%)";
    colorOut = "linear-gradient(90deg, white " + juiceBarDuration.value + "%, grey " + juiceBarDuration.value + "%)";
    var currentMinutes = Math.floor(audioTag.currentTime / 60);
    var currentSeconds = Math.floor(audioTag.currentTime - currentMinutes * 60);
    var durationMinutes = Math.floor((audioTag.duration - audioTag.currentTime) / 60);
    var durationSeconds = Math.floor((audioTag.duration - audioTag.currentTime) - durationMinutes * 60);
    if(currentMinutes < 10){ currentMinutes = "0" + currentMinutes;};
    if(currentSeconds < 10){ currentSeconds = "0" + currentSeconds;};
    if(durationMinutes < 10){ durationMinutes = "0" + durationMinutes;};
    if(durationSeconds < 10){ durationSeconds = "0" + durationSeconds;};
    startTime.innerHTML = currentMinutes + ":" + currentSeconds;
    endTime.innerHTML = durationMinutes + ":" + durationSeconds;
    if (sliderState === false){
      juiceBarDuration.style.background = colorOut;
    }
    else if(sliderState === true){
      juiceBarDuration.style.background = color;
    }
    musicFinishedAction();
  }
}



function mute(){
  if(audioTag.muted){
    audioTag.muted = false;
    volumeIcon.firstElementChild.innerText = "volume_up";
    volumeSlider.value = 100;
  }
  else{
    audioTag.muted = true;
    volumeIcon.firstElementChild.innerText = "volume_off";
    volumeSlider.value = 0;
  }
}

function setVolume(){
  audioTag.volume = volumeSlider.value/100;
  if (volumeSlider.value < 1){
    volumeIcon.firstElementChild.innerText = "volume_mute";
    audioTag.muted = true;
  }
  else if(volumeSlider.value <= 50 && volumeSlider.value >= 1){
    volumeIcon.firstElementChild.innerText = "volume_down";
    console.log(volumeSlider.value);
    audioTag.muted = false;
  }
  else if(volumeSlider.value <= 100 && volumeSlider.value > 50){
    volumeIcon.firstElementChild.innerText = "volume_up";
    audioTag.muted = false;
  }
}

function colorChangeOnHover(input){
  color = "linear-gradient(90deg, #33E2FF " + input.value + "%, grey " + input.value + "%)";
  input.style.background = color;
  sliderState = true;
}

function colorChangeOnOver(input){
  colorOut = "linear-gradient(90deg, white " + input.value + "%, grey " + input.value + "%)";
  if(sliderState === true){
    input.style.background = color;
    sliderState = false;
  }
  else{
    input.style.background = colorOut;
  }
}

function musicFinishedAction(){
  if (audioTag.ended){
    playPause.firstElementChild.innerText = "play_arrow";
    styleOnAction("ended");
    juiceBarDuration.value = 0;
    console.log(true);
  }
}

function styleOnAction(input){
  if (input === "ended"){
    startTime.style.color = "grey";
    endTime.style.color = "grey";
    previous.style.color = "grey";
    playPause.style.color = "grey";
    next.style.color = "grey";
    startTime.innerHTML = "--:--";
    endTime.innerHTML = "--:--";
  }
  else if (input === "started"){
    startTime.style.color = "white";
    endTime.style.color = "white";
    previous.style.color = "white";
    playPause.style.color = "white";
    next.style.color = "white";
  }
}

//Execute when anything in the document is being clicked
function seeIfChecked(event){
  //If condition for checkboxes on table being clicked
  if(event.target.matches('.queueCheckBox')){
    if(event.target.checked){
      event.target.nextSibling.innerText = "check_box";
    }
    else{
      event.target.nextSibling.innerText = "check_box_outline_blank";
    }
  }
  //If condition for rows on table being clicked
  else if(event.target.matches('.queueTable')){
    tableWhenClicked(event.target.parentElement.childNodes[1].innerHTML);
  }
  //If condition for picture on index page being clicked
  else if(event.target.matches('.songPicLoading')){
    dataValue = event.target.getAttribute('data-value');
    currentPlayingTitle = dataValue;
    addAudioSource(dataValue);
  }
  //if condition for arrow down icon on queueinterface being clicked
  else if(event.target.matches('.collapseButton i')){
    queueInterface.classList.remove("queueInterface-active");
    playListQueue.firstElementChild.innerText = "playlist_play";
  }
  //if condition for queueList button being clicked
  else if(event.target.matches('#playListQueue i' /*&& localStorage.QueueStatus === true*/)){
    queueInterface.classList.toggle("queueInterface-active");
    if (queueInterface.classList[1] === "queueInterface-active"){
      event.target.innerText = "keyboard_arrow_down";
    }
    else{
      event.target.innerText = "playlist_play";
    }
  }
  //if condition to animate ripple button effect
  else if(event.target.matches('.rippleBtn')){
    event.preventDefault();
    let a = document.createElement('a')
    a.href = 'https://drive.google.com/uc?export=download&id=1Trp8-5LM380TFEQi9HAteibSlnF170ES';
    a.download = "";
    document.body.appendChild(a);
    //a.click()
    document.body.removeChild(a);
  }
}


function loopTableContent(){
  nameInTableContent = [];
  var rowsOnTable;
  var tableSongName;
  var tableAuthorName;
  var combinedName;
  for(rowsOnTable = 0; rowsOnTable < tableBody.childNodes.length; rowsOnTable++){
    tableSongName = tableBody.childNodes[rowsOnTable].childNodes[1].innerHTML;
    tableAuthorName = tableBody.childNodes[rowsOnTable].childNodes[2].innerHTML;
    combinedName = tableAuthorName + "-" + tableSongName;
    nameInTableContent.push(combinedName);
  }
  console.log(nameInTableContent);
}

function seeIfSame(input, authName, titleName){
  if (nameInTableContent.indexOf(input) !== -1){
    console.log(input + " is in the table");
    loopTableContent();
    styleOfTable(input);
  }
  else{
    console.log(input + ' is not in the table');
    generateTableContent(authName, titleName);
    loopTableContent();
    styleOfTable(input);
  }
}

function generateTableContent(authorName,titleName){
  tableBody.innerHTML = "";
  tableOutput += '<tr>';
  tableOutput += '<td><label><input type="checkbox" class="queueCheckBox"><i class="material-icons">check_box_outline_blank</i></label></td>';
  tableOutput += '<td class="queueTable">' + titleName + '</td>';
  tableOutput += '<td class="queueTable">' + authorName + '</td>';
  tableOutput += '<td class="queueTable">Option</td>';
  tableOutput += '<td class="queueTable">Duration</td>';
  tableBody.innerHTML = tableOutput;
}

//Change color of the row of table when the current playing song is the same as the content of that row
function styleOfTable(parameter){
  //Get the selected Element
  var numberOfRowOnTable = nameInTableContent.indexOf(parameter);
  if (currentPlaying !== ""){
    //Initiate the unselected elements
    var unselectedElements;
    //Hold the value of parameter for later comparison
    var selectedElement = parameter;
    //Change color for the selected song on the table;
    tableBody.childNodes[numberOfRowOnTable].childNodes[1].style.color = '#33E2FF';
    tableBody.childNodes[numberOfRowOnTable].childNodes[2].style.color = '#33E2FF';
    tableBody.childNodes[numberOfRowOnTable].childNodes[3].style.color = '#33E2FF';
    tableBody.childNodes[numberOfRowOnTable].childNodes[4].style.color = '#33E2FF';
    //Filter out the selectedSong
    var filteredTable = nameInTableContent.filter(function(selectedElement){return selectedElement !== parameter});
    //Get the index number of the unselected elements and change their color in the table
    for (unselectedElements = 0; unselectedElements < filteredTable.length; unselectedElements++){
      var nameOfUnselected = filteredTable[unselectedElements];
      var indexInOriginalArray = nameInTableContent.indexOf(nameOfUnselected);
      tableBody.childNodes[indexInOriginalArray].childNodes[1].style.color = 'white';
      tableBody.childNodes[indexInOriginalArray].childNodes[2].style.color = 'white';
      tableBody.childNodes[indexInOriginalArray].childNodes[3].style.color = 'white';
      tableBody.childNodes[indexInOriginalArray].childNodes[4].style.color = 'white';
    }
  }
  else{
    tableBody.childNodes[0].childNodes[1].style.color = '#33E2FF';
    tableBody.childNodes[0].childNodes[2].style.color = '#33E2FF';
    tableBody.childNodes[0].childNodes[3].style.color = '#33E2FF';
    tableBody.childNodes[0].childNodes[4].style.color = '#33E2FF';
  }
}

//Execute when one of the table is being clicked
function tableWhenClicked(input){
  if(input !== dataValue){
    addAudioSource(input);
    dataValue = input;
  }
}
