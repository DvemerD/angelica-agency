import form from "./modules/form.js";
import menu from "./modules/menu.js";
import popup from "./modules/popup.js";
import scrollToAnchor from "./modules/scrollToAnchor.js";
import slider from "./modules/slider.js";

window.addEventListener("DOMContentLoaded", () => {
  slider(".reviews-swiper");
  slider(".articles-swiper");
  menu();
  scrollToAnchor();
  popup(".overlay-popup", "button[data-popup]");
  popup(".overlay-popup-review", "button[data-popup-review]");
  form(".form__send");
  form(".form__review");
});
