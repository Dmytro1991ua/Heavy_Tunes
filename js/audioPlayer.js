export const audioPlayerInitialization = () => {
   const audio = document.querySelector(".audio"), // container for all audio player elements
      audioPlayer = document.querySelector(".audio-player"),
      audioPlayerCover = document.querySelector(".audio-player__img"),
      audioPlayerAudioTitle = document.querySelector(".audio-player__audio-title"),
      audioPlayerSong = document.querySelector(".audio-player__song"),
      audioPlayerNavigation = document.querySelector(".audio-footer__navigation"),
      audioPlayerBtnPlay = document.querySelector(".audio-footer__btn--play"),
      audioPlayerTimePassed = document.querySelector(".audio-footer__audio-time--passed"),
      audioPlayerProgressBar = document.querySelector(".audio-footer__audio-progress"),
      audioPlayerTotalTime = document.querySelector(".audio-footer__audio-time--total"),
      volumeBtns = document.querySelectorAll(".audio-footer__volume-btn"),
      volumeMute = document.querySelector(".volume-mute"),
      volumeDown = document.querySelector(".volume-down"),
      volumeUp = document.querySelector(".volume-up"),
      aduioPlayerVolumeBar = document.querySelector(".audio-footer__audio-volume");

   const playListArray = ["destroy everthing", "one", "piece of me", "uprising"]; // an array of playlist sinc there is no backend in thsi project
   let trackIndex = 0; // variable holds an index of currently playing track

   // play and pause audio track and change tooltip depends on a state of track
   const playAudiotrack = () => {
      if (audioPlayerSong.paused || audio.ended) {
         audioPlayerSong.play();
         audioPlayerBtnPlay.setAttribute("data-title", "Pause (k)");
      } else {
         audioPlayerSong.pause();
         audioPlayerBtnPlay.setAttribute("data-title", "Play (k)");
      }
   };


   //event listeners
   audioPlayerNavigation.addEventListener("click", (event) => {
      const target = event.target;

      if (target.classList.contains('audio-footer__btn--play')) { // click on btn play
         playAudiotrack();
         audio.classList.toggle("play");
         audioPlayerBtnPlay.classList.toggle("fa-play");
         audioPlayerBtnPlay.classList.toggle("fa-pause"); 
      }

      const track = playListArray[trackIndex]; // holds an index of a specific track from array with playlist
      audioPlayerAudioTitle.textContent = track.toUpperCase(); // change a audio player title to particular track name
      audioPlayerAudioTitle.style.color = "rgb(255, 0, 0)";

      if (target.classList.contains("audio-footer__btn--prev")) {
         //previousTrack();
      }
   });
};