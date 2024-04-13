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

    const spollers = menu.querySelectorAll('.menu-item-object-category.menu-item-has-children');

    let unlock = true;

    if (spollers.length > 0) {
      spollers.forEach((spoller) => {
        const link = spoller.firstElementChild;
        const list = link.nextElementSibling;

        if (link && list) {
          _slideUp(list, speedSpollers);

          link.addEventListener('click', (e) => {
            if (breakpoint >= window.innerWidth) {
              e.preventDefault();

              if (unlock) {
                unlock = false;

                _slideToggle(list, speedSpollers);

                if (link.classList.contains('_active')) {
                  link.classList.remove('_active');
                } else {
                  link.classList.add('_active');
                }

                menu.querySelectorAll('.menu-item-object-category.menu-item-has-children').forEach((item) => {
                  const elButton = item.firstElementChild;

                  if (elButton !== link) {
                    elButton.classList.remove('_active');
                    _slideUp(elButton.nextElementSibling, speedSpollers);
                  }
                });

                setTimeout(() => (unlock = true), speedSpollers);
              }
            }
          });
        }
      });
    }

    const childrenSpollers = menu.querySelectorAll('.menu-item-has-children');

    if (childrenSpollers.length > 0) {
      childrenSpollers.forEach((spoller) => {
        const link = spoller.firstElementChild;
        const list = link.nextElementSibling;

        if (link && list) {
          _slideUp(list, speedSpollers);

          link.addEventListener('click', (e) => {
            if (breakpoint >= window.innerWidth) {
              e.preventDefault();

              if (unlock) {
                unlock = false;

                _slideToggle(list, speedSpollers);
                link.classList.toggle('_active');

                setTimeout(() => (unlock = true), speedSpollers);
              }
            }
          });
        }
      });
    }
  }
})();
