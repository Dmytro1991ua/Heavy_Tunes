export const radioPlayerInitialization = () => {
   const radio = document.querySelector(".radio");
   const radioPlayerImg = document.querySelector(".radio-player__img");
   const radioPlayerTitle = document.querySelector(".radio-player__audio-title");
   const radioStationContainer = document.querySelector(".radio-stations");
   const radioStations = document.querySelectorAll(".radio-stations__item");
   const radioNavigation = document.querySelector(".radio-footer__navigation");
   const radioBtnPlay = document.querySelector(".radio-footer__btn");
   const radioVolumeBtn = document.querySelector(".radio-footer__volume-btn");
   const radioVolumeIcons = document.querySelectorAll(".radio-footer__volume-icon");
   const radioVolumeMute = document.querySelector(".radio-volume-mute");
   const radioVolumeDown = document.querySelector(".radio-volume-down");
   const radioVolumeUp = document.querySelector(".radio-volume-up");
   const radioVolumeBar = document.querySelector(".radio-footer__radio-volume");

   const audio = new Audio(); // create new audio object from function constructor to work with
   audio.type = "audio/acc";
   radioBtnPlay.disabled = true; // apply disabled to play btn at the beginning

   //change  play button image depends on a audio state
   const changeIconPlay = () => {
      if (audio.paused) {
         radio.classList.remove("play");
         radioBtnPlay.classList.add("fa-play");
         radioBtnPlay.classList.remove("fa-stop");
      } else {
         radio.classList.add("play");
         radioBtnPlay.classList.remove("fa-play");
         radioBtnPlay.classList.add("fa-stop");
      }
   };

   /*const selectRadioStation = (element) => {
      radioStations.forEach(station => {
         station.classList.remove('select');
      });
      element.classList.add("select");
   }; */

   //change audio volume by using audio volume bar
   const changeAudioVolume = () => {
      radioVolumeBar.addEventListener("input", () => {
         audio.volume = radioVolumeBar.value / 100;
      });
      audio.volume = .5; // make a audio volume 50% by default
      radioVolumeBar.value = audio.volume * 100;
   };

   //update toggle volume icons that depend on audio volume state
   const updateVolumeIcons = () => {
      radioVolumeIcons.forEach(icon => {
         icon.classList.add("hidden");
      });

      radioVolumeBtn.setAttribute("data-title", "Mute (m)");

      if (audio.muted || audio.volume === 0) {
         radioVolumeBtn.setAttribute("data-title", "Unmute (m)");
         radioVolumeMute.classList.remove("hidden");
      } else if (audio.volume > 0 && audio.volume < 0.5) {
         radioVolumeDown.classList.remove("hidden");
      } else {
         radioVolumeUp.classList.remove("hidden");
      }
   }; 

   // event listeners

   radioStationContainer.addEventListener("change", (event) => {
      radioBtnPlay.disabled = false; //  remove disabled from btn play

      const target = event.target;
      const parentOfTarget = target.closest(".radio-stations__item"); // get a parent of clicked radio station (target)

      const radioStationTitle = parentOfTarget.querySelector(".radio-stations__name").textContent; // get a name (as text) of radio station
      radioPlayerTitle.textContent = radioStationTitle; // change default radio player title to certain clicked radio staion's title

      const radioStationCover = parentOfTarget.querySelector(".radio-stations__img").src; // grab a path to a certain img and get a particular name of it
      //radioPlayerImg.src = radioStationCover;
      radioPlayerImg.src = radioStationCover;

      audio.src = target.dataset.radioStations; // apply a path to a radio (from data-radio-stations) station to a audio object
      audio.play();
      changeIconPlay();
      //selectRadioStation(parentOfTarget);

      radioBtnPlay.addEventListener("click", () => { // functionality to play and pause radio player and change tooltip as well on click to a play btn
         if (audio.paused || audio.ended) {
            audio.play();
            radioBtnPlay.setAttribute("data-title", "Pause (k)");
         } else {
            audio.pause();
            radioBtnPlay.setAttribute("data-title", "Stop (k)");
         }
         changeIconPlay();
      })
   });

   audio.addEventListener("volumechange", updateVolumeIcons);

   //functions call

   changeAudioVolume();
};