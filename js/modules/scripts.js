import { _slideUp, _slideToggle } from './chunks/spollers.js';
// import userDevice from './functions/body_lock.js';

(() => {
  const header = document.querySelector('.header');

  document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 100) {
      header.classList.add('_scroll');
    }

    if (scrollPosition < 50) {
      header.classList.remove('_scroll');
    }
  });
})();

(() => {
  document.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('.ht_toc_list li a')) {
      e.preventDefault();

      const targetID = target.getAttribute('href').substring(1);

      const targetElement = document.getElementById(targetID);

      if (targetElement) {
        const offset = 100;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    }
  });
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

// TOC
(() => {
  const header = document.querySelector('.header');

  const wrap = document.querySelector('.page .htoc');
  const newDiv = document.createElement('div');
  newDiv.classList.add('header__htoc');
  header.appendChild(newDiv);
  newDiv.appendChild(wrap.cloneNode(true));

  if (header && wrap && newDiv) {
    const isVisible = (el) => {
      if (el.scrollLeft === 0) {
        el.classList.remove('_no-visible-first');
      } else {
        el.classList.add('_no-visible-first');
      }

      console.log(el.scrollWidth - el.scrollLeft === el.clientWidth);

      if (el.scrollWidth - el.scrollLeft === el.clientWidth) {
        el.classList.remove('_no-visible-last');
      } else {
        el.classList.add('_no-visible-last');
      }
    };

    document.querySelectorAll('.htoc__itemswrap').forEach((TOC) => {
      isVisible(TOC);
    });

    newDiv.style.display = 'none';

    (() => {
      const list = document.querySelectorAll('.htoc__itemswrap ul');
      if (list.length > 0) {
        list.forEach((TOC) => {
          const itemsReverse = Array.from(TOC.querySelectorAll('li')).reverse();

          if (TOC && itemsReverse.length > 0) {
            TOC.innerHTML = '';

            itemsReverse.forEach((item) => {
              TOC.appendChild(item);
            });
          }
        });
      }
    })();

    document.querySelectorAll('.htoc__itemswrap').forEach((TOC) => {
      TOC.addEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const delta = e.deltaY;

        TOC.scrollLeft += delta;
      });

      TOC.addEventListener('scroll', () => {
        isVisible(TOC);
        window.alert('прокрутка');
      });
    });

    window.addEventListener('scroll', () => {
      if (wrap.getBoundingClientRect().top < 60) {
        newDiv.style.display = 'block';
      } else {
        newDiv.style.display = 'none';
      }
    });

    window.addEventListener('load', () => {
      if (wrap.getBoundingClientRect().top < 60) {
        newDiv.style.display = 'block';
      } else {
        newDiv.style.display = 'none';
      }
    });
  }
})();
