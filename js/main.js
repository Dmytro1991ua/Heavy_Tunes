"use strict";

//import scripts from audoPlayer.js, videoPlayer.js and radio.js
import { videoPlayerInitialization } from "./videoPlayer.js";
import { audioPlayerInitialization } from "./audioPlayer.js";
import { radioPlayerInitialization } from "./radioPlayer.js";


const showContentOnClick = () => {
   const tabLinks = document.querySelectorAll(".tab-filter"),
      tabsContent = document.querySelectorAll(".tab-content"),
      welcomeTitle = document.querySelector(".welcome__heading"),
      welcomeImage = document.querySelector(".image-cover__img");
   
   //function remove active class on filter btns
   const deactivationPlayerBtn = () => {
      //remove welcoming text and image on click to a tab link
      welcomeTitle.style.display = "none";
      welcomeImage.style.display = "none";

      tabLinks.forEach(tabLink => {
         tabLink.classList.remove("active");
      });
      tabsContent.forEach(tabsContent => {
         tabsContent.classList.remove("show");
         tabsContent.classList.add("hide");
      });
   };

   const showTabContent = () => {
      tabLinks.forEach((tabLink, index) => {
         tabLink.addEventListener("click", () => {
            deactivationPlayerBtn();
            tabLink.classList.add("active");
            tabsContent[index].classList.add("show");
            tabsContent[index].classList.remove("hide");
         });
      });
   };

   showTabContent();
};



// functions call
videoPlayerInitialization();
audioPlayerInitialization();
radioPlayerInitialization();
showContentOnClick();

