
function shuffleM(input){
  if (input.style.color === 'rgb(51, 226, 255)'){
    shuffling = false;
    input.style.color = 'white';
    console.log('There is color inside');
  }
  else if (input.style.color === '' || input.style.color === 'white'){
    shuffling = true;
    input.style.color = '#33E2FF';
    sCondition(0);
    console.log('No color applied');
  }
}

function previous(){
  tableQLCollection.map(function(x){
    if(x.titleName === songLeftTitle.innerText){
      selectedIndex = tableQLCollection.indexOf(x);
    }
  })
  rCondition(3);
}

function pausePlay(){
  if(audioTag.src && localStorage.QueueStatus === "true"){
    if(audioTag.paused){
      audioTag.play();
      playPauseB.firstElementChild.innerText = "pause";
    }
    else{
      audioTag.pause();
      playPauseB.firstElementChild.innerText = "play_arrow";
    }
  }
}

function next(){
  tableQLCollection.map(function(x){
    if(x.titleName === songLeftTitle.innerText){
      selectedIndex = tableQLCollection.indexOf(x);
    }
  })
  if (repeating === 0 || repeating === 2){
    rCondition(0);
  }
  else if (repeating === 1){
    rCondition(1);
  }
}

function repeat(input){
  if (input.innerText === 'repeat' && (input.style.color === '' || input.style.color === 'white')){
    input.style.color = '#33E2FF';
    repeating = 1;
  }
  else if (input.innerText === 'repeat' && input.style.color === 'rgb(51, 226, 255)'){
    input.innerText = 'repeat_one';
    repeating = 2;
  }
  else if (input.innerText = 'repeat_one' && input.style.color === 'rgb(51, 226, 255)'){
    input.innerText = 'repeat';
    input.style.color = 'white';
    repeating = 0;
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
    audioTag.muted = false;
  }
  else if(volumeSlider.value <= 100 && volumeSlider.value > 50){
    volumeIcon.firstElementChild.innerText = "volume_up";
    audioTag.muted = false;
  }
}

//s = shuffle
function sCondition(input){
  if (input === 0){
    shuffleQLCollection = tableQLCollection.slice();
    temporary = shuffleQLCollection.splice(0,1);
    shuffle(shuffleQLCollection);
    shuffleQLCollection.unshift(temporary[0]);
    tableQLCollection = shuffleQLCollection;
    generateTableContent(songLeftAuthor.innerText, songLeftTitle.innerText, 'queueTable');
    seeIfSame(songLeftAuthor.innerText, songLeftTitle.innerText, (songLeftAuthor.innerText + "-" + songLeftTitle.innerText));
  }
  else if (input === 1){
    shuffle(tableQLCollection);
    generateTableContent('','','queueTable');
    addAudioSource(tableQLCollection[0].titleName);
  }
}

function rCondition(input){
  if (input === 0){
    if (tableQLCollection[(selectedIndex+1)] !== undefined){
      addAudioSource(tableQLCollection[(selectedIndex+1)].titleName);
    }
  }
  else if (input === 1){
    if (tableQLCollection[(selectedIndex+1)] !== undefined){
      addAudioSource(tableQLCollection[(selectedIndex+1)].titleName);
    }
    else if (tableQLCollection[(selectedIndex+1)] === undefined){
      if (shuffling === true){
        sCondition(1);
      }
      addAudioSource(tableQLCollection[0].titleName);
    }
  }
  else if (input === 2){
    addAudioSource(tableQLCollection[selectedIndex].titleName);
  }
  else if (input === 3){
    if (tableQLCollection[(selectedIndex-1)] !== undefined){
      addAudioSource(tableQLCollection[(selectedIndex-1)].titleName);
    }
  }
}

function randomIndex(input){
  var min = 1;
  input = Math.floor(input);
  return Math.floor(Math.random() * (input - min)) + min;
}
