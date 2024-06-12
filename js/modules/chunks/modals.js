import { bodyLock, bodyUnLock } from '../functions/body_lock.js';
import userDevice from '../functions/is_device.js';

let unlock = true;

const parentContainer = document.getElementById('modal-wrapper');

const time = parentContainer && parentContainer.dataset.popupSpeed ? Number(parentContainer.dataset.popupSpeed) : 500;

function stickyDropdown() {
  if (userDevice.any()) {
    const stickyDropdown = document.querySelector('.sticky-dropdown');
    if (stickyDropdown) {
      setTimeout(() => {
        stickyDropdown.classList.add('_active');
      }, time);
    }
  }
}

export function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup._active');

    popupActive ? popupClose(popupActive, false) : modalBodyLock();

    currentPopup.classList.add('_active');

    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__body')) {
        popupClose(e.target.closest('.popup'));

        stickyDropdown();
      }
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

if (parentContainer) {
  const links = document.querySelectorAll('[data-popup-open]');

  document.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('[data-popup-close]')) {
      popupClose(target.closest('.popup'));

      stickyDropdown();
    }
  });

  if (links.length > 0) {
    links.forEach((link) => {
      link.addEventListener('click', function (e) {
        const popupName = this.getAttribute('data-popup');
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.code === 'Escape') {
        const popupActive = document.querySelector('.popup._active');
        popupClose(popupActive);

        stickyDropdown();
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
