//TODO: UNDERSTAND THIS THIS
//* AUDIOCONTEXT API SETUP
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let musicSourceNode;
let sfxSourceNode;
let musicPlaying = false;

//Audio file loader
async function loadAudioFile(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer);
}


const tryPlayMusic = async (sound) => {
  try {
    const audioBuffer = await loadAudioFile(sound);
    musicSourceNode = audioContext.createBufferSource();
    musicSourceNode.buffer = audioBuffer;
    musicSourceNode.connect(audioContext.destination);
    musicSourceNode.start();
    musicPlaying = true;
  } catch (error) {
    console.error('Error loading or playing music:', error);
  }
};

const tryPlaySFX = async (sound) => {
  try {
    const audioBuffer = await loadAudioFile(sound);
    sfxSourceNode = audioContext.createBufferSource();
    sfxSourceNode.buffer = audioBuffer;
    sfxSourceNode.connect(audioContext.destination);
    sfxSourceNode.start();
  } catch (error) {
    console.error('Error loading or playing sound effect:', error);
  }
};

const stopMusic = () => {
  if (musicSourceNode && audioContext.state === "running") {
    musicSourceNode.stop();
    musicPlaying = false;
    musicSourceNode.disconnect();
    musicSourceNode = null;
  }
};

const stopSFX = () => {
  if (sfxSourceNode && audioContext.state === "running") {
    sfxSourceNode.stop();
    sfxSourceNode.disconnect();
    sfxSourceNode = null;
  }
};

//* Vars
const music = [
  {
    name: "PELOTUDA",
    artist: "DILLOM",
    src: "./music/PELOTUDA - DILLOM.mp3"
  },
  {
    name: "",
    artist: "",
    src: "./music/.mp3"
  }
]

const bellSoundHref = "https://falsofacu.github.io/stand-pad/music/BELL.mp3"
const shotSoundHref = "https://falsofacu.github.io/stand-pad/music/SHOT.mp3"

const timerSwitch = document.getElementById("check");
let timerSwitchValue = timerSwitch.checked;

const timerTime = document.getElementById("select-time");
let timerValueSeconds = timerTime.value;

let audioMusic = document.getElementById("audio-music");
const audioBell = document.getElementById("audio-bell");
const audioShot = document.getElementById("audio-shot");

const selectMusic = document.getElementById("select-music");
let currentSong = music[Number(selectMusic.value)];

const btnMusic = document.getElementById("btn-music");
const btnBell = document.getElementById("btn-bell");
const btnShot = document.getElementById("btn-shot");

//* Update vars when necesary
// Timer on/off
timerSwitch.addEventListener("change", () => {
  timerSwitchValue = timerSwitch.checked;
})

// Timer time amount 
timerTime.addEventListener("change" , () => {
  timerValueSeconds = timerTime.value;
  console.log(timerValueSeconds);
})

// Selected song
selectMusic.addEventListener("change", () => {
  currentSong = music[Number(selectMusic.value)];
})

//* Change emoji on click and reset after transition ends
let changeButtonText = (element, text) => {
  let content = element.getElementsByClassName("btn-text");
  content[0].innerHTML = text;
}

//* Change timer transition duration
const changeTransitionDuration = (element, duration) => {
  element.style.transitionDuration = `${duration}s`
}

//* Play SFX 
const playSFX = (sfx) => {
  tryPlaySFX(sfx);
};

//* Button events
//Music
btnMusic.addEventListener("click", () => {
  if (musicPlaying) {
    stopMusic();
    changeButtonText(btnMusic, "🎵");
    //Reset transition
    document.getElementsByClassName("loading-anim")[0].style.transitionDuration= "0s";
  }
  else {
    tryPlayMusic(currentSong.src);
    changeButtonText(btnMusic, "🛑");
  }
  
})

btnMusic.addEventListener("transitionend", () => {
  changeButtonText(btnMusic, "🎵");
})

//Bell
btnBell.addEventListener("click", () => {
  const loadingElement = document.getElementsByClassName("loading-anim")[1];
  if(timerSwitchValue) {
    changeTransitionDuration(loadingElement, timerValueSeconds);
    changeButtonText(btnBell, "⏱️");
    setTimeout(() => {
      tryPlaySFX(bellSoundHref);
    }, timerValueSeconds * 1000)
  }
  else {
    tryPlaySFX(bellSoundHref);
  }
})

btnBell.addEventListener("transitionend", () => {
  changeButtonText(btnBell, "🔔");
})

//Shot 
btnShot.addEventListener("click", () => {
  tryPlaySFX(shotSoundHref);
})


