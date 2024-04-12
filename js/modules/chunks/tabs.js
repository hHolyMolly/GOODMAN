// Step tabs
(() => {
  const tabs = document.querySelectorAll('.step__tabs');

  tabs.forEach((tab) => {
    const buttons = tab.querySelectorAll('ul.step__tabs-count li');

    buttons.forEach((button, idx) => {
      button.addEventListener('click', () => {
        const contents = tab.querySelectorAll('.step__tabs-content');

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
