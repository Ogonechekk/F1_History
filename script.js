(() => {
  const car = document.querySelector('.scroll-car');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.topbar nav');
  let lastY = window.scrollY;
  let raf = 0;

  const updateCar = () => {
    if (!car) return;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    const direction = window.scrollY >= lastY ? 1 : -1;
    const x = -28 + progress * 148;
    car.style.setProperty('--car-x', x + 'vw');
    car.style.setProperty('--car-flip', String(direction));
    lastY = window.scrollY;
    raf = 0;
  };

  const onScroll = () => {
    if (!raf) raf = window.requestAnimationFrame(updateCar);
  };

  menuButton?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') ?? false;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '×' : 'Меню';
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
      if (menuButton) menuButton.textContent = 'Меню';
    });
  });

  updateCar();
  window.addEventListener('scroll', onScroll, { passive: true });
})();