(() => {
  const items = document.querySelectorAll('[data-text-lines-parent]');

  items.forEach((item) => {
    const breakpoint = item.getAttribute('data-text-lines-parent');

    const paragraphs = item.querySelector('[data-text-lines]');
    const lines = Number(paragraphs.getAttribute('data-text-lines'));

    const toggle = item.querySelector('[data-text-toggle]');

    toggle.style.display = 'none';

    const handleVisible = () => {
      paragraphs.style.webkitLineClamp = 'auto';
      paragraphs.style.display = 'flex';
      paragraphs.style.webkitBoxOrient = 'vertical';
      paragraphs.style.overflow = 'visible';
      paragraphs.style.maxHeight = '100%';
    };

    const handleHidden = () => {
      paragraphs.style.webkitLineClamp = lines;
      paragraphs.style.display = '-webkit-box';
      paragraphs.style.webkitBoxOrient = 'vertical';
      paragraphs.style.overflow = 'hidden';

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

    action();

    toggle.addEventListener('click', () => {
      if (paragraphs.style.overflow === 'hidden') {
        handleVisible();
      } else {
        handleHidden();
      }
    });
  });
})();
