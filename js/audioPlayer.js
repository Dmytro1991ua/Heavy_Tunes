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

   const playListArray = ["Hatebreed - Destroy Everything", "Metallica - One", "BFMV - Piece of Me", "Sabaton - Uprising"]; // an array of playlist sinc there is no backend in thsi project
   let trackIndex = 0; // variable holds an index of currently playing track

   // play and pause audio track and change tooltip depends on a state of track
   const playAudiotrack = () => {
      if (audioPlayerSong.paused || audioPlayerSong.ended) {
         audioPlayerSong.play();
         audioPlayerBtnPlay.setAttribute("data-title", "Pause (k)");
      } else {
         audioPlayerSong.pause();
         audioPlayerBtnPlay.setAttribute("data-title", "Play (k)");
      }
   };

   // run a previous track from playlist on click
   const previousTrack = () => {
      if (trackIndex !== 0) {
         trackIndex--;
      } else { // when trackIndex === 0 (first track in a list) check the length of playlist (how many trak in there)
         trackIndex = playListArray.length - 1;
      }
      loadTrack();
   };

   //run next track from a playlist on click
   const nextTrack = () => { 
      if (trackIndex === playListArray.length - 1) { // if current trackIndex === last index => back to first song
         trackIndex = 0;
      } else {
         trackIndex++;
      }
      loadTrack();
   };

   // load track by pressing prev and next btns
   const loadTrack = () => {
      const isPlaying = audioPlayerSong.paused;
      const track = playListArray[trackIndex];
  
      audioPlayerAudioTitle.textContent = track.toUpperCase(); // change a audio player title to particular track name
      audioPlayerAudioTitle.style.color = "rgb(255, 0, 0)";
      audioPlayerCover.src = `music/${track}.jpg`;
      audioPlayerCover.alt = track; // display name of a particular track as alt text for each img
      audioPlayerSong.src = `music/${track}.mp3`;

      if (isPlaying) {
         audioPlayerSong.pause();
      } else {
         audioPlayerSong.play();
      }

    // setTimeout(updateTime, 500);
   };


   // play track next track when the precious one ended;
   const runNextTrack = () => {
      nextTrack();
      audioPlayerSong.play();
   };

   //update audio progress bar, in particularly time thats passed and total time
   /*const updateAudioProggressBar = () => {
      const trackCurrentTime = audioPlayerSong.currentTime;
      const trackDuration = audioPlayerSong.duration;
      
      const progressbarValue = (trackCurrentTime / trackDuration) * 100;

   };*/

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
      audioPlayerCover.src = `music/${track}.jpg`; // change a cover of player on click (based on track)
      audioPlayerAudioTitle.style.color = "rgb(255, 0, 0)";

      if (target.classList.contains("audio-footer__btn--prev")) {
         previousTrack();
      }
      if (target.classList.contains("audio-footer__btn--next")) {
        nextTrack();
      }
   });

   audioPlayerSong.addEventListener("ended", runNextTrack);
   //audioPlayerSong.addEventListener("timeupdate", updateAudioProggressBar);

};