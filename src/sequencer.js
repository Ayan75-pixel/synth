import * as Tone from "tone";
const BEAT_COUNT = 8
const INSTRUMENT_COUNT = 4
class SequencerBeat { }


export const beats=[]

export class Instrument {

}

const instruments=[
new Tone.Synth({ oscillator: { type: "amsawtooth27" } }).toDestination(),
new Tone.MembraneSynth({ oscillator: { type: "amsawtooth27" } }).toDestination(),
new Tone.MembraneSynth({ oscillator: { type: "sine" } }).toDestination(),
new Tone.MembraneSynth({ oscillator: { type: "square" } }).toDestination(),
]




/**
 * thismakes abunch of divs fornotesandputsthemin a grid
 */
export function renderSequencer() {
    for (let i = 0; i < BEAT_COUNT; i++) {
        beats.push([])

        for (let j = 0; j < INSTRUMENT_COUNT; j++) {
            beats[i].push({instrument: null})
            // makethedivforthenoteand add ot to the sequencer
            let note = document.createElement("div");
            note.classList.add("seq-note");
            document.getElementById("sequencer-div").appendChild(note);

            note.onclick=handlenoteclick

            note.dataset.beat=i
            note.dataset.instrument=j

            console.log("added note")
        }
    }

    console.log(beats)
}

export function handlenoteclick(event){

    if (event.target.dataset.active == "true"){
        event.target.dataset.active=false
        event.target.classList.remove("active")
        const b= event.target.dataset.beat
        const i = event.target.dataset.instrument
        beats[b][i].instrument = null
    }
    else {
        event.target.dataset.active=true
        event.target.classList.add("active")

        // im sorry 

        const b= event.target.dataset.beat
        const i = event.target.dataset.instrument
        beats[b][i].instrument = instruments[i]
    }
}

 export function step(index){
    beats[index].forEach(function (element) {
        if (!element.instrument || element == null) {
            return
        }

        element.instrument.triggerAttackRelease("C2", "8n");
    });

    
 }

export function play() {
    let currentstep=0
    
    const repeat=(time)=>{
        step(currentstep)
        currentstep=(currentstep+1)%BEAT_COUNT
    }

    Tone.Transport.bpm.value=100
    Tone.Transport.scheduleRepeat(repeat,"8n")
       Tone.Transport.start()
}
