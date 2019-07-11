var audioTag = document.getElementById("playerSource");
var playPause = document.getElementById("play-pause");
var juiceBarDuration = document.getElementById("juiceBarDuration");
var volumeIcon = document.getElementById("volume");
var volumeSlider = document.getElementById("volumeRange");
var startTime = document.getElementById("start");
var endTime = document.getElementById("end");
var previousIcon = document.getElementById("previous");
var nextIcon = document.getElementById("next");
var songLeftContanier = document.getElementById("song-Title");
var songPicture = document.getElementById("songPicture");
var playListQueue = document.getElementById("playListQueue");
var queueInterface = document.querySelector(".queueInterface");
var musicPlayerContainer;
var body;
var sliderState = false;
var color;
var colorOut;
var seeking = false;
var seekTo;
var currentPlaying = "";

window.addEventListener("load",initialisePlayer());

function initialisePlayer(){
  getSongs();
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
  elementsAddEventListener(playListQueue, "click", "showQueueInterface");
  elementsAddEventListener(window, "resize", "relativeSizeCss");
}

function getSongs(){
  var ulClearFix = document.getElementById("ulClearFix");
  ulClearFix.innerHTML = "";
  var output="";
  for (var songsList = 0; songsList <= 51; songsList++){
    output += '<li class="col-md-2 col-sm-3 col-xs-4">';
    output += '<div class="songPicLoading" style="background-image:url(image/Chinese/' + songsList + '.jpg); " onclick="addAudioSource(' + songsList + ')"></div>';
    output += '<div class="title">';
    output += '<h5 class="text-overflow">';
    output += '<a href="">' + songs[0].list[songsList].authorName + " - " + songs[0].list[songsList].name + '</a>';
    output += '</h5>';
    output += '</div>';
    output += '</li>';
  }
  ulClearFix.innerHTML = output;
}


function addAudioSource(input){
  localStorage.QueueStatus = true;
  if(currentPlaying === ""){
    audioTag.pause();
    console.log(true);
  }
  else if(currentPlaying === audioTag.currentSrc){
    audioTag.pause();
    styleOnAction("ended");
    audioTag.setAttribute("src", 'https://drive.google.com/uc?export=download&id=' + songs[0].list[input].driveUrl + '')
    console.log(songs[0].list[input].name);
  }
  audioTag.innerHTML = '<source src="https://drive.google.com/uc?export=download&id=' + songs[0].list[input].driveUrl + '">';
  playPause.firstElementChild.innerText = "pause";
  currentPlaying = 'https://drive.google.com/uc?export=download&id=' + songs[0].list[input].driveUrl + '';
  songPicture.style.backgroundImage = "url('image/Chinese/" + input + ".jpg')";
  songLeftContanier.innerText = songs[0].list[input].name;
  songLeftContanier.style.color = "white";
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

function showQueueInterface(){
  queueInterface.classList.toggle("queueInterface-active");
  if (queueInterface.classList[1] === "queueInterface-active"){
    playListQueue.firstElementChild.innerText = "keyboard_arrow_down";
  }
  else{
    playListQueue.firstElementChild.innerText = "playlist_play";
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
