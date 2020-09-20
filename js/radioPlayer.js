export const radioPlayerInitialization = () => {
   const radio = document.querySelector(".radio");
   const radioPlayerImg = document.querySelector(".radio-player__img");
   const radioPlayerTitle = document.querySelector(".radio-player__audio-title");
   const radioStationContainer = document.querySelector(".radio-stations");
   const radioStations = document.querySelectorAll(".radio-stations__item");
   const radioNavigation = document.querySelector(".radio-footer__navigation");
   const radioBtnPlay = document.querySelector(".radio-footer__btn");
   const radioVolumeBtn = document.querySelector(".radio-footer__volume-btn");
   const radioVolumeMute = document.querySelector(".radio-volume-mute");
   const radioVolumeDown = document.querySelector(".radio-volume-down");
   const radioVolumeUp = document.querySelector(".radio-volume-up");
   const radioVolumeBar = document.querySelector(".radio-footer__radio-volume");

   const audio = new Audio(); // create new audio object from function constructor to work with
   audio.type = "audio/acc";
   radioBtnPlay.disabled = true; // apply disabled to play btn at the beginning

   //play and pause radio player
   const playRadioStation = () => {
      if (audio.paused || audio.ended) {
         audio.play();
         radioBtnPlay.setAttribute("data-title", "Pause (k)");
      } else {
         audio.pause();
         radioBtnPlay.setAttribute("data-title", "Play (k)");
      }
   };

   radioBtnPlay.addEventListener("click", playRadioStation);

   radioStationContainer.addEventListener("change", (event) => {
      radioBtnPlay.disabled = false; //  remove disabled from btn play

      const target = event.target;
      const parentOfTarget = target.closest(".radio-stations__item"); // get a parent of clicked radio station (target)
      
      const radioStationTitle = parentOfTarget.querySelector(".radio-stations__name").textContent; // get a name (as text) of radio station
      radioPlayerTitle.textContent = radioStationTitle; // change default radio player title to certain radio staion's title

      const radioStationCover = parentOfTarget.querySelector(".radio-stations__img").src; // grab a path to a certain img and get a particular name of it
      //radioPlayerImg.src = radioStationCover;
      radioPlayerImg.src = radioStationCover;

   });
};