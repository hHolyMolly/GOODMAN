import userDevice from '../functions/is_device.js';

(() => {
  const items = document.querySelectorAll('[data-text-lines-parent]');

  items.forEach((item) => {
    const breakpoint = item.getAttribute('data-text-lines-parent');

    const paragraphs = item.querySelector('[data-text-lines]');
    const lines = Number(paragraphs.getAttribute('data-text-lines'));

    const toggle = item.querySelector('[data-text-toggle]');

    paragraphs.classList.add('_no-show');
    toggle.style.display = 'none';

    const handleVisible = () => {
      paragraphs.style.webkitLineClamp = 'auto';
      paragraphs.style.display = 'flex';
      paragraphs.style.webkitBoxOrient = 'vertical';
      paragraphs.style.overflow = 'visible';
      paragraphs.style.maxHeight = '100%';

      paragraphs.classList.add('_no-show');
    };

    const handleHidden = () => {
      paragraphs.style.webkitLineClamp = lines;
      paragraphs.style.display = '-webkit-box';
      paragraphs.style.webkitBoxOrient = 'vertical';
      paragraphs.style.overflow = 'hidden';

      paragraphs.classList.remove('_no-show');

      if (paragraphs.querySelectorAll('ul, ol').length > 0) {
        const maxHeight = lines * parseFloat(window.getComputedStyle(paragraphs).lineHeight) - 10;

        paragraphs.style.maxHeight = `${maxHeight}px`;
      }
    };

    const action = () => {
      const blockHeight = paragraphs.scrollHeight;

      const lineHeight = parseFloat(window.getComputedStyle(paragraphs).lineHeight);

      const linesCount = Math.round(blockHeight / lineHeight);

      if (linesCount <= lines) {
        paragraphs.classList.add('_no-show');
        toggle.style.display = 'none';

        return;
      }

      if (window.innerWidth > breakpoint) {
        toggle.style.display = 'none';

        handleVisible();
      } else {
        toggle.style.display = 'inline-flex';

        handleHidden();
      }
    };

    window.addEventListener('resize', () => {
      if (!userDevice.any()) {
        action();
      }
    });

    action();

    toggle.addEventListener('click', () => {
      if (paragraphs.style.overflow === 'hidden') {
        toggle.innerText = 'Ver Menos...';

        paragraphs.classList.add('_active');

        handleVisible();
      } else {
        toggle.innerText = 'Ver Mais...';

        paragraphs.classList.remove('_active');

        handleHidden();
      }
    });
  });
})();
