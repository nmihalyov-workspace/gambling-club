$('.js-logo').addClass('preloader__logo--animated');

setTimeout(() => {
  $('.js-preloader').css('opacity', '0');

  setTimeout(() => {
    $('.js-preloader').remove();
  }, 500);
}, 1000);