import { _slideUp, _slideToggle } from './chunks/spollers.js';

(() => {
  const spoller = document.querySelector('.htoc__title');
  const list = document.querySelector('.htoc__itemswrap');

  let unlock = true;

  const speedSpollers = 500;

  if (spoller && list) {
    _slideUp(list, speedSpollers);

    spoller.addEventListener('click', () => {
      if (unlock) {
        unlock = false;

        _slideToggle(list, speedSpollers);

        spoller.classList.toggle('_active');

        setTimeout(() => (unlock = true), speedSpollers);
      }
    });

    const links = document.querySelectorAll('.ht_toc_list li a');
    if (links.length > 0) {
      links.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();

          const targetID = link.getAttribute('href').substring(1);

          const targetElement = document.getElementById(targetID);

          if (targetElement) {
            const offset = 100;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth',
            });
          }
        });
      });
    }
  }
})();

(() => {
  const items = document.querySelectorAll('.table-card-dropdown');
  items.forEach((item) => {
    const link = item.querySelector('div.table-card-dropdown__link');
    const close = item.querySelector('div.table-card-dropdown__top-close');
    const dropdown = item.querySelector('.table-card-dropdown__body');

    const removeClass = () => {
      const dropdowns = document.querySelectorAll('.table-card-dropdown__body');
      dropdowns.forEach((element) => {
        element.classList.remove('_active');
      });
    };

    if (link && close && dropdown) {
      link.addEventListener('click', (e) => {
        if (dropdown.classList.contains('_active')) {
          dropdown.classList.remove('_active');
        } else {
          removeClass();

          dropdown.classList.add('_active');
        }

        e.stopPropagation();
      });

      close.addEventListener('click', () => {
        removeClass();
      });

      document.addEventListener('click', () => {
        removeClass();
      });
    }
  });
})();
