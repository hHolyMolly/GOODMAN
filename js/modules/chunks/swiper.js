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

(() => {
  const slidersArr = document.querySelectorAll('.popular-table-mobile.swiper');
  const paginationArr = document.querySelectorAll('.popular-table-mobile .swiper-pagination');

  slidersArr.forEach((slider, index) => {
    new Swiper(slider, {
      grabCursor: true,
      speed: 500,
      spaceBetween: 32,
      slidesPerView: 1,

      pagination: {
        el: paginationArr[index],
        clickable: true,
      },
    });
  });
})();

(() => {
  const slidersArr = document.querySelectorAll('.table-adaptive-mobile.swiper');
  const paginationArr = document.querySelectorAll('.table-adaptive-mobile .swiper-pagination');

  slidersArr.forEach((slider, index) => {
    new Swiper(slider, {
      grabCursor: true,
      speed: 500,
      spaceBetween: 32,
      slidesPerView: 1,

      pagination: {
        el: paginationArr[index],
        clickable: true,
      },
    });
  });
})();

(() => {
  const slidersArr = document.querySelectorAll('.best-slot-machines .swiper');
  const arrowPrev = document.querySelectorAll('.best-slot-machines__arrows .swiper-button-prev');
  const arrowNext = document.querySelectorAll('.best-slot-machines__arrows .swiper-button-next');
  const paginationArr = document.querySelectorAll('.best-slot-machines .swiper-pagination');

  slidersArr.forEach((slider, index) => {
    new Swiper(slider, {
      grabCursor: true,
      speed: 500,
      spaceBetween: 8,
      slidesPerView: 2,

      navigation: {
        nextEl: arrowNext[index],
        prevEl: arrowPrev[index],
      },

      pagination: {
        el: paginationArr[index],
        clickable: true,
      },

      breakpoints: {
        899.98: {
          spaceBetween: 16,
          slidesPerView: 5,
        },

        699.98: {
          slidesPerView: 4,
        },

        551.98: {
          slidesPerView: 3,
        },
      },
    });
  });
})();

(() => {
  const slidersArr = document.querySelectorAll('.tipos-de-jogos .swiper');
  const arrowPrev = document.querySelectorAll('.tipos-de-jogos__arrows .swiper-button-prev');
  const arrowNext = document.querySelectorAll('.tipos-de-jogos__arrows .swiper-button-next');

  slidersArr.forEach((slider, index) => {
    new Swiper(slider, {
      grabCursor: true,
      speed: 500,
      spaceBetween: 8,
      slidesPerView: 1.5,

      navigation: {
        nextEl: arrowNext[index],
        prevEl: arrowPrev[index],
      },

      breakpoints: {
        899.98: {
          spaceBetween: 16,
          slidesPerView: 5,
        },

        767.98: {
          slidesPerView: 4,
        },

        599.98: {
          slidesPerView: 3,
        },

        479.98: {
          slidesPerView: 2,
        },
      },
    });
  });
})();
