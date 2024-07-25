function slider(selector) {
  const swiper = new Swiper(selector, {
    slidesPerView: "auto",
    spaceBetween: 25,
    mousewheel: true,
    keyboard: true,
    pagination: {
      el: ".swiper-pagination",
    },
  });
}

export default slider;
