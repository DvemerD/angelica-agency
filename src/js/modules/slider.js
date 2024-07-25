function slider(selector) {
  const swiper = new Swiper(selector, {
    slidesPerView: "auto",
    spaceBetween: 25,
    keyboard: true,
    pagination: {
      el: ".swiper-pagination",
    },
  });
}

export default slider;
