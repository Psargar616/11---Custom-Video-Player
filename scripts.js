/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
// video progress
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// function play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// updating button icon
function updateButton() {
  console.log("updating button icon");
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

// volumr and speed
function handleRangeUpdate() {
  video[this.name] = this.value;
  console.log(this.name);
  console.log(this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
// to jump to a specufic time in video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
// progress bar
video.addEventListener("progress", handleProgress);


// skip  btns
skipButtons.forEach((skipbtn) => skipbtn.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

// jump to videos different time
let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    scrub(e);
  }
});

progress.addEventListener("mouseup", () => (mouseDown = false));
progress.addEventListener("mousedown", () => (mouseDown = true));

// fullscreen btn
const fullscreenElement = document.querySelector(".fullscreen");

// toggleFullScreen toggles the full screen state of the video
// If the browser is currently in fullscreen mode,
// then it should exit and vice versa.
function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    // Need this to support Safari
    document.webkitExitFullscreen();
  } else if (video.webkitRequestFullscreen) {
    // Need this to support Safari
    video.webkitRequestFullscreen();
  } else {
    video.requestFullscreen();
  }
}
