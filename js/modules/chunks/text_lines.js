(() => {
  const items = document.querySelectorAll('[data-text-lines-parent]');

  items.forEach((item) => {
    const breakpoint = item.getAttribute('data-text-lines-parent');

    const paragraphs = item.querySelector('[data-text-lines]');
    const lines = paragraphs.getAttribute('data-text-lines');

    const toggle = item.querySelector('[data-text-toggle]');

    toggle.style.display = 'none';

    const handleHidden = () => {
      paragraphs.style.webkitLineClamp = 'auto';
      paragraphs.style.display = 'flex';
      paragraphs.style.webkitBoxOrient = 'vertical';
      paragraphs.style.overflow = 'visible';
      paragraphs.style.maxHeight = '100%';
    };

    const handleVisible = () => {
      paragraphs.style.webkitLineClamp = lines;
      paragraphs.style.display = '-webkit-box';
      paragraphs.style.webkitBoxOrient = 'vertical';
      paragraphs.style.overflow = 'hidden';

      const maxHeight = lines * (parseFloat(window.getComputedStyle(paragraphs).lineHeight) + parseFloat(window.getComputedStyle(paragraphs.children[0]).marginBottom));

      paragraphs.style.maxHeight = `${maxHeight}px`;
    };

    const breakpointFunc = () => {
      const blockHeight = paragraphs.scrollHeight;

      const lineHeight = parseFloat(window.getComputedStyle(paragraphs).lineHeight);

      const linesCount = Math.round(blockHeight / lineHeight);

      if (linesCount <= lines) {
        toggle.style.display = 'none';

        return;
      }

      if (window.innerWidth > breakpoint) {
        toggle.style.display = 'none';

        handleHidden();
      } else {
        toggle.style.display = 'inline-flex';

        handleVisible();
      }
    };

    window.addEventListener('resize', () => {
      breakpointFunc();
    });

    breakpointFunc();

    toggle.addEventListener('click', () => {
      if (paragraphs.style.display === 'flex') {
        handleVisible();

        toggle.innerText = 'Ver Mais...';

        return;
      } else {
        handleHidden();

        toggle.innerText = 'Ver Menos...';

        return;
      }
    });
  });
})();
