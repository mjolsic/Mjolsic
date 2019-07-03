let audioTag = document.getElementById("playerSource");
let playPause = document.getElementById("play-pause");
let isPlaying = false;
let currentPlaying = "";

getSongs();

function getSongs()
{
  let ulClearFix = document.getElementById("ulClearFix");
  ulClearFix.innerHTML = "";
  let output="";
  for (let songsList=0; songsList < 4; songsList++)
  {
    output += '<li class="col-md-2 col-sm-3 col-xs-4">';
    output += '<a class="songPicLoading" style="background-image:url(image/Chinese/' + songsList + '.jpg); " onclick="addAudioSource(' + songsList + ')"></a>';
    output += '<div class="title">';
    output += '<h5 class="text-overflow">';
    output += '<a href="">' + songs[0].list[songsList].name + '</a>';
    output += '</h5>';
    output += '</div>';
    output += '</li>';
  }
  ulClearFix.innerHTML = output;
}


function addAudioSource(input)
{
  if(currentPlaying === "")
  {
    audioTag.pause();
    console.log(true);
  }
  else if(currentPlaying === audioTag.currentSrc)
  {
    audioTag.pause();
    audioTag.setAttribute("src", 'https://docs.google.com/uc?export=download&id=' + songs[0].list[input].driveUrl + '')
    console.log(songs[0].list[input].name);
  }
  audioTag.innerHTML = '<source src="https://docs.google.com/uc?export=download&id=' + songs[0].list[input].driveUrl + '">';
  playPause.firstElementChild.setAttribute("class", "glyphicon glyphicon-pause");
  currentPlaying = 'https://docs.google.com/uc?export=download&id=' + songs[0].list[input].driveUrl + '';
  audioTag.play();
}

function pausePlay()
{
  if(audioTag.innerHTML !== "")
  {
    if(isPlaying)
    {
      audioTag.pause();
      playPause.firstElementChild.setAttribute("class", "glyphicon glyphicon-play");
    }
    else
    {
      audioTag.play();
      playPause.firstElementChild.setAttribute("class", "glyphicon glyphicon-pause")
    }
  }
}

audioTag.onplaying = function(){
  isPlaying = true;
};

audioTag.onpause = function(){
  isPlaying = false;
};
