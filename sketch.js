
w =  640;
h =  480;
let video;
let poseNet;
let poses = [];

const volume = -15;

function setup() {
createCanvas(w, h);
video = createCapture(VIDEO);
video.size(w, h);
video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', function (results) {
    poses = results;
  });
 

  Tone.Master.volume.value = volume;

  // Setup a synth with ToneJS
 synth = new Tone.Synth({
    "oscillator" : {
      "type": 'sawtooth'
    }
  });

  synth.connect(Tone.Master);

}

function draw() {
  frameRate(60);
  image(video, 0,0, width, height); 
  video.hide();
  strokeWeight(5);
  for(let i = 0; i < poses.length; i++) {
  
    for(let j = 0; j < 1; j++) {
      let keypoint = poses[i].pose.keypoints[j];
      if (keypoint.score > 0.1) {
      fill(255, 0, 0);
       ellipse(keypoint.position.x, keypoint.position.y, 30, 30);
       console.log(keypoint.position.x);
       if(keypoint.position.x < width/3){
       
        const notes = ['C', 'Db', 'F', 'Gb', 'Bb'];
        const octaves = [2];
        const octave = random(octaves);
        const note = random(notes);
        synth.triggerAttackRelease(note + octave, '8n');
        noFill()
        stroke(255);
        rect(0,0, width/3, height)
        ellipse(keypoint.position.x, keypoint.position.y, 50, 50);
       } else if(keypoint.position.x > width * 0.66){

        const notes2 = ['D', 'Eb', 'F', 'F#', 'g'];
        const octaves2 = [ 2];
        const octave2 = random(octaves2);
        const note2 = random(notes2);
        synth.triggerAttackRelease(note2 + octave2, '8n');
        noFill()
        stroke(255);
        rect(width * 0.66,0, width /3, height)
        ellipse(keypoint.position.x, keypoint.position.y, 50, 50);

        } else if(keypoint.position.y < height/3){
      
          const notes3 = ['C#', 'D', 'E', 'G#', 'C#'];
          const octaves3 = [ 4 ];
          const octave3 = random(octaves3);
          const note3 = random(notes3);
          synth.triggerAttackRelease(note3 + octave3, '8n');
          noFill()
          stroke(255);
          rect(0,0, width , height/3)
          ellipse(keypoint.position.x, keypoint.position.y, 50, 50);
        
        } else if(keypoint.position.y >height * 0.66){
      
          const notes3 = ['C#', 'D', 'E', 'G#', 'C#'];
          const octaves3 = [ 1 ];
          const octave3 = random(octaves3);
          const note3 = random(notes3);
          synth.triggerAttackRelease(note3 + octave3, '8n');
          noFill()
          stroke(255);
          rect(0,height * 0.66 ,width , height * 0.66)
          ellipse(keypoint.position.x, keypoint.position.y, 50, 50);
       } 
       else {
        noFill()
        stroke(255);
        rect(width/3 ,height/3, width /3, height/3)
       }
      }
    }
  }
  noStroke();
 
}

function modelLoaded() {
  print('model loaded'); 
}

