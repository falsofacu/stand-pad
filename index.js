
//TODO: UNDERSTAND THIS THIS
//* AUDIOCONTEXT API SETUP
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let musicSourceNode;
let sfxSourceNode;
let musicPlaying = false;

// Audio file loader
async function loadAudioFile(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer);
}

// Play song
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

// Play SFX
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

// Stop music
const stopMusic = () => {
  if (musicSourceNode && audioContext.state === "running") {
    musicSourceNode.stop();
    musicPlaying = false;
    musicSourceNode.disconnect();
    musicSourceNode = null;
  }
};

// Stop SFX
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
    name: "BERZERK",
    artist: "EMINEM",
    src: "./music/BERZERK - EMINEM.mp3"
  },
  {
    name: "BLACK BETTY",
    artist: "RAM JAM",
    src: "./music/BLACK BETTY - RAM JAM.mp3"
  },
  {
    name: "CAN'T STOP",
    artist: "RHCP",
    src: "./music/CAN'T STOP - RHCP.mp3"
  },
  {
    name: "CELEBRITY SKIN",
    artist: "HOLE",
    src: "./music/CELEBRITY SKIN - HOLE.mp3"
  },
  {
    name: "CHISTE",
    artist: "EL KUELGUE",
    src: "./music/CHISTE - EL KUELGUE.mp3"
  },
  {
    name: "DELE TIEMPO",
    artist: "EL KUELGUE",
    src: "./music/DELE TIEMPO - EL KUELGUE.mp3"
  },
  {
    name: "FANKY",
    artist: "CHARLY GARCÍA",
    src: "./music/FANKY - CHARLY GARCÍA.mp3"
  },
  {
    name: "GET ON UP",
    artist: "JAMES BROWN",
    src: "./music/GET ON UP - JAMES BROWN.mp3"
  },
  {
    name: "IMMIGRANT SONG",
    artist: "LED ZEPPELIN",
    src: "./music/IMMIGRANT SONG - LED ZEPPELIN.mp3"
  },
  {
    name: "JUMP AROUND",
    artist: "HOUSE OF PAIN",
    src: "./music/JUMP AROUND - HOUSE OF PAIN.mp3"
  },
  {
    name: "PARANOIA POP",
    artist: "BANDALOS CHINOS",
    src: "./music/PARANOIA POP - BANDALOS CHINOS.mp3"
  },
  {
    name: "PEACE FROG",
    artist: "THE DOORS",
    src: "./music/PEACE FROG - THE DOORS.mp3"
  },
  {
    name: "PEOPLE GET UP AND DRIVE YOUR FUNKY SOUL",
    artist: "JAMES BROWN",
    src: "./music/PEOPLE GET UP AND DRIVE YOUR FUNKY SOUL - JAMES BROWN.mp3"
  },
  {
    name: "QUE VAS A HACER TAN SOLA HOY",
    artist: "VIEJAS LOCAS",
    src: "./music/QUE VAS A HACER TAN SOLA HOY - VIEJAS LOCAS.mp3"
  },
  {
    name: "ROCK AND ROLL YO",
    artist: "CHARLY GARCÍA",
    src: "./music/ROCK AND ROLL YO - CHARLY GARCÍA.mp3"
  },
  {
    name: "THE SEED",
    artist: "THE ROOTS",
    src: "./music/THE SEED - THE ROOTS.mp3"
  },
  {
    name: "TNT",
    artist: "AC/DC",
    src: "./music/TNT - ACDC.mp3"
  },
  {
    name: "UN POCO DE AMOR FRANCES",
    artist: "LOS REDONDOS",
    src: "./music/UN POCO DE AMOR FRANCES - LOS REDONDOS.mp3"
  }
];

const bellSoundHref = "https://falsofacu.github.io/stand-pad/music/BELL.mp3"

const timerSwitch = document.getElementById("check");
let timerSwitchValue = timerSwitch.checked;

const timerTime = document.getElementById("select-time");
let timerValueSeconds = timerTime.value;

let audioMusic = document.getElementById("audio-music");
const audioBell = document.getElementById("audio-bell");

const selectMusic = document.getElementById("select-music");
let currentSong = music[Number(selectMusic.value)];

const btnMusic = document.getElementById("btn-music");
const btnBell = document.getElementById("btn-bell");

//* Update Vars
// Update timer state (on/off)
timerSwitch.addEventListener("change", () => {
  timerSwitchValue = timerSwitch.checked;
})

// Update timer time amount 
timerTime.addEventListener("change" , () => {
  timerValueSeconds = timerTime.value;
  console.log(timerValueSeconds);
})

// Update Selected song
selectMusic.addEventListener("change", () => {
  currentSong = music[Number(selectMusic.value)];
})

//* Seconds to digital
const secondsToDigital = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return formattedMinutes + ":" + formattedSeconds;
}

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
    document.getElementsByClassName("loading-anim")[0].style.transitionDuration= "35s";
    tryPlayMusic(currentSong.src);
    changeButtonText(btnMusic, "🛑");
  }
  
})

btnMusic.addEventListener("transitionend", () => {
  changeButtonText(btnMusic, "🎵");
})

//Bell
let timerOn = false;
let timerCountInterval;
let timerSoundTimeout;

btnBell.addEventListener("click", () => {
  const loadingElement = document.getElementsByClassName("loading-anim")[1];
  if(timerOn) {
    clearInterval(timerCountInterval)
    clearTimeout(timerSoundTimeout)
    changeButtonText(btnBell, "🔔");
    timerOn = false;
    //Reset transition
    document.getElementsByClassName("loading-anim")[1].style.transitionDuration= "0s";
  }
  else {
    if(timerSwitchValue) {
      let timeLeft = timerValueSeconds;
      changeTransitionDuration(loadingElement, timerValueSeconds);
      changeButtonText(btnBell, secondsToDigital(timeLeft));
      timerCountInterval = setInterval(() => {
        timeLeft--;
        changeButtonText(btnBell, secondsToDigital(timeLeft));
      }, 1000)
      
      timerSoundTimeout = setTimeout(() => {
        clearInterval(timerCountInterval);
        tryPlaySFX(bellSoundHref);
      }, timerValueSeconds * 1000)

      timerOn = true;
    }
    else {
      tryPlaySFX(bellSoundHref);
    }
  }
})

btnBell.addEventListener("transitionend", () => {
  changeButtonText(btnBell, "🔔");
})
