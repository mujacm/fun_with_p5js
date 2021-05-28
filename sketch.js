let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let eyerX = 0;
let eyerY = 0;

function setup() {
  createCanvas(800, 800);
  video = createCapture(VIDEO);
  video.size(400, 300);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //you will get 17 points starting from eyes to your ankle
  //console.log(poses) 
  //uncomment the above line to see the poses object
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let elX = poses[0].pose.keypoints[1].position.x;
    let elY = poses[0].pose.keypoints[1].position.y;
    let erX = poses[0].pose.keypoints[2].position.x;
    let erY = poses[0].pose.keypoints[2].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, elX, 0.5);
    eyelY = lerp(eyelY, elY, 0.5);
    eyerX = lerp(eyerX, erX, 0.5);
    eyerY = lerp(eyerY, erY, 0.5);
  }
}

function modelReady() {
  console.log('Ready.');
}

function draw() {
  image(video, 0, 0); // image of video to the canvas
  filter(GRAY) //you can change filter 
  fill(255, 66, 75);
  ellipse(noseX, noseY, 30);
  fill(54,22,215);
  ellipse(eyelX, eyelY, 40);
  fill(0,0,255);
  ellipse(eyerX, eyerY, 40);
}