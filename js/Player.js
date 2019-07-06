var audioTag = document.getElementById("playerSource");
var playPause = document.getElementById("play-pause");
var juiceBarDuration = document.getElementById("juiceBarDuration");
var volumeIcon = document.getElementById("volume");
var volumeSlider = document.getElementById("volumeRange");
var startTime = document.getElementById("start");
var endTime = document.getElementById("end");
var isPlaying = false;
var seeking = false;
var seekTo;
var currentPlaying = "";

window.addEventListener("load",initialisePlayer());

function initialisePlayer(){
  //getSongs();
  juiceBarDuration.addEventListener("input",seekSong);
  audioTag.addEventListener("timeupdate",seekSongUpdate);
  volumeIcon.addEventListener("click",mute);
  volumeSlider.addEventListener("mousemove", setVolume);

  audioTag.onplaying = function(){
    isPlaying = true;
  };

  audioTag.onpause = function(){
    isPlaying = false;
  };
}

function getSongs(){
  var ulClearFix = document.getElementById("ulClearFix");
  ulClearFix.innerHTML = "";
  var output="";
  for (var songsList=0; songsList < 4; songsList++){
    output += '<li class="col-md-2 col-sm-3 col-xs-4">';
    output += '<div class="songPicLoading" style="background-image:url(image/Chinese/' + songsList + '.jpg); " onclick="addAudioSource(' + songsList + ')"></div>';
    output += '<div class="title">';
    output += '<h5 class="text-overflow">';
    output += '<a href="">' + songs[0].list[songsList].name + '</a>';
    output += '</h5>';
    output += '</div>';
    output += '</li>';
  }
  ulClearFix.innerHTML = output;
}


function addAudioSource(input){
  if(currentPlaying === ""){
    audioTag.pause();
    console.log(true);
  }
  else if(currentPlaying === audioTag.currentSrc){
    audioTag.pause();
    audioTag.setAttribute("src", 'https://docs.google.com/uc?export=download&id=' + songs[0].list[input].driveUrl + '')
    console.log(songs[0].list[input].name);
  }
  audioTag.innerHTML = '<source src="https://docs.google.com/uc?export=download&id=' + songs[0].list[input].driveUrl + '">';
  playPause.firstElementChild.innerText = "pause";
  currentPlaying = 'https://docs.google.com/uc?export=download&id=' + songs[0].list[input].driveUrl + '';
  audioTag.play();
}

function pausePlay(){
  if(audioTag.innerHTML !== ""){
    if(isPlaying){
      audioTag.pause();
      playPause.firstElementChild.innerText = "play_arrow";
    }
    else{
      audioTag.play();
      playPause.firstElementChild.innerText = "pause";
    }
  }
}

function seekSong(){
  var juicePosition = juiceBarDuration.value/100 * audioTag.duration;
  audioTag.currentTime = juicePosition;
}

function seekSongUpdate(){
  var newTime = audioTag.currentTime * (100 / audioTag.duration);
  juiceBarDuration.value = newTime;
  startTime.style.color = "white";
  endTime.style.color = "white";
  console.log(juiceBarDuration.value);
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
}



function mute(){
  if(audioTag.muted){
    audioTag.muted = false;
    volumeIcon.firstElementChild.innerText = "volume_up";
  }
  else{
    audioTag.muted = true;
    volumeIcon.firstElementChild.innerText = "volume_mute";
  }
}

function setVolume(){
  audioTag.volume = volumeSlider.value/100;
}
