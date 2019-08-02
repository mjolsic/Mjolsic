Array.prototype.getDuplicates = function () {
  var duplicates = {};
  var dupNames;
  for (var i = 0; i < this.length; i++) {
      if(duplicates.hasOwnProperty(this[i])) {
          duplicates[this[i]].push(i);
      } else if (this.lastIndexOf(this[i]) !== i) {
          duplicates[this[i]] = [i];
      }
  }
  dupNames = loop(duplicates);
  dupCollection.push(duplicates);
  dupCollection.push(dupNames);
  return dupCollection;
};

//NAI = name and index
Array.prototype.getAllNAI = function () {
  var nAI = {};
  for (var i = 0; i < this.length; i++) {
    if(nAI.hasOwnProperty(this[i])) {
      nAI[this[i]].push(i);
    }
    else{
      nAI[this[i]] = [i];
    }
  }
  return nAI;
};

window.addEventListener("load",initialisePlayer());

function initialisePlayer(){
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
  elementsAddEventListener(audioTag, "ended", "ended");
  elementsAddEventListener(volumeSlider, "mousemove", "setVolume");
  elementsAddEventListener(volumeSlider, "mousemove", "colorChangeOnHover", volumeSlider);
  elementsAddEventListener(volumeSlider, "input", "colorChangeOnHover", volumeSlider);
  elementsAddEventListener(volumeSlider, "mouseleave", "colorChangeOnOver", volumeSlider);
  elementsAddEventListener(volumeSlider, "mouseout", "colorChangeOnOver", volumeSlider);
  elementsAddEventListener(window, "resize", "relativeSizeCss");
  elementsAddEventListener(document, "click", "seeIfClicked", event);
  //elementsAddEventListener(document, "mouseover", "seeIfHover", event);
}

function getSongs(){
  songs.forEach(function(x){x.list.map(function(y){songNameInSongs.push(y.name)})})
  songs.forEach(function(x){x.list.map(function(y){authorNameInSongs.push(y.authorName)})})
  songs.forEach(function(x){x.list.map(function(y){driveUrlInSongs.push(y.driveUrl)})})
  allVAI = authorNameInSongs.getAllNAI();
  nonDuplicates = JSON.parse(JSON.stringify(allVAI));
  duplicates = authorNameInSongs.getDuplicates();
  filter(nonDuplicates, duplicates[1]);
  copiedArray = songNameInSongs.slice();
  loopSongContent();
}

function addAudioSource(input){
  localStorage.QueueStatus = true;
  //Index in the whole song collection
  indexInTheWholeCollection = songNameInSongs.indexOf(input)
  //retrieve all information of the song
  var details = {};
  details.authName = authorNameInSongs[indexInTheWholeCollection];
  details.titleName = songNameInSongs[indexInTheWholeCollection];
  details.realName = details.authName + "-" + details.titleName;
  details.driveUrl = driveUrlInSongs[indexInTheWholeCollection];
  if(currentPlaying === ""){
    seeIfSame(details.authName,details.titleName,details.realName);
    styleOfTable();
  }
  else if(currentPlaying === audioTag.currentSrc){
    audioTag.pause();
    styleOnAction("ended");
    seeIfSame(details.authName,details.titleName,details.realName);
  }
  audioTag.setAttribute("src", drivePreUrl + details.driveUrl + '');
  playPauseB.firstElementChild.innerText = "pause";
  currentPlaying = drivePreUrl + details.driveUrl + '';
  displayStyle(songPicture, songLeftTitle, songLeftAuthor, details.realName, details.authName, details.titleName, 'source')
  //Details on left panel
  displayStyle(queueSongPicture, queueSongTitleText, queueSongAuthorText, details.realName, details.authName, details.titleName, "left")
  //Details on right panel
  displayStyle(queueRightSongPanel, queueRightSongTitleText, queueRightSongAuthorText, details.realName, details.authName, details.titleName, "right")
  //audioTag.play();
}

//style on the music player, 1-3 = its document reference, 4 = combinedName/realName
//5 = authorName, 6 = titleName
function displayStyle(input1, input2, input3, input4, input5, input6, position){
  input1.style.backgroundImage = imageUrl + 'Chinese/' + input4 + '.jpg")';
  input2.innerText = input6;
  if (position === "left" || position === "right"){
    input3.innerText = "By " + input5;
  }
  else if (position === 'source'){
    input3.innerText = input5;
    input2.style.color = "white";
    input3.style.color = "#C0C0C0";
  }
}

function loopSongContent(){
  for (var songType = 0; songType < /*1*/songs.length; songType++){
    rowOutput += '<div class="mainContent">';
    rowOutput += '<div class="boxTitle">';
    rowOutput += '<div class="m-0">' + songs[songType].type + ' Songs</div>';
    rowOutput += '<div class="more pull-right">';
    rowOutput += '<a class="textMuted">More</a>';
    rowOutput += '</div>';
    rowOutput += '</div>';
    rowOutput += '<div class="outline"></div>';
    rowOutput += '<ul class="clearfix">';
    for (var songsList = 0; songsList < /*51*/ /*songs[songType].list.length*/ 2; songsList++){
      songTitles = songs[songType].list[songsList].authorName + "-" + songs[songType].list[songsList].name;
      authorDataValue = songs[songType].list[songsList].authorName;
      titleDataValue = songs[songType].list[songsList].name;
      rowOutput += '<li class="col-md-2 col-sm-3 col-xs-4">';
      rowOutput += '<div class="songPicLoading" data-value="'+ titleDataValue +'" style="background-image:url(image/Chinese/' + songTitles + '.jpg);"' + '></div>';
      rowOutput += '<div class="title">';
      rowOutput += '<h5 class="text-overflow">';
      rowOutput += '<a class="authorSName" data-value="' + authorDataValue + '">' + songTitles + '</a>';
      rowOutput += '</h5>';
      rowOutput += '</div>';
      rowOutput += '</li>';
    }
    rowOutput += '</ul>';
    rowOutput += '</div>';
  }
  row.innerHTML = rowOutput;
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

function styleOnAction(input){
  if (input === "ended"){
    startTime.style.color = "grey";
    endTime.style.color = "grey";
    previousB.style.color = "grey";
    playPauseB.style.color = "grey";
    nextB.style.color = "grey";
    startTime.innerHTML = "--:--";
    endTime.innerHTML = "--:--";
  }
  else if (input === "started"){
    startTime.style.color = "white";
    endTime.style.color = "white";
    previousB.style.color = "white";
    playPauseB.style.color = "white";
    nextB.style.color = "white";
  }
}

//filter out the duplicates
function filter(object, array){
  for (var i = 0; i < array.length; i++) {
    if(object[array[i]].length > 1 ) {
      delete object[array[i]];
    }
  }
}

//loop the properties in an object
function loop(obj){
  var names = []
  for (var prop in obj){
    names.push(prop);
  }
  return names;
}

function checkIfInObj(input){
  //not a duplicate item
  if (nonDuplicates[input]){
    tableAPCollection = [];
    allSLOutput = "";
    var itsIndex = nonDuplicates[input][0];
    generateTableContent(input,songs[0].list[itsIndex].name, 'allListTable');
    allSLOutput = tableAPCollection[0].output;
    allSongsList.innerHTML = allSLOutput;
  }
  //duplicate item
  else{
    tableAPCollection = [];
    allSLOutput = "";
    duplicates[0][input].forEach(function(x){generateTableContent(input,songs[0].list[x].name,'allListTable')});
    tableAPCollection.forEach(function(x){allSLOutput += x.output});
    allSongsList.innerHTML = allSLOutput;
  }
}

function ended(){
  playPauseB.firstElementChild.innerText = "play_arrow";
  styleOnAction("ended");
  juiceBarDuration.value = 0;
  tableQLCollection.map(function(x){
    if(x.titleName === songLeftTitle.innerText){
      selectedIndex = tableQLCollection.indexOf(x);
    }
  })
  if (repeating === 0){
    rCondition(0);
  }
  else if (repeating === 1){
    rCondition(1);
  }
  else if (repeating === 2){
    rCondition(2)
  }
}

//Execute when anything in the document is being clicked
function seeIfClicked(event){
  //If condition for checkboxes on table being clicked
  if (event.target.matches('.queueCheckBox')){
    if (event.target.checked){
      event.target.nextSibling.innerText = "check_box";
    }
    else{
      event.target.nextSibling.innerText = "check_box_outline_blank";
    }
  }
  //If condition for rows on tableBody being clicked
  else if (event.target.matches('.queueTable')){
    tableWhenClicked(event.target.parentElement.childNodes[1].innerHTML);
  }
  //If condition for picture on index page being clicked
  else if (event.target.matches('.songPicLoading')){
    dataValue = event.target.getAttribute('data-value');
    addAudioSource(dataValue);
    if (localStorage.QueueStatus === "true"){
      playerContainer.classList.remove('toDownward');
      playerContainer.classList.toggle('returnFromVertical');
    }
  }
  //if condition for arrow down icon on queueinterface being clicked
  else if (event.target.matches('.collapseButton i')){
    queueInterface.classList.remove("returnFromVertical");
    queueInterface.classList.toggle("toDownward1");
    row.classList.remove('hide');
    playListQueue.firstElementChild.innerText = "playlist_play";
  }
  //if condition for queueList button being clicked
  else if (event.target.matches('#playListQueue i')){
    queueInterface.classList.remove("toDownward1");
    queueInterface.classList.toggle("returnFromVertical");
    row.classList.toggle('hide');
  if (queueInterface.classList[1] === "returnFromVertical"){
      event.target.innerText = "keyboard_arrow_down";
    }
    else{
      event.target.innerText = "playlist_play";
      queueInterface.classList.toggle("toDownward1");
    }
  }
  //if condition to animate ripple button effect
  else if (event.target.matches('.rippleBtn')){
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
    getNameForUpNextTable('refresh');
  }
  //if condition for author name on index page being pressed, ADV = author data value, VAI = value and indexes
  else if (event.target.matches('.authorSName')){
    authorPage.classList.remove('toLeft');
    authorPage.classList.toggle('returnFromHorizontal');
    row.classList.toggle('hide');
    authorDV = event.target.getAttribute('data-value');
    authorNameOAP.innerText = authorDV;
    checkIfInObj(authorDV);
  }
  //if codition for back button on author page
  else if (event.target.matches('.back') || event.target.matches('.backButton i')){
    authorPage.classList.remove('returnFromHorizontal');
    authorPage.classList.toggle('toLeft');
    row.classList.remove('hide');
  }
  //if condition for table in authorPage
  else if (event.target.matches('.allListTable')){
    tableWhenClicked(event.target.parentElement.childNodes[1].innerText);
  }
  //if condition for 'more' button
  else if (event.target.matches('.textMuted')){
    typeOfSong = event.target.parentElement.parentElement.childNodes[0].innerText/*.slice(0,-6);*/
    row.classList.toggle('hide');
    morePage.classList.remove('toRight');
    morePage.classList.toggle('returnFromHorizontal');
    moreName.innerText = typeOfSong;
    morePageTable(typeOfSong);
  }
  //if codition for back button on more page
  else if (event.target.matches('.mPBack') || event.target.matches('.mPBackButton i')){
    row.classList.remove('hide');
    morePage.classList.remove('returnFromHorizontal');
    morePage.classList.toggle('toRight');
  }
  //if condition for upNextTable
  else if (event.target.matches('.queueListUpNext')){
    var titleN = event.target.parentElement.childNodes[1].innerText;
    var authorN = event.target.parentElement.childNodes[2].innerText;
    tableWhenClicked(event.target.parentElement.childNodes[1].innerText);
    removeSelected(authorN, titleN);
  }
  //if condition for play all button
  else if (event.target.matches('.playAll')){
    var page = event.target.parentElement.childNodes[1].innerText;
    playAll(page);
    if (playerContainer.classList[1] === 'toDownward'){
      playerContainer.classList.remove('toDownward');
      playerContainer.classList.toggle('returnFromVertical');
    }
  }
  //if condition when shuffle button is clicked
  else if (event.target.matches('#shuffle i')){
    shuffleM(event.target);
  }
  //if condition when table in more page is clicked
  else if (event.target.matches('.morelisttable')){
    tableWhenClicked(event.target.parentElement.childNodes[1].innerText);
    if (playerContainer.classList[1] === 'toDownward'){
      playerContainer.classList.remove('toDownward');
      playerContainer.classList.toggle('returnFromVertical');
    }
  }
  //if condition for repeat button
  else if (event.target.matches('#repeat i')){
    repeat(event.target);
  }
  //if condition for pause and play button
  else if (event.target.matches('#play-pause i')){
    pausePlay();
  }
  //if condition for previous button
  else if (event.target.matches('#previous i')){
    previous();
  }
  //if condition for next button
  else if (event.target.matches('#next i')){
    next();
  }
}

//Create Little dialog to show detail when mouse hover to the element
function seeIfHover(event){
  if (event.target.matches('.m-0')){
    //console.log(true);
  }
  //console.log(event.target)
}
