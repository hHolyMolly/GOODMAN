import { _slideUp, _slideToggle } from './chunks/spollers.js';
import userDevice from './functions/is_device.js';
import { popupOpen } from './chunks/modals.js';

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

  const wrap = document.querySelector('.ez-toc-v2_0_66_1.counter-hierarchy.ez-toc-counter.ez-toc-grey.ez-toc-container-direction');
  if (wrap) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('header__htoc');

    header.appendChild(newDiv);
    newDiv.appendChild(wrap.cloneNode(true));

    newDiv.querySelector('.ez-toc-v2_0_66_1.counter-hierarchy.ez-toc-counter.ez-toc-grey.ez-toc-container-direction').removeAttribute('id');

    if (header && wrap && newDiv) {
      const isVisible = (el) => {
        if (el.scrollLeft === 0) {
          el.classList.remove('_no-visible-first');
        } else {
          el.classList.add('_no-visible-first');
        }

        if (el.scrollWidth - el.scrollLeft - 15 <= el.clientWidth) {
          el.classList.remove('_no-visible-last');
        } else {
          el.classList.add('_no-visible-last');
        }
      };

      document.querySelectorAll('.ez-toc-v2_0_66_1.counter-hierarchy.ez-toc-counter.ez-toc-grey.ez-toc-container-direction nav').forEach((TOC) => {
        isVisible(TOC);
      });

      newDiv.style.display = 'none';

      (() => {
        const list = document.querySelectorAll('.ez-toc-v2_0_66_1.counter-hierarchy.ez-toc-counter.ez-toc-grey.ez-toc-container-direction nav ul');
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

      document.querySelectorAll('.ez-toc-v2_0_66_1.counter-hierarchy.ez-toc-counter.ez-toc-grey.ez-toc-container-direction nav').forEach((TOC) => {
        TOC.addEventListener('wheel', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const delta = e.deltaY;

          TOC.scrollLeft += delta;
        });

        TOC.addEventListener('scroll', () => {
          isVisible(TOC);
        });

        let isDown = false;
        let startX;
        let scrollLeft;

        TOC.addEventListener('mousedown', (e) => {
          isDown = true;
          TOC.classList.add('active');
          startX = e.pageX - TOC.offsetLeft;
          scrollLeft = TOC.scrollLeft;
        });

        TOC.addEventListener('mouseleave', () => {
          isDown = false;
          TOC.classList.remove('active');
        });

        TOC.addEventListener('mouseup', () => {
          isDown = false;
          TOC.classList.remove('active');
        });

        TOC.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - TOC.offsetLeft;
          const walk = (x - startX) * 1.5; // Увеличиваем значение для ускорения прокрутки
          TOC.scrollLeft = scrollLeft - walk;
        });

        // Отключаем стандартное поведение браузера для ссылок при перетаскивании
        document.addEventListener('dragstart', (e) => {
          const { target } = e;

          if (target.closest('a')) {
            e.preventDefault();
          }
        });
      });

      const showFunc = () => {
        const sidebarBox = document.querySelector('.sidebar-box_bottom');

        if (wrap.getBoundingClientRect().top < 60) {
          newDiv.style.display = 'block';
          sidebarBox.classList.add('_scroll');
        } else {
          newDiv.style.display = 'none';
          sidebarBox.classList.remove('_scroll');
        }
      };

      window.addEventListener('scroll', showFunc);
      window.addEventListener('load', showFunc);
    }
  }
})();

(() => {
  const tablePCItems = document.querySelectorAll('.table-adaptive-pc');
  tablePCItems.forEach((tablePC) => {
    const tableItems = tablePC.querySelectorAll('.table-adaptive-pc__item');
    const tableHeader = tablePC.querySelector('.table-adaptive-pc__header');

    const length = tableHeader.children.length;

    tableItems.forEach((item) => {
      if (length % 2 !== 0) {
        item.style.width = `${100 / length + 0.3}%`;
        item.style.flexBasis = `${100 / length + 0.3}%`;

        return;
      }

      item.style.width = `${100 / length}%`;
      item.style.flexBasis = `${100 / length}%`;
    });
  });
})();

(() => {
  const items = ['popup-mini-tables', 'popup-card-bonuses'];

  if (userDevice.any()) {
    window.addEventListener('load', () => {
      const popups = document.querySelectorAll('.popup');
      popups.forEach((popup) => {
        const classContains = items.some((className) => popup.classList.contains(className));
        if (classContains) {
          const delay = (popup.getAttribute('data-delay-open-modal') || 60) * 1000;

          setTimeout(() => {
            popupOpen(popup);
          }, delay);
        }
      });
    });
  } else {
    let mouseOut = false;

    function handleMouseOut(e) {
      if (!mouseOut) {
        if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
          mouseOut = true;

          const popups = document.querySelectorAll('.popup');
          if (popups.length > 0) {
            popups.forEach((popup) => {
              const classContains = items.some((className) => popup.classList.contains(className));
              if (classContains) {
                popupOpen(popup);
              }
            });
          }
        }
      }
    }

    document.addEventListener('mouseout', handleMouseOut);
  }

  const timeOpen = 90; // В секундах

  document.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('[data-sticky-dropdown-close]')) {
      target.closest('.sticky-dropdown').classList.remove('_active');

      setTimeout(() => {
        target.closest('.sticky-dropdown').classList.add('_active');
      }, timeOpen * 1000);
    }
  });
})();
