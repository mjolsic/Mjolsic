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

function generateTableContent(authorName,titleName,upNext){
  if (upNext){
    tableBodyUpNext.innerHTML = "";
    tableUpNextOutput += '<tr>';
    tableUpNextOutput += '<td><label><input type="checkbox" class="queueCheckBox"><i class="material-icons">check_box_outline_blank</i></label></td>';
    tableUpNextOutput += '<td class="queueTableUpNext">' + titleName + '</td>';
    tableUpNextOutput += '<td class="queueTableUpNext">' + authorName + '</td>';
    tableUpNextOutput += '<td class="queueTableUpNext">Option</td>';
    tableUpNextOutput += '<td class="queueTableUpNext">' + '</td>';
    tableBodyUpNext.innerHTML = tableUpNextOutput;
  }
  else{
    tableBody.innerHTML = "";
    tableOutput += '<tr>';
    tableOutput += '<td><label><input type="checkbox" class="queueCheckBox"><i class="material-icons">check_box_outline_blank</i></label></td>';
    tableOutput += '<td class="queueTable">' + titleName + '</td>';
    tableOutput += '<td class="queueTable">' + authorName + '</td>';
    tableOutput += '<td class="queueTable">Option</td>';
    tableOutput += '<td class="queueTable">' + '</td>';
    tableBody.innerHTML = tableOutput;
  }
}

//Change color of the row of table when the current playing song is the same as the content of that row
function styleOfTable(parameter){
  //Get the selected Element
  numberOfRowOnTable = nameInTableContent.indexOf(parameter);
  if (currentPlaying !== ""){
    //Initiate the unselected elements
    var unselectedElements;
    //Hold the value of parameter for later comparison
    var selectedElement = parameter;
    //Change color for the selected song on the table;
    tableBodyStyle(numberOfRowOnTable,'color');
    //Filter out the selectedSong
    var filteredTable = nameInTableContent.filter(function(selectedElement){return selectedElement !== parameter});
    //Get the index number of the unselected elements and change their color in the table to white
    for (unselectedElements = 0; unselectedElements < filteredTable.length; unselectedElements++){
      var nameOfUnselected = filteredTable[unselectedElements];
      var indexInOriginalArray = nameInTableContent.indexOf(nameOfUnselected);
      tableBodyStyle(indexInOriginalArray);
    }
  }
  else{
    tableBodyStyle(0,'color');
  }
}

//Execute when one of the table is being clicked
function tableWhenClicked(input){
  if(input !== dataValue){
    addAudioSource(input);
    dataValue = input;
  }
}

//Table Body style
function tableBodyStyle(input,color){
  if(color){
    tableBody.childNodes[input].childNodes[1].style.color = '#33E2FF';
    tableBody.childNodes[input].childNodes[2].style.color = '#33E2FF';
    tableBody.childNodes[input].childNodes[3].style.color = '#33E2FF';
    tableBody.childNodes[input].childNodes[4].style.color = '#33E2FF';
  }
  else{
    tableBody.childNodes[input].childNodes[1].style.color = 'white';
    tableBody.childNodes[input].childNodes[2].style.color = 'white';
    tableBody.childNodes[input].childNodes[3].style.color = 'white';
    tableBody.childNodes[input].childNodes[4].style.color = 'white';
  }
}

//Generate random 3 values for upNext table
function upNext(){
  random3Values = [];
  var copiedArray = songNameInSongs.slice();
  shuffle(copiedArray);
  var index1 = songNameInSongs.indexOf(copiedArray[0]);
  var index2 = songNameInSongs.indexOf(copiedArray[1]);
  var index3 = songNameInSongs.indexOf(copiedArray[2]);
  random3Values.push(index1);
  random3Values.push(index2);
  random3Values.push(index3);
  return random3Values;
}

//execute when refresh button is clicked
function getNameForUpNextTable(){
  upNext();
  //songs title names
  var name1 = songs[0].list[random3Values[0]].name;
  var name2 = songs[0].list[random3Values[1]].name;
  var name3 = songs[0].list[random3Values[2]].name;
  //songs author names
  var authorName1 = songs[0].list[random3Values[0]].authorName;
  var authorName2 = songs[0].list[random3Values[1]].authorName;
  var authorName3 = songs[0].list[random3Values[2]].authorName;
  generateTableContent(authorName1,name1,'upNext');
  generateTableContent(authorName2,name2,'upNext');
  generateTableContent(authorName3,name3,'upNext');
}

//shuffle the array
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
