function whyUs(tl) {
  gsap.from(".why-us__item:first-of-type", {
    scrollTrigger: {
      trigger: ".why-us",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1,
    },
    x: "-70%",
    opacity: 0,
    duration: 1,
  });
  
  gsap.from(".why-us__item:last-of-type", {
    scrollTrigger: {
      trigger: ".why-us",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1,
    },
    x: "70%",
    opacity: 0,
    duration: 1,
  });
}

export default whyUs;
