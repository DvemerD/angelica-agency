function about(tl) {
  gsap.from(".about__images img", {
    scrollTrigger: {
      trigger: ".about",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1.3,
    },
    opacity: 0,
    x: -100,
    duration: 1.5,
    ease: "power2.out",
    stagger: 0.3,
  });

  gsap.from(".about__content", {
    scrollTrigger: {
      trigger: ".about",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1,
    },
    xPercent: 70,
    opacity: 0,
    duration: 1,
  });
}

export default about;
