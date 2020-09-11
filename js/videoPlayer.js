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


   //event listeners
   videoPlayer.addEventListener("click", runVideoPlayer);
   videoBtnPlay.addEventListener("click", runVideoPlayer);
   videoBtnStop.addEventListener("click", stopVideoPlayer);

  
};