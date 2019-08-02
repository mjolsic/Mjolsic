function seeIfSame(authName, titleName, realName){
  isInTable = false;
  tableQLCollection.forEach(function(x){
    if ((x.authorName + "-" + x.titleName) === realName){
      isInTable = true;
    }
  });

  if (isInTable){
    console.log(titleName + " is in the table");
    styleOfTable(titleName);
  }
  else{
    console.log(titleName + ' is not in the table');
    generateTableContent(authName, titleName, 'queueTable');
    styleOfTable(titleName);
  }
}

class TableContent{
  constructor(authorName, titleName, classN){
    this._authorName = authorName;
    this._titleName = titleName;
    this._classN = classN;
    this._output;
  }
  set authorName(parameter){
    this._authorName = parameter;
  }
  set titleName(parameter){
    this._titleName = parameter;
  }
  set classN(parameter){
    this._classN = parameter;
  }
  set output(parameter){
    this._output = parameter;
  }
  get authorName(){
    return this._authorName;
  }
  get titleName(){
    return this._titleName;
  }
  get classN(){
    return this._classN;
  }
  get output(){
    return this._output;
  }
  createTableContent(classN, titleName, authorName){
    var output = '';
    output += '<tr data-value="' + authorName + "-" + titleName + '">';
    output += '<td><label><input type="checkbox" class="queueCheckBox"><i class="material-icons">check_box_outline_blank</i></label></td>';
    output += '<td class="' + classN + '">' + titleName + '</td>';
    output += '<td class="' + classN + '">' + authorName + '</td>';
    output += '<td class="' + classN + '">Option</td>';
    output += '<td class="' + classN + '">' + '</td>';
    return output;
  }
}

function generateTableContent(authorName,songName,classN){
  tableInstance = new TableContent(authorName,songName,classN);
  //ctc = create table content
  cTC = tableInstance.createTableContent(classN, songName, authorName);
  tableInstance.output = cTC;

  if (classN === "allListTable"){
    tableAPCollection.push(tableInstance);
  }
  else if (classN === "queueListUpNext"){
    tableUNCollection.push(tableInstance);
  }
  else if (classN === "queueTable"){
    tableBody.innerHTML = "";
    tableOutput = "";
    if (shuffling === false){
      tableQLCollection.push(tableInstance);
    }  
    tableQLCollection.forEach(function(x){
      tableOutput += x.output;
    })
    tableBody.innerHTML = tableOutput;
  }
  else if (classN === "morelisttable"){
    tableMPCollection.push(tableInstance);
  }
  /*for shuffling
  else if (classN === 0){

    else if (repeating === 1){
      tableBody.innerHTML = "";
      tableOutput = "";
      tableQLCollection.forEach(function(x){
        tableOutput += x.output;
      })
      tableBody.innerHTML = tableOutput;

    }
  }*/
}

//Change color of the row of table when the current playing song is the same as the content of that row, TB = tableBody
function styleOfTable(parameter){
  if (currentPlaying !== ""){
    indexOfTBSelected = "";
    indexOfTBUnselected = [];
    tableQLCollection.forEach(function(x){
      if (x.titleName === parameter){
        //Get the selected Element
        indexOfTBSelected = tableQLCollection.indexOf(x);
      }
      else{
        //Filter out the selectedSong
        indexOfTBUnselected.push(tableQLCollection.indexOf(x));
      }
    });
    //Initiate the unselected elements
    var unselectedElements;
    //Change color for the selected song on the table;
    tableBodyStyle(indexOfTBSelected,'color');
    //Get the index number of the unselected elements and change their color in the table to white
    for (unselectedElements = 0; unselectedElements < indexOfTBUnselected.length; unselectedElements++){
      tableBodyStyle(indexOfTBUnselected[unselectedElements]);
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
  else{
    addAudioSource(input);
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
function upNext(input){
  random3Values = [];
  shuffle(copiedArray);
  var index1 = songNameInSongs.indexOf(copiedArray[0]);
  var index2 = songNameInSongs.indexOf(copiedArray[1]);
  var index3 = songNameInSongs.indexOf(copiedArray[2]);
  if (input === 'refresh'){
    copiedArray.push(copiedArray[0])
    copiedArray.push(copiedArray[1])
    copiedArray.push(copiedArray[2]);
    index1 = songNameInSongs.indexOf(copiedArray[3]);
    index2 = songNameInSongs.indexOf(copiedArray[4]);
    index3 = songNameInSongs.indexOf(copiedArray[5]);
  }
  random3Values.push(index1);
  random3Values.push(index2);
  random3Values.push(index3);
  copiedArray.splice(0,3);
}

//execute when refresh button is clicked
function getNameForUpNextTable(input){
  tableUpNextOutput = "";
  if (!input){
    upNext();
    var authorName;
    var songName;
    random3Values.forEach(function(x){
      authorName = authorNameInSongs[x];
      songName = songNameInSongs[x];
      generateTableContent(authorName, songName, 'queueListUpNext');
    });
  }
  else if (input === 'refresh'){
    upNext(input);
    tableUNCollection = [];
    var authorName;
    var songName;
    random3Values.forEach(function(x){
      authorName = authorNameInSongs[x];
      songName = songNameInSongs[x];
      generateTableContent(authorName, songName, 'queueListUpNext');
    });
  }
  tableUNCollection.forEach(function(x){
    tableUpNextOutput += x.output;
  })
  tableBodyUpNext.innerHTML = tableUpNextOutput;
}

//shuffle the array
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

//Get all names in table
function getAllName(input){
  nameInTableContent = [];
  var details = {};
  input.childNodes.forEach(function(x){
    details.authName = x.childNodes[2].innerText;
    details.titleName = x.childNodes[1].innerText;
    details.realName = details.authName + "-" + details.titleName;
    nameInTableContent.push(details.realName);
  });
  return nameInTableContent;
}

//TB = table body, IFNO = index for next one,
function removeSelected(auth, tilt){
  indexOfUNSelected = "";
  nextOne = copiedArray[0];
  tiltIFNO = songNameInSongs.indexOf(nextOne);
  authName = authorNameInSongs[tiltIFNO];

  tableUNCollection.forEach(function(x){
    if ((x.authorName === auth) && (x.titleName === tilt)){
      //Get the selected Element
      indexOfUNSelected = tableUNCollection.indexOf(x);
    }
  });

  tableUNCollection.splice(indexOfUNSelected, 1);
  generateTableContent(authName, nextOne, 'queueListUpNext');
  getNameForUpNextTable('addNewOneToUNTable');
  copiedArray.splice(0,1);
}

function morePageTable(input){
  //clear contents in the arrays
  tableMPCollection = [];
  mPAuthor = [];
  queueLists = [];
  if (input === "Chinese Songs"){
    //get the selected song names
    mPTitle = songNameInSongs.slice(chineseIndex, englishIndex);
  }
  else if (input === "English Songs"){
    mPTitle = songNameInSongs.slice(englishIndex, koreanIndex);
  }
  else if (input === "Korean Songs"){
    mPTitle = songNameInSongs.slice(koreanIndex, songNameInSongs.length);
  }
  //get the author's name for each songs
  mPTitle.forEach(function(x){
    indexInTheWholeCollection = songNameInSongs.indexOf(x);
    selectedIndex = mPTitle.indexOf(x);
    mPAuthor.push(authorNameInSongs[indexInTheWholeCollection]);
    queueLists.push(driveUrlInSongs[indexInTheWholeCollection]);
    var authorNameMP = mPAuthor[selectedIndex];
    var titleNameMP = mPTitle[selectedIndex];
    generateTableContent(authorNameMP,titleNameMP,'morelisttable');
  })
  moreListTable.innerHTML = "";
  mLTOutput = "";
  tableMPCollection.forEach(function(x){
    mLTOutput += x.output;
  })
  moreListTable.innerHTML = mLTOutput;
  selectedIndex = '';
}

function playAll(input){
  if (input === typeOfSong){
    tableQLCollection = [];
    mPTitle.forEach(function(x){
      selectedIndex = mPTitle.indexOf(x);
      var authorNameMP = mPAuthor[selectedIndex];
      var titleNameMP = mPTitle[selectedIndex];
      generateTableContent(authorNameMP,titleNameMP,'queueTable');
    });
  }
  addAudioSource(mPTitle[0]);
  selectedIndex = '';
}
