song = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
scoreleftWrist = "";
scorerightWrist = "";

function preload() {
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}

function draw() {
    image(video, 0, 0, 600, 500);


    fill("#EE4B2B");
    stroke("#EE4B2B");
    if (scoreleftWrist > 0.1) {
        circle(leftWristX, leftWristY, 20);

        document.getElementById("songname").innerHTML = 'Dynamite'
        song1.play()
        song2.stop()
    }

    if (scorerightWrist > 0.1) {
        circle(rightWristX, rightWristY, 20);


        document.getElementById("songname").innerHTML = 'Your Eyes Tell'
        song2.play()
        song1.stop()

    }




}


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)

}

function play() {
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}

function modelLoaded() {
    console.log('PoseNet is initialised');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)

        scoreleftWrist = results[0].pose.keypoints[9].score
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY);
        scorerightWrist = results[0].pose.keypoints[10].score
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY);
    }
}