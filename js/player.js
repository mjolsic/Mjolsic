
window.addEventListener("load",initialisePlayer());

function testing(){
  songNameInSongs = songs[0].list.map(function(x){return x.name});
}

function initialisePlayer(){
  //testing
  testing();
  getSongs();
  eventsListenerCompilation();
  relativeSizeCss();
  queueStatus();
  getNameForUpNextTable();

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
  elementsAddEventListener(juiceBarDuration, "mouseleave", "colorChangeOnOver", juiceBarDuration);
  elementsAddEventListener(juiceBarDuration, "mouseout", "colorChangeOnOver", juiceBarDuration);
  elementsAddEventListener(audioTag, "timeupdate", "seekSongUpdate");
  elementsAddEventListener(volumeSlider, "mousemove", "setVolume");
  elementsAddEventListener(volumeSlider, "mousemove", "colorChangeOnHover", volumeSlider);
  elementsAddEventListener(volumeSlider, "input", "colorChangeOnHover", volumeSlider);
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
  var authorDataValue;
  for (var songsList = 4; songsList <= 7; songsList++){
    authorPlusTitle = {};
    songTitles = songs[0].list[songsList].authorName + "-" + songs[0].list[songsList].name;
    authorDataValue = songs[0].list[songsList].authorName
    songNameInSongs = songs[0].list.map(function(x){return x.name});
    output += '<li class="col-md-2 col-sm-3 col-xs-4">';
    //output += '<div class="songPicLoading" data-value="'+ authorPlusTitle.titleName +'" style="background-image:url(image/Chinese/' + songTitles + '.jpg);"' + '></div>';
    output += '<div class="title">';
    output += '<h5 class="text-overflow">';
    output += '<a class="authorSName" data-value="' + authorDataValue + '">' + songTitles + '</a>';
    output += '</h5>';
    output += '</div>';
    output += '</li>';
  }
  ulClearFix.innerHTML = output;
}

function addAudioSource(input){
  localStorage.QueueStatus = true;
  //Index in the whole song collection
  indexInTheWholeCollection = songNameInSongs.indexOf(input);
  authName = songs[0].list[indexInTheWholeCollection].authorName;
  titleName = songs[0].list[indexInTheWholeCollection].name;
  realName = authName + "-" + titleName;
  if(currentPlaying === ""){
    generateTableContent(authName,titleName);
    nameInTableContent.push(realName);
    styleOfTable();
  }
  else if(currentPlaying === audioTag.currentSrc){
    audioTag.pause();
    styleOnAction("ended");
    audioTag.setAttribute("src", drivePreUrl + songs[0].list[indexInTheWholeCollection].driveUrl + '');
    seeIfSame(realName,authName,titleName);
  }
  audioTag.innerHTML = '<source src="' + drivePreUrl + songs[0].list[indexInTheWholeCollection].driveUrl + '">';
  playPause.firstElementChild.innerText = "pause";
  currentPlaying = drivePreUrl + songs[0].list[indexInTheWholeCollection].driveUrl + '';
  displayStyle(songPicture, songLeftContainer, "", 'source')
  //Details on left panel
  displayStyle(queueSongPicture, queueSongTitleText, queueSongAuthorText, "left")
  //Details on right panel
  displayStyle(queueRightSongPanel, queueRightSongTitleText, queueRightSongAuthorText, "right")
  audioTag.play();
}

//style on the music player
function displayStyle(input1, input2, input3, position){
  if (position === "left" || position === "right"){
    input1.style.backgroundImage = "url('image/Chinese/" + realName + ".jpg')";
    input2.innerText = titleName;
    input3.innerText = "By " + authName;
  }
  else if (position === 'source'){
    input1.style.backgroundImage = "url('image/Chinese/" + realName + ".jpg')";
    input2.innerText = songs[0].list[indexInTheWholeCollection].name;
    input2.style.color = "white";
  }
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
    var totalMinutes = Math.floor(audioTag.duration / 60);
    var totalSeconds = Math.floor(audioTag.duration - totalMinutes * 60);
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
    };
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
  else if(event.target.matches('#playListQueue i') /*&& localStorage.QueueStatus === 'true'*/){
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
    a.href = currentPlaying;
    document.body.appendChild(a);
    a.click()
    document.body.removeChild(a);
  }
  //if condition for juiceBarDuration being clicked
  else if (event.target.matches('#juiceBarDuration')){
    colorChangeOnHover(juiceBarDuration);
  }
  //if condition for volume mute
  else if (event.target.matches('#volume i')){
    mute();
  }
  //if condition for volume slider
  else if (event.target.matches('#volumeRange')){
    colorChangeOnHover(volumeSlider);
  }
  //if condition for upnext table
  else if (event.target.matches('.refresh i')){
    tableUpNextOutput = "";
    getNameForUpNextTable();
  }
  //if condition for author name on page being pressed
  else if (event.target.matches('.authorSName')){
    authorPage.classList.toggle("authorPage-active");
    authorDV = event.target.getAttribute('data-value');
    authorNameOAP.innerText = authorDV;
  }
  //if codition for back button on author page
  else if(event.target.matches('.back') || event.target.matches('.backButton i')){
    authorPage.classList.remove("authorPage-active");
  }
  //console.log(event.target);
}
