import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import * as Tone from "tone";
import { play, renderSequencer } from './sequencer';



document.querySelector('#app').innerHTML = `
  <div>

    <div class="top"> 
      <div class ="effects">
        <div class="effectModule">
          <p>DISTORTION</p>
          <input type="range" id="distRange"/>
        </div>
        <div class="effectModule">
          <p>PITCH SHIFT</p>
          <input type="range" id="pitchRange" min="-100" max="100" />
        </div>
          <div class="effectModule">
          <p>Chorus</p>
          <input type="range" id="chorusRange" min="1" max="16" />
        </div>
          <p>octave</p>
          <input type="range" id="octaveRange" min="-6" max="6" value="0" />
        </div>

        <div id ="sequencer-div">
        </div>

        <button id ="play-button">Play</button>
      </div>
    </div>
     

    <div class="piano">
    </div>
  </div>
`

let octave = 0

function updateDist(dist, value) {
  dist.set({ distortion: value })

}
function updatePitch(Pitch, value) {
  Pitch.set({ pitch: value })

}
function updateChorus(Chorus, value) {
  Chorus.set({ bits: value })

}

const synth = new Tone.MonoSynth({ oscillator: { type: "amsawtooth27" } }).toDestination();
const dist = new Tone.Distortion(15).toDestination()
synth.connect(dist)

const pitch = new Tone.PitchShift(5).toDestination()
synth.connect(pitch)

const chorus = new Tone.BitCrusher(1).toDestination()
synth.connect(chorus)

const distRange = document.getElementById("distRange")
distRange.oninput = function () {
  updateDist(dist, this.value)
}
const pitchRange = document.getElementById("pitchRange")
pitchRange.oninput = function () {
  updatePitch(pitch, this.value)
}
const chorusRange = document.getElementById("chorusRange")
chorusRange.oninput = function () {
  updateChorus(chorus, this.value)
}

const octaveRange = document.getElementById("octaveRange")
octaveRange.oninput = function () {
  octave = this.value
}
// KEYBOARD : TONE  

// const LFO=new Tone.LFO("10",-2, 3)
// LFO.connect(pitch)
const keymap = {
  "a": { note: "C", octave: 1 },
  "w": { note: "Db", octave: 1 },
  "e": { note: "Eb", octave: 1 },
  "s": { note: "D", octave: 1 },
  "d": { note: "E", octave: 1 },
  "f": { note: "F", octave: 1 },
  "t": { note: "Gb", octave: 1 },

  "g": { note: "G", octave: 1 },
  "y": { note: "Ab", octave: 1 },

  "h": { note: "A", octave: 1 },
  "u": { note: "Bb", octave: 1 },

  "j": { note: "B", octave: 1 },
  "k": { note: "C", octave: 2 },
  "o": { note: "Db", octave: 2 },

  "l": { note: "D", octave: 2 },
  "p": { note: "Eb", octave: 2 },

  ";": { note: "E", octave: 2 },

}





function Createkeys() {

  const keys = ["a", "w", "s", "e", "d", "f", "t", "g", "y", "h", "u", "j", "k", "o", "l", "p", ";"];

  const black = ["w", "e", "t", "y", "u", 'o', 'p']

  //get class with piano 
  // creat3 keys
  for (let i = 0; i < keys.length; i++) {
    let key = document.createElement("div");
    key.dataset.key = keys[i]


    key.classList.add("piano-key")

    console.log(keys[i])
    console.log(keys[i] in black)
    if (black.includes(keys[i])) {
      console.log('not here')
      key.classList.add("black")
    }


    document.getElementsByClassName("piano").item(0).appendChild(key)
  }



  document.addEventListener("keydown", (kb) => {
    const keyElement = document.querySelector(`.piano-key[data-key="${kb.key}"]`)
    if (true) {
      keyElement.classList.add("active")
      const now = Tone.now();

      console.log(`${keymap[kb.key].note}${Number(keymap[kb.key].octave) + Number(octave)}`)
      synth.triggerAttack(`${keymap[kb.key].note}${Number(keymap[kb.key].octave) + Number(octave)}`, now)


    }
  })



  document.addEventListener("keyup", (kb) => {
    const keyElement = document.querySelector(`.piano-key[data-key="${kb.key}"]`)
    if (keyElement) {
      keyElement.classList.remove("active")
      const now = Tone.now();
      synth.triggerRelease(now)


    }
  })

};

document.querySelector("button")?.addEventListener("click", async () => {
  await Tone.start();
})
document.getElementById("play-button").addEventListener("click", ()=> {
  play();
})
Createkeys()
renderSequencer(8)