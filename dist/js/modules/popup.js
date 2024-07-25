import { disableScroll, enableScroll } from "../utils/helpers.js  ";

function popup(popupSelector, btnsSelector) {
  const popup = document.querySelector(popupSelector),
    buttons = document.querySelectorAll(btnsSelector),
    buttonsClose = popup.querySelectorAll(".btn__close"),
    form = popup.querySelector(".form");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      popup.classList.add("overlay_active");
      disableScroll();
    });
  });

  buttonsClose.forEach((btn) => {
    btn.addEventListener("click", () => {
      closePopup();
    });
  });

  popup.addEventListener("click", (e) => {
    if (!form.contains(e.target)) {
      closePopup();
    }
  });

  function closePopup() {
    popup.classList.remove("overlay_active");
    enableScroll();
  }
}

export default popup;
