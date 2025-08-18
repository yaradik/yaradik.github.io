document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.store-header');
  const favBadges = document.querySelectorAll('.header__actions a[href="#favorites"] .badge');
  const cartBadges = document.querySelectorAll('.header__actions a[href="#cart"] .badge');
  let favoritesCount = 0;
  let cartCount = 0;

  const onScroll = () => {
    if (window.scrollY > 10) header.classList.add('header--scrolled');
    else header.classList.remove('header--scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.product-card__actions .action-btn');
    if (!btn) return;
    e.preventDefault();
    if (btn.querySelector('.fa-heart')) {
      favoritesCount += 1;
      favBadges.forEach(b => b.textContent = String(favoritesCount));
    } else if (btn.querySelector('.fa-shopping-cart')) {
      cartCount += 1;
      cartBadges.forEach(b => b.textContent = String(cartCount));
    }
    btn.classList.add('is-active');
    setTimeout(() => btn.classList.remove('is-active'), 250);
  });
});


