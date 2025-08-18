document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.store-header');
  const favBadges = document.querySelectorAll('.header__actions a[href="#favorites"] .badge');
  const cartBadges = document.querySelectorAll('.header__actions a[href="#cart"] .badge');
  let favoritesCount = 0;
  let cartCount = 0;

  // Sticky header shrink effect
  const onScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Product actions
  document.body.addEventListener('click', (e) => {
    const button = e.target.closest('.product-card__actions .action-btn');
    if (!button) return;
    e.preventDefault();
    const isHeart = button.querySelector('.fa-heart');
    if (isHeart) {
      favoritesCount += 1;
      favBadges.forEach(b => b.textContent = String(favoritesCount));
      button.classList.add('is-active');
      setTimeout(() => button.classList.remove('is-active'), 300);
      return;
    }
    const isCart = button.querySelector('.fa-shopping-cart');
    if (isCart) {
      cartCount += 1;
      cartBadges.forEach(b => b.textContent = String(cartCount));
      button.classList.add('is-active');
      setTimeout(() => button.classList.remove('is-active'), 300);
    }
  });
});


