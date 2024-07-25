export function disableScroll() {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = scrollBarWidth + "px";
  document.body.style.overflow = "hidden";
}

export function enableScroll() {
  document.body.style.paddingRight = "";
  document.body.style.overflow = "auto";
}
