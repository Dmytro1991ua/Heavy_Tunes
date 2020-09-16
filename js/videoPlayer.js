import { addZero } from "./supportScript.js";

export const videoPlayerInitialization = () => {
   const videoPlayer = document.querySelector(".video-container__player"),
      videoContainerNavigation = document.querySelector(".video-container__navigation"),
      videoBtnPlay = document.querySelector(".btn-play"),
      videoBtnStop = document.querySelector(".btn-stop"),
      videoTimePassed = document.querySelector(".video-time-passed"),
      videoProgressBar = document.querySelector(".video-container__video-progress"),
      videoTimeTotal = document.querySelector(".video-time-total"),
      videoVolume = document.querySelector(".video-container__video-volume"),
      videoVolumeIcons = document.querySelectorAll(".video-container__volume-icon"),
      volumeBtn = document.querySelector(".video-container__volume-btn"),
      volumeUp = document.querySelector(".volume-up"),
      volumeDown = document.querySelector(".volume-down"),
      volumeMute = document.querySelector(".volume-mute"),
      videoFullscreen = document.querySelector(".video-container__video-fullscreen"),
      videoPlaybackAnimation = document.querySelector(".video-playback-animation"),
      videoPlaybackAnimationIconPlay = document.querySelector(".playback-play"),
      videoPlaybackAnimationIconPause = document.querySelector(".playback-pause");


   const videoWorks = !!document.createElement('video').canPlayType;
   if (videoWorks) {
      videoPlayer.controls = false; // hide original video player's controls
      videoContainerNavigation.classList.remove('hidden');
   }

   // change icon(from play to pause) while clicking on player itself
   const changeIcon = () => {
      if (videoPlayer.paused) {
         videoBtnPlay.classList.remove("fa-pause");
         videoBtnPlay.classList.add("fa-play");
         videoBtnPlay.setAttribute("data-title", "Play (k)"); //  set tooltip on hover for play and pause btn
         videoPlaybackAnimationIconPlay.classList.add("hidden"); // add and remove hidden class on playback animation icons while clicking the btns play or pause
         videoPlaybackAnimationIconPause.classList.remove("hidden");

      } else {
         videoBtnPlay.classList.add("fa-pause");
         videoBtnPlay.classList.remove("fa-play");
         videoBtnPlay.setAttribute("data-title", "Pause (k)");
         videoPlaybackAnimationIconPause.classList.add("hidden");
         videoPlaybackAnimationIconPlay.classList.remove("hidden");
      }
   };

   //run a video player
   const runVideoPlayer = () => {
      if (videoPlayer.paused || videoPlayer.ended) {
         videoPlayer.play();
      } else {
         videoPlayer.pause();
      }
      changeIcon();
   };

   //stop video player
   const stopVideoPlayer = () => {
      videoPlayer.pause();
      videoPlayer.currentTime = 0; // reset playing time to 0
      videoPlayer.setAttribute("data-title", "Stop (k)");

      changeIcon();
   };

   // updated vido time passed and video time total
   const updateVideoTime = () => {
      const currentVideoTime = videoPlayer.currentTime;
      const videoDuration = videoPlayer.duration;

      //round seconds and minutes for a current time of playing video
      let minutesPassed = Math.floor(currentVideoTime / 60);
      let secondsPassed = Math.floor(currentVideoTime % 60);

      //round seconds and minutes for a total time of playing video
      let minutesTotal = Math.floor(videoDuration / 60);
      let secondsTotal = Math.floor(videoDuration % 60);

      //change value of video progress bar (input)
      videoProgressBar.value = (currentVideoTime / videoDuration) * 100;

      videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
      videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
   };

   // rewind video by using video progress bar
   const rewindVideo = () => {
      const videoDuration = videoPlayer.duration;
      const inputValue = videoProgressBar.value;

      videoPlayer.currentTime = (inputValue * videoDuration) / 100;
   }

   // increase video volume
   const increaseVolume = () => {
      videoVolume.addEventListener("input", () => { // listen to an input event on video volume bar to change a volume of a video
         videoPlayer.volume = videoVolume.value / 100;
      });

      videoPlayer.volume = .5; // make it 50% volume before video starts playing
      videoVolume.value = videoPlayer.volume * 100;
   };

   // update volume icon depends on a state of of video volume
   const updateVolumeIcon = () => {
      videoVolumeIcons.forEach(icon => {
         icon.classList.add("hidden");
      });

      volumeBtn.setAttribute("data-title", "Mute (m)");
      if (videoPlayer.muted || videoPlayer.volume === 0) {
         volumeMute.classList.remove("hidden");
         volumeBtn.setAttribute("data-title", "Unmute (m)");
      } else if (videoPlayer.volume > 0 && videoPlayer.volume <= 0.5) {
         volumeDown.classList.remove("hidden");
      } else {
         volumeUp.classList.remove("hidden");
      }
   };

   // mute or unmute a video by clicking on the volume btn
   const toggleVolumeBtn = () => {
      videoPlayer.muted = !videoPlayer.muted; // toggle mute state of video (if ture => false and vise versa)

      if (videoPlayer.muted) {
         videoVolume.setAttribute("data-volume", videoVolume.value);
         videoVolume.value = 0
      } else {
         videoVolume.value = videoVolume.dataset.volume;
      }
   };

   // animatePlayback  to animate play and pause btns on click to a video player
   const animatePlayback = () => {
      videoPlaybackAnimation.animate([ // animate method takes in an array of keyframe objects and an options object (can control the duration of the animation amongst other things.)
         {
            opacity: 1,
            transform: "scale(1)",
         },
         {
            opacity: 0,
            transform: "scale(1.3)",
         }], {
         duration: 500,
      });

   };

   // toggle a fullscreen  state of the video
   const toggleFullScreen = () => {
      if (
         document.fullscreenElement ||
         document.webkitFullscreenElement ||
         document.mozFullScreenElement ||
         document.msFullscreenElement
      ) { // If the browser is currently in fullscreen mode
         document.exitFullscreen; // exit fullscreen
      } else {
         videoPlayer.requestFullscreen(); // add fullscreen to a video player 
      }
   };
   // Detect press of spacebar or enter keys when play or pause video player and ArrowLeft and ArrowRight to rewind a vido for 5s
   const detectKeypress = (event) => {
      switch (event.keyCode) {
         case 32: // spacebar key
            runVideoPlayer();
            break;
         case 13: // enter key
            runVideoPlayer();
            break;
         case 37: // Key left(Arrow left to rewind(5s) video back by pressing a key)
            videoPlayer.currentTime -= 5;
            break;
         case 39: // Key right(Arrow Right to rewind video forward by pressing a key)
            videoPlayer.currentTime += 5;
            break;
         default:
            return;
      }
   };


   //event listeners

   // play/stop video
   videoPlayer.addEventListener("click", runVideoPlayer);
   videoBtnPlay.addEventListener("click", runVideoPlayer);
   videoBtnStop.addEventListener("click", stopVideoPlayer);

   volumeBtn.addEventListener("click", toggleVolumeBtn);
   videoPlayer.addEventListener("click", animatePlayback);
   videoFullscreen.addEventListener("click", toggleFullScreen) // making video player fullscreen on click  to a btn

   videoPlayer.addEventListener("timeupdate", updateVideoTime) // listen to timeupdate event for changes on video time passed and video total time 
   videoProgressBar.addEventListener("input", rewindVideo) // listen to input event on a video progress bar in order to rewind a video

   videoPlayer.addEventListener("volumechange", updateVolumeIcon);

   window.addEventListener("keydown", detectKeypress);


   // function calls
   increaseVolume();

}


