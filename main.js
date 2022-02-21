harry_theme = "";
peter_theme = "";
leftwrist_x = 0;
leftwrist_y = 0;
rightwrist_x = 0;
rightwrist_y = 0;
leftWrist_score = 0;
rightWrist_score = 0;
harry_status = "";
peter_status = "";

function preload() {
    harry_theme = loadSound("music.mp3");
    peter_theme = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 520);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 530);

    harry_status = harry_theme.isPlaying();
    peter_status = peter_theme.isPlaying();

    if(leftWrist_score > 0.2) {
        circle(leftwrist_x, leftwrist_y, 20);
        harry_theme.stop();
        if(peter_status == false) {
            peter_theme.play();
            document.getElementById("soname").innerHTML = "Song name : Peter Pan";
        }
    }

    if(rightWrist_score > 0.2) {
        circle(rightwrist_x, rightwrist_y, 20);
        peter_theme.stop();
        if(harry_status == false) {
            harry_theme.play();
            document.getElementById("soname").innerHTML = "Song name : Harry Potter";
        }
    }
}

function modelLoaded() {
    console.log("Posenet is initialized!");
}

function gotPoses(result) {
    if(result.length > 0) {
        console.log(result);

        leftwrist_x = result[0].pose.leftWrist.x;
        leftwrist_y = result[0].pose.leftWrist.y;
        rightwrist_x = result[0].pose.rightWrist.x;
        rightwrist_y = result[0].pose.rightWrist.y;

        leftWrist_score = result[0].pose.keypoints[9].score;
        rightWrist_score = result[0].pose.keypoints[10].score;
    }

}