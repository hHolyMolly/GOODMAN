(() => {
  const slidersArr = document.querySelectorAll('.step__slider.swiper');
  const paginationArr = document.querySelectorAll('.step__slider .swiper-pagination');

  slidersArr.forEach((slider, index) => {
    new Swiper(slider, {
      grabCursor: true,
      speed: 500,
      spaceBetween: 24,
      slidesPerView: 1,

      pagination: {
        el: paginationArr[index],
        clickable: true,
      },

      breakpoints: {},
    });
  });
})();

(() => {
  const slidersArr = document.querySelectorAll('.block-last-news .swiper');
  const paginationArr = document.querySelectorAll('.block-last-news .swiper-pagination');
  const arrowPrev = document.querySelectorAll('.block-last-news .swiper-button-prev');
  const arrowNext = document.querySelectorAll('.block-last-news .swiper-button-next');

  slidersArr.forEach((slider, index) => {
    new Swiper(slider, {
      grabCursor: true,
      speed: 500,
      spaceBetween: 18,
      slidesPerView: 1,

      pagination: {
        el: paginationArr[index],
        clickable: true,
      },

      navigation: {
        nextEl: arrowNext[index],
        prevEl: arrowPrev[index],
      },

      breakpoints: {
        767.98: {
          slidesPerView: 3,
        },

        479.98: {
          slidesPerView: 2,
        },
      },
    });
  });
})();
