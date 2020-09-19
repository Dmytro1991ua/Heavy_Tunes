import { addZero } from "./supportScript.js";

export const audioPlayerInitialization = () => {
   const audio = document.querySelector(".audio"), // container for all audio player elements
      audioPlayerCover = document.querySelector(".audio-player__img"),
      audioPlayerAudioTitle = document.querySelector(".audio-player__audio-title"),
      audioPlayerSong = document.querySelector(".audio-player__song"),
      audioPlayerNavigation = document.querySelector(".audio-footer__navigation"),
      audioPlayerBtnPlay = document.querySelector(".audio-footer__btn--play"),
      audioProgressBarTiming = document.querySelector(".audio-footer__audio-progress-timing"),
      audioPlayerTimePassed = document.querySelector(".audio-footer__audio-time--passed"),
      audioPlayerProgressBar = document.querySelector(".audio-footer__audio-progress"),
      audioPlayerTotalTime = document.querySelector(".audio-footer__audio-time--total"),
      audioVolumeIcons = document.querySelectorAll(".audio-footer__volume-icon"),
      volumeBtn = document.querySelector(".audio-footer__volume-btn"),
      volumeMute = document.querySelector(".audio-volume-mute"),
      volumeDown = document.querySelector(".audio-volume-down"),
      volumeUp = document.querySelector(".audio-volume-up"),
      audioPlayerVolumeBar = document.querySelector(".audio-footer__audio-volume");

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
   const updateAudioProggressBar = () => {
      const trackCurrentTime = audioPlayerSong.currentTime;
      const trackDuration = audioPlayerSong.duration;

      const progressbarValue = (trackCurrentTime / trackDuration) * 100;

      audioProgressBarTiming.style.width = `${progressbarValue}%`; // increase gradualy the width of audio progress bar

      let minutesPassed = Math.floor(trackCurrentTime / 60) || "0"; // adding "0" to avoid NaN as a total playing time when play next song
      let secondsPassed = Math.floor(trackCurrentTime % 60) || "0";

      let minutesTotal = Math.floor(trackDuration / 60) || "0";
      let secondsTotal = Math.floor(trackDuration % 60) || "0";

      audioPlayerTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
      audioPlayerTotalTime.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
   };

   //rewind audio track by using audio progress bar (input)
   const rewindAudioTrack = (event) => {
      const clickCoordinates = event.offsetX; // get a coordinates where was a click on progress bar
      const progressBarAllWidth = audioPlayerProgressBar.clientWidth; // get full widt of a progress bar 

      const progress = (clickCoordinates / progressBarAllWidth) * audioPlayerSong.duration;
      audioPlayerSong.currentTime = progress;
   };

   // change a volume of a track by using audio volume bar
   const increaseTrackVolume = () => {
      audioPlayerVolumeBar.addEventListener("input", () => {
         audioPlayerSong.volume = audioPlayerVolumeBar.value / 100;
      });
      audioPlayerSong.volume = .5; // make volume of 50% at the beginning;
      audioPlayerVolumeBar.value = audioPlayerSong.volume * 100;
   };

   // update volume icon depends on a state of a track
   const updateVolumeIcon = () => {
      audioVolumeIcons.forEach(icon => {
         icon.classList.add("hidden");
      });

      volumeBtn.setAttribute("data-title", "Mute (m)");

      if (audioPlayerSong.muted || audioPlayerSong.volume === 0) {
         volumeMute.classList.remove("hidden");
         volumeBtn.setAttribute("data-title", "Unmute (m)");
      } else if (audioPlayerSong.volume > 0 && audioPlayerSong.volume <= .5) {
         volumeDown.classList.remove("hidden");
      } else {
         volumeUp.classList.remove("hidden");
      }
   };

   // change mute state of a track on click to a volume icon
   const toggleMuteState = () => {
      audioPlayerSong.muted = !audioPlayerSong.muted; // toggle mute state of audio (if ture => false and vise versa)
      if (audioPlayerSong.muted) {
         audioPlayerVolumeBar.setAttribute("data-volume", audioPlayerVolumeBar.value); // when audio on pause data-volume holds a previous value of volume bar (like 30% volume)
         audioPlayerVolumeBar.value = 0;
      } else {
         audioPlayerVolumeBar.value = audioPlayerVolumeBar.dataset.volume; // if audio plays get a value from previous value of volume bar (like 30%) and continue playing form that point
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
   audioPlayerSong.addEventListener("timeupdate", updateAudioProggressBar);
   audioPlayerProgressBar.addEventListener("click", rewindAudioTrack);
   audioPlayerSong.addEventListener("volumechange", updateVolumeIcon);
   volumeBtn.addEventListener("click", toggleMuteState);

   // functions call
   increaseTrackVolume();
};