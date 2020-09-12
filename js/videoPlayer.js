import { addZero } from "./supportScript.js";

export const videoPlayerInitialization = () => {
   const videoPlayer = document.querySelector(".video-container__player")
   const videoBtnPlay = document.querySelector(".btn-play")
   const videoBtnStop = document.querySelector(".btn-stop")
   const videoTimePassed = document.querySelector(".video-time-passed")
   const videoProgressBar = document.querySelector(".video-container__video-progress")
   const videoTimeTotal = document.querySelector(".video-time-total")
   const videoVolume = document.querySelector(".video-container__video-volume")
   const volumeUp = document.querySelector(".volume-up")
   const videoFullscreen = document.querySelector(".video-container__video-fullscreen")

   // change icon(from play to pause) while clicking on player itself
   const changeIcon = () => {
      if (videoPlayer.paused) {
         videoBtnPlay.classList.remove("fa-pause");
         videoBtnPlay.classList.add("fa-play");

      } else {
         videoBtnPlay.classList.add("fa-pause");
         videoBtnPlay.classList.remove("fa-play");
      }
   };

   //run a video player
   const runVideoPlayer = () => {
      if (videoPlayer.paused) {
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

      changeIcon();
   };

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

   videoPlayer.addEventListener("timeupdate", () => { // listen to timeupdate event for changes on video time passed and video total time 
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
   });
   
   videoProgressBar.addEventListener("input", () => { // listen to input event on a video progress bar in order to rewind a video
      const videoDuration = videoPlayer.duration;
      const inputValue = videoProgressBar.value;

      videoPlayer.currentTime = (inputValue * videoDuration) / 100;
   });

   //videoPlayer.addEventListener("keydown", spacebarPressed);

  
};