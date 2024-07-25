import about from "./animation/about.js";
import header from "./animation/header.js";
import models from "./animation/models.js";
import offer from "./animation/offer.js";
import promo from "./animation/promo.js";
import title from "./animation/title.js";
import whyUs from "./animation/why-us.js";
import form from "./modules/form.js";
import menu from "./modules/menu.js";
import popup from "./modules/popup.js";
import scrollToAnchor from "./modules/scrollToAnchor.js";
import slider from "./modules/slider.js";

window.addEventListener("DOMContentLoaded", () => {
  const screenWidth = window.innerWidth;
  slider(".reviews-swiper");
  slider(".articles-swiper");
  menu();
  scrollToAnchor();
  popup(".overlay-popup", "button[data-popup]");
  popup(".overlay-popup-review", "button[data-popup-review]");
  form(".form__send");
  form(".form__review");

  if (screenWidth > 768) {
    luxy.init();
  }

  // Animation
  try {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    if (screenWidth > 768) {
      header(tl);
      title(tl);
      promo(tl);
      whyUs(tl);
      about(tl);
      models(tl);
      offer(tl);
    }
  } catch (error) {}
});
