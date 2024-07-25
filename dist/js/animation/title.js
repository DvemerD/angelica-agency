function title() {
  gsap.utils.toArray(".title").forEach((title) => {
    gsap.fromTo(
      title,
      {
        opacity: 0,
        yPercent: -80,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1.1,
        },
      }
    );
  });
}

export default title;
