function promo(tl) {
  tl.fromTo(
    ".promo__title",
    { opacity: 0, xPercent: 150 },
    { opacity: 1, xPercent: 0, duration: 1.5 },
    1
  );

  tl.fromTo(
    ".promo__descr",
    { opacity: 0, xPercent: 100 },
    { opacity: 1, xPercent: 0, duration: 1.5 },
    1.2
  );

  tl.fromTo(
    ".promo__btn",
    { opacity: 0, xPercent: 100 },
    { opacity: 1, xPercent: 0, duration: 1.5 },
    1.4
  );

  tl.to(".promo", {
    scrollTrigger: {
      trigger: ".promo",
      start: "top top",
      scrub: 1.9,
    },
    scale: 1.1,
    opacity: 0.4,
  });

  gsap.to(".promo__wrapper", {
    scrollTrigger: {
      trigger: ".promo",
      start: "top top",
      scrub: 1.9,
    },
    yPercent: -20,
    // opacity: 0,
  });
}

export default promo;
