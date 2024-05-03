// Step tabs
(() => {
  const tabs = document.querySelectorAll('.step__tabs, .form-casino-ratings');

  tabs.forEach((tab) => {
    const buttons = tab.querySelectorAll('ul.step__tabs-count li, .form-casino-ratings__nav li');

    buttons.forEach((button, idx) => {
      button.addEventListener('click', () => {
        const contents = tab.querySelectorAll('.step__tabs-content, .form-casino-ratings-tabs__item');

        buttons.forEach((item) => {
          item.classList.remove('_active');
        });

        contents.forEach((item) => {
          item.classList.remove('_active');
        });

        button.classList.add('_active');
        contents[idx].classList.add('_active');
      });
    });
  });
})();
