import { disableScroll, enableScroll } from "../utils/helpers.js  ";

function menu() {
  const menuBtn = document.querySelector(".btn-burger"),
    overlay = document.querySelector(".overlay"),
    menu = document.querySelector(".header__navigation"),
    menuLink = document.querySelectorAll(".header__menu-link");

  menuBtn.addEventListener("click", () => {
    overlay.classList.toggle("overlay_active");
    menu.classList.toggle("header__navigation_active");
    menuBtn.classList.toggle("btn-burger_open");

    if (menu.classList.contains("header__navigation_active")) {
      disableScroll();
    } else {
      enableScroll();
    }
  });

  const closeMenu = () => {
    overlay.classList.remove("overlay_active");
    menu.classList.remove("header__navigation_active");
    menuBtn.classList.remove("btn-burger_open");

    enableScroll();
  };

  overlay.addEventListener("click", closeMenu);

  menuLink.forEach((item) => {
    item.addEventListener("click", closeMenu);
  });
}

export default menu;
