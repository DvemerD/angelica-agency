function offer(tl) {
  gsap.from(".offer__item", {
    x: (i, el) => 1 - parseFloat(el.getAttribute("data-speed")),
    scrollTrigger: {
      trigger: ".offer",
      start: "top bottom",
      end: "bottom-=50% bottom",
      scrub: 1.2,
    },
  });

  gsap.from(".offer__img", {
    scale: 1.8,
    scrollTrigger: {
      trigger: ".offer",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1.9,
    },
  });

  gsap.from(".offer__model, .work__item-num", {
    y: (i, el) => 1 - parseFloat(el.getAttribute("data-speed")),
    scrollTrigger: {
      trigger: ".offer__models",
      start: "top bottom",
      scrub: 1.9,
    },
  });

  gsap.from(".offer__model img", {
    scale: 1.8,
    scrollTrigger: {
      trigger: ".offer__models",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1.9,
    },
  });
}

export default offer;
