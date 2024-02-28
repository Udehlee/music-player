// Assign all element in the html to a variable

const now_Playing = document.querySelector(".now-playing");
const artist_Image = document.querySelector(".artist-image");
const song_Image = document.querySelector(".artist-image-disc");
const song_Name = document.querySelector(".song-name");
const artist = document.querySelector(".artist");


// const wave = document.querySelector(".wave");

const song_slider = document.querySelector("#song-slider");
const current_time = document.querySelector(".current-time");
const duration_time = document.querySelector(".duration-time");



const prev_Btn = document.querySelector(".previous-track");
const play_Icon = document.querySelector(".fa-play");
const play_Btn = document.querySelector(".play-track");
const next_Btn = document.querySelector(".next-track");

//create the audio element
let audio_Player = document.createElement('audio');

// global variables
let current_Song = 0;
let next_Song;
let prev_Song;
let updateTimer;



//Available track list
let song_list = [

  {
    name: "Happiness Instrumental",
    artist: "Sarz ft Asake",
    image: "Images/headphone.png",
    path: "sounds/Sarz-Happiness-ft.-Asake-Gunna-Instrumental.mp3"
  },

  {
    name: "Feran mi Instrumental",
    artist: "Kizzdaniel ft Johnny Drille",
    image: "Images/bg-unsplash.jpg",
    path: "sounds/kizz-daniel-ft-johnny-drille-feran-mi_instrumental.mp3"
  },
  {
    name: "Johnny Instrumental",
    artist: "Yemi Alade",
    image: "Images/headphone.png",
    path: "sounds/Yemi_Alade_-_Johnny_Instrumental_afrodjpool.com.mp3"
  }


];

updateSongDetails();


function updateSongDetails() {
  var song = song_list[current_Song];
  song_Image.src = song.image;
  artist_Image.src = song.image;
  song_Name.innerHTML = song.name;
  artist.innerHTML = song.artist;
  audio_Player.src = song.path;

  clearInterval(updateTimer);
  reset();

  updateTimer = setInterval(sliderThumbRange, 1000);

  audio_Player.addEventListener('ended', nextSong); //play next song when the present finished playing

  //  // Apply a random background color
  //  random_bg_color();
}


function playPauseSong() {
  if (audio_Player.paused) {
    audio_Player.play();
    now_Playing.innerHTML = "Now playing";
    play_Icon.classList.remove('fa-play');
    play_Icon.classList.add('fa-pause');
    song_Image.classList.add('rotate');
  } else {
    audio_Player.pause();
    now_Playing.innerHTML = "paused";
    play_Icon.classList.add("fa-play");
    play_Icon.classList.remove('fa-pause');
    song_Image.classList.remove('rotate');
  }
}


play_Btn.addEventListener("click", playPauseSong);
next_Btn.addEventListener("click", nextSong);
prev_Btn.addEventListener("click", prevSong);



function nextSong() {
  current_Song++;
  next_Song = current_Song + 1;
  if (current_Song > song_list.length - 1) {
    current_Song = 0;
  }
  updateSongDetails(song_list[current_Song]);
  playPauseSong();

}

function prevSong() {
  current_Song--;
  prev_Song = current_Song - 1;
  if (current_Song < 0) {
    current_Song = song_list.length - 1;
  }

  updateSongDetails(song_list[current_Song]);
  playPauseSong();

}

function reset() {
  current_time.textContent = "00:00";
  duration_time.textContent = "00:00";
  song_slider.value = 0;//moves the slider thumb to the starting
}

//make the current time and song path align together
function change_duration() {
  let sliderPosition = audio_Player.duration * (song_slider.value / 100);
  audio_Player.currentTime = sliderPosition;
}


function sliderThumbRange(){
let sliderThumbPosition = 0;
if(!isNaN(audio_Player.duration)){
  sliderThumbPosition = audio_Player.currentTime * (100 / audio_Player.duration);
  song_slider.value = sliderThumbPosition;

  let currentMinutes = Math.floor(audio_Player.currentTime / 60);
  let currentSeconds = Math.floor(audio_Player.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(audio_Player.duration / 60);
  let durationSeconds = Math.floor(audio_Player.duration - durationMinutes * 60);

  if(currentSeconds < 10){
  currentSeconds = "0" + currentSeconds;
}
if(durationSeconds < 10){
  durationSeconds = "0" + durationSeconds;
}
if(currentMinutes < 10){
  currentMinutes = "0" + currentMinutes;
}
if(durationMinutes < 10){
  durationMinutes = "0" + durationMinutes;
}

current_time.textContent = currentMinutes + ":" + currentSeconds;
duration_time.textContent = durationMinutes + ":" + durationSeconds;
}
}


