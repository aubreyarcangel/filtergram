const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const tracker = new tracking.ObjectTracker('face');
const dogButton = document.getElementById('dog-face');
const unicornButton = document.getElementById('unicorn-spike');
// const baldButton = document.getElementById('bald-head');
const bigEyesButton = document.getElementById('big-eyes');
// const mouseEarsButton = document.getElementById('mouse-ears');
const mouthRainbowButton = document.getElementById('mouth-rainbow');


const img = new Image();
let filterX = 0;
let filterY = 0;
let filterWidth = 0;
let filterHeight = 0;

let webCamView = (x, y, width, height, src) => {
  img.src = src;
  filterX = x;
  filterY = y;
  filterWidth = width;
  filterHeight = height;
};

function dogEars () {
  webCamView(-0.6, -0.4, 2, 2, './filters/dog-face.png');
}

dogEars();


dogButton.addEventListener('click', () => {
  webCamView(-0.5, -0.4, -1, 2, './filters/dog-face.png');
});

unicornButton.addEventListener('click', () => {
  webCamView(-0.5, -0.999, 2, 2, './filters/unicorn.png');
});

// baldButton.addEventListener('click', () => {
//   webCamView(-0.5, -0.999, 1.5, 1, 'bald.png');
// });

bigEyesButton.addEventListener('click', () => {
  webCamView(-0.2, -0.2, 1.5, 1, './filters/bigeyes.png');
});

// mouseEarsButton.addEventListener('click', () => {
//   webCamView(-0.5, -0.5, 2, 2, 'mouse-ears.png');
// });

mouthRainbowButton.addEventListener('click', () => {
  webCamView(-0.2, 0.7, 1.5, 1, './filters/mouth-rainbow.png');
});

tracker.setInitialScale(4);
tracker.setStepSize(2);
tracker.setEdgesDensity(0.1);
tracking.track('#video', tracker, { camera: true });

tracker.on('track', event => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  event.data.forEach(rect => {
    context.drawImage(img, rect.x + (filterX * rect.width),
    rect.y + (filterY * rect.height),
    rect.width * filterWidth,
    rect.height * filterHeight
  );
  });
});
