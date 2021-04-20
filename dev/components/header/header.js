let topOffset = 0;

const hideOverflow = () => {
  topOffset = window.scrollY;

  document.body.style.cssText = `position: fixed; margin-top: ${-topOffset}px;`;
};

const showOverflow = () => {
  document.body.style.cssText = 'position: static; margin-top: 0;';

  window.scrollTo(0, topOffset);
};

$('.js-theme').on('click', () => {
  if ($('body').hasClass('dark-theme')) {
    setTheme(light_theme, 'light');
  } else {
    setTheme(dark_theme, 'dark');
  }
});

$('.js-burger').on('click', e => {
  $(e.currentTarget).toggleClass('header__burger--active');
  $('.header__menu').toggleClass('header__menu--active');

  if ($(e.currentTarget).hasClass('header__burger--active')) {
    hideOverflow();
  } else {
    showOverflow();
  }
});

$('.header__user').on('click', e => {
  const $this = $(e.currentTarget);

  if (!$this.hasClass('header__user--shown')) {
    $this.toggleClass('header__user--shown');
    $this.find('.header__user-sub').slideToggle(300);
  }
});

$(document).on('click', e => {
	if(!$(e.target).closest('.header__user').length) {
    $('.header__user-sub').slideUp();
    if ($('.header__user--shown').length) {
      $('.header__user').toggleClass('header__user--shown');
    }
	}
});

$('.header__user-language').on('click', e => {
  const $this = $(e.currentTarget);

  $this.toggleClass('header__user-language--toggled');
  $('.header__user-language:last-child').slideToggle(300);
});