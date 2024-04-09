(() => {
  const items = document.querySelectorAll('[data-text-lines-parent]');

  items.forEach((item) => {
    const breakpoint = item.getAttribute('data-text-lines-parent');

    const paragraphs = item.querySelector('[data-text-lines]');
    const lines = paragraphs.getAttribute('data-text-lines');

    const toggle = item.querySelector('[data-text-toggle]');

    const handleHidden = () => {
      paragraphs.style.webkitLineClamp = 'auto';
      paragraphs.style.display = 'flex';
      paragraphs.style.webkitBoxOrient = 'vertical';
      paragraphs.style.overflow = 'visible';
    };

    const handleVisible = () => {
      paragraphs.style.webkitLineClamp = lines;
      paragraphs.style.display = '-webkit-box';
      paragraphs.style.webkitBoxOrient = 'vertical';
      paragraphs.style.overflow = 'hidden';
    };

    const breakpointFunc = () => {
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

        return;
      } else {
        handleHidden();

        return;
      }
    });
  });
})();
