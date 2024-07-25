function header(tl) {
  tl.fromTo(
    ".header__logo",
    { y: -60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 },
    1
  );

  tl.fromTo(
    ".header__menu li",
    { y: -60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
    1.1
  );

  tl.fromTo(
    ".header__btns",
    { y: -60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 },
    1.8
  );

  gsap.to(".header", {
    scrollTrigger: {
      trigger: ".promo",
      start: "top top",
      scrub: 1.9,
    },
    yPercent: -50,
    opacity: 0,
  });
}

export default header;
