import { bodyLock, bodyUnLock } from '../functions/body_lock.js';

function modals() {
  const links = document.querySelectorAll('[data-popup-open]');

  let unlock = true;

  const parentContainer = document.getElementById('modal-wrapper');
  const time = parentContainer.dataset.popupSpeed ? Number(parentContainer.dataset.popupSpeed) : 500;

  if (links) {
    links.forEach((link) => {
      link.addEventListener('click', () => {
        const popupName = this.getAttribute('data-popup');
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
      });
    });

    const close = document.querySelectorAll('[data-popup-close]');

    close.forEach((item) => {
      item.addEventListener('click', popupClose(item.closest('.popup')));
    });

    function popupOpen(currentPopup) {
      if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup._active');

        popupActive ? popupClose(popupActive, false) : modalBodyLock();

        currentPopup.classList.add('_active');

        currentPopup.addEventListener('click', (e) => {
          if (!e.target.closest('.popup__body')) popupClose(e.target.closest('.popup'));
        });
      }
    }

    function popupClose(popupActive, doUnlock = true) {
      if (unlock) {
        popupActive.classList.remove('_active');

        if (doUnlock) modalBodyUnLock();
      }
    }

    function modalBodyLock() {
      bodyLock();

      unlock = false;
      setTimeout(() => (unlock = true), time);
    }

    function modalBodyUnLock() {
      setTimeout(() => bodyUnLock(), time);

      unlock = false;
      setTimeout(() => (unlock = true), time);
    }

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        const popupActive = document.querySelector('.popup._active');
        popupClose(popupActive);
      }
    });

    (function () {
      if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
          var node = this;
          while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
          }
          return null;
        };
      }
    })();
    (function () {
      if (!Element.prototype.matches) {
        Element.prototype.mathes =
          Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
      }
    })();
  }
}
