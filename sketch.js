let facemeshModel;
let video;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Load the facemesh model
  facemeshModel = ml5.facemesh(video, modelReady);

  // Listen for predictions
  facemeshModel.on("predict", (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  background(220);

  // Draw the video feed
  image(video, 0, 0, width, height);

  // Draw the facemesh lines
  drawFacemesh();
}

function drawFacemesh() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // List of points to connect with lines
    const points = [
      409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405,
      321, 375, 291, 76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304,
      303, 302, 11, 72, 73, 74, 184,
    ];

    stroke(255, 0, 0); // Red color
    strokeWeight(15); // Line thickness
    noFill();

    beginShape();
    for (let i = 0; i < points.length; i++) {
      const [x, y] = keypoints[points[i]];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
