import { addZero } from "./supportScript.js";

export const videoPlayerInitialization = () => {
   const videoPlayer = document.querySelector(".video-container__player"),
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
      videoFullscreen = document.querySelector(".video-container__video-fullscreen");
      
   // change icon(from play to pause) while clicking on player itself
   const changeIcon = () => {
      if (videoPlayer.paused) {
         videoBtnPlay.classList.remove("fa-pause");
         videoBtnPlay.classList.add("fa-play");
         videoBtnPlay.setAttribute("data-title", "Play (k)"); //  set tooltip on hover for play and pause btn

      } else {
         videoBtnPlay.classList.add("fa-pause");
         videoBtnPlay.classList.remove("fa-play");
         videoBtnPlay.setAttribute("data-title", "Pause (k)");
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

   //update videoVolume and disables the muted state if active
   /*const updateVideoVolume = () => {
      if (videoPlayer.muted) {
         videoBtnPlay.muted = false;
      }

      videoPlayer.volume = videoVolume.value;
   }/*

   /*const spacebarPressed = (event) => {
      if (event.type === "keydown") {
         if (event.which === 32 || event.keyCode === 32) {
            runVideoPlayer();
         }
      }
  } */


   //event listeners
   videoPlayer.addEventListener("click", runVideoPlayer);
   videoBtnPlay.addEventListener("click", runVideoPlayer);
   videoBtnStop.addEventListener("click", stopVideoPlayer);

   videoPlayer.addEventListener("timeupdate", updateVideoTime) // listen to timeupdate event for changes on video time passed and video total time 
   videoProgressBar.addEventListener("input", rewindVideo) // listen to input event on a video progress bar in order to rewind a video

   //videoPlayer.addEventListener("keydown", spacebarPressed);

   videoFullscreen.addEventListener("click", () => { // making video player fullscreen on click  to a btn
      videoPlayer.requestFullscreen();
   });

   videoPlayer.addEventListener("volumechange", updateVolumeIcon);

   //videoVolume.addEventListener("input", updateVideoVolume);


   // function calls
   increaseVolume();

};

