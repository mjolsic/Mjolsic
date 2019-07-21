//Referencing the audio tag in the html
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

//Google drive url
var drivePreUrl = 'https://drive.google.com/uc?export=download&id=';


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
//All the song name in the whole collection
var songNameInSongs;
//The clicked song's index in the entire collection
var indexInTheWholeCollection;
//The value of the currently selected song(name)
var dataValue;
//Combined of auth and title name of current playing
var realName;
//The title name of the current playing
var currentPlayingTitle;
//Index of displayed song on the table
var numberOfRowOnTable;

//Initiating Table Variables
var tableBody = document.querySelector('.queueList tbody');
var nameInTableContent = [];

//Initiating Current playing song picture for left panel
var queueSongPicture = document.getElementsByClassName('queueSongPicture')[0];
var queueSongTitleText = document.getElementsByClassName('queueSongTitle')[0];
var queueSongAuthorText = document.getElementsByClassName('queueSongAuthor')[0];

//Initiating Current playing song picture for right panel
var queueRightSongPanel = document.getElementsByClassName('queueSongPicture')[1];
var queueRightSongTitleText = document.getElementsByClassName('queueSongTitle')[1];
var queueRightSongAuthorText = document.getElementsByClassName('queueSongAuthor')[1];

//Initiate button variable
var rippleButton = document.getElementsByClassName('rippleBtn')[0];

//Title and authorName for the clicked song
var authName;
var titleName;

//Variable for random 3 values for songsList
var random3Values;

//Initiate table list up next
var tableBodyUpNext = document.querySelector('.queueListUpNext tbody');
var tableUpNextOutput = "";

//Variables for author page, OAP = on author page
var authorPage = document.querySelector('.authorPage');
var authorDV;
var authorNameOAP = document.querySelector('.author-Name');
