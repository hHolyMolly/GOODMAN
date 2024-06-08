import { bodyLock, bodyUnLock } from '../functions/body_lock.js';

import { _slideUp, _slideToggle } from '../chunks/spollers.js';

(() => {
  const breakpoint = 1099.98;
  const speedSpollers = 500;

  const burger = document.querySelector('[data-header-burger]');
  const menu = document.querySelector('[data-header-menu]');

  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('_active');
      menu.classList.toggle('_active');

      if (burger.classList.contains('_active')) {
        bodyLock();
      } else {
        bodyUnLock();
      }
    });

    const spollers = menu.querySelectorAll('.menu-item-has-children');

    let unlock = true;

    if (window.innerWidth <= 1099.98) {
      if (spollers.length > 0) {
        spollers.forEach((spoller) => {
          const link = spoller.firstElementChild;
          const list = link.nextElementSibling;

          if (link && list) {
            const newArrow = document.createElement('div');
            newArrow.classList.add('arrow');

            spoller.insertBefore(newArrow, link.nextSibling);

            _slideUp(list, speedSpollers);

            newArrow.addEventListener('click', (e) => {
              if (breakpoint >= window.innerWidth) {
                e.preventDefault();

                if (unlock) {
                  unlock = false;

                  _slideToggle(list, speedSpollers);

                  if (newArrow.parentElement.classList.contains('_active')) {
                    newArrow.parentElement.classList.remove('_active');
                  } else {
                    newArrow.parentElement.classList.add('_active');
                  }

                  if (spoller.classList.contains('menu-item-object-category')) {
                    menu.querySelectorAll('.menu-item-object-category.menu-item-has-children').forEach((item) => {
                      const elButton = item.querySelector('.arrow');

                      if (elButton !== newArrow) {
                        elButton.parentElement.classList.remove('_active');
                        _slideUp(elButton.nextElementSibling, speedSpollers);
                      }
                    });
                  }

                  setTimeout(() => (unlock = true), speedSpollers);
                }
              }
            });
          }
        });
      }
    }

    document.addEventListener('click', (e) => {
      const { target } = e;

      if (target.closest('.htoc__itemswrap li')) {
        if (menu.classList.contains('_active')) {
          burger.classList.remove('_active');
          menu.classList.remove('_active');
          bodyUnLock();
        }
      }
    });
  }
})();
