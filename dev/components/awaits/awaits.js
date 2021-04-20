setInterval(() => {
  const $currentSlide = $('.js-slide:eq(0)');

  $currentSlide.appendTo('.awaits__slider');
  $currentSlide.addClass('awaits__slide--hide');
  $('.awaits__text').text($('.awaits__slider-inner .js-slide:eq(0)').attr('data-text'));
  setTimeout(() => {
    $currentSlide.removeClass('awaits__slide--hide')
    $currentSlide.appendTo('.awaits__slider-inner');
    $currentSlide.addClass('awaits__slide--show');
    setTimeout(() => {
      $currentSlide.removeClass('awaits__slide--show');
    }, 500);
  }, 500);
}, 5000);