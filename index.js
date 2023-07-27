//* Vars
const music = [
  {
    name: "PELOTUDA",
    artist: "DILLOM",
    src: "./music/PELOTUDA - DILLOM.mp3",
    startTimeSeconds: "11"
  },
  {
    name: "",
    artist: "",
    src: "./music/.mp3",
    startTimeSeconds: "0"
  }
]

const btnMusic = document.getElementById("btn-music");
const btnBell = document.getElementById("btn-bell");
const btnShot = document.getElementById("btn-shot");

let audioMusic = document.getElementById("audio-music");
const audioBell = document.getElementById("audio-bell");
const audioShot = document.getElementById("audio-shot");

const selectMusic = document.getElementById("select-music");

let musicSrc = Number(selectMusic.value);

//* Audio Options
audioBell.volume = 0.5;

//* Music Setup 
selectMusic.addEventListener("change", () => {
  audioMusic.src = music[musicSrc].src;
})


//* Button Events
btnMusic.addEventListener("click", () => {
  audioBell.pause();
  audioShot.pause();
  
  audioMusic.currentTime = 0;
  audioMusic.paused ? audioMusic.play() : audioMusic.pause();
});

btnBell.addEventListener("click", () => {
  audioMusic.pause();
  audioShot.pause();

  
  audioBell.currentTime = 0;
  audioBell.play();
})

btnShot.addEventListener("click", () => {
  audioMusic.pause();
  audioBell.pause();

  audioShot.currentTime = 0.23;
  audioShot.play();
})

//TODO: Edit audio