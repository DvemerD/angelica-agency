function models(tl) {
  gsap.from(".models__item", {
    y: (i, el) => 1 - parseFloat(el.getAttribute("data-speed")),
    scrollTrigger: {
      trigger: ".models",
      start: "top bottom",
      scrub: 1.2,
    },
  });

  gsap.from(".models__item-img", {
    scale: 1.6,
    scrollTrigger: {
      trigger: ".models",
      start: "top bottom",
      scrub: 1.9,
    },
  });
}

export default models;
