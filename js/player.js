"use strict";

var player = document.querySelector(".video__player");
var popup = document.querySelector(".popup");
var btnReg = document.querySelector(".popup__form");
popup.style.display = "none";
var isReg = false;

player.addEventListener("timeupdate", function () {
    if (player.currentTime >= 5 && !isReg) {
        player.pause();
        popup.style.display = "block";
    }
});

btnReg.addEventListener("submit", function (e) {
    e.preventDefault();
    popup.style.display = "none";
    player.play();
    isReg = true;
});



