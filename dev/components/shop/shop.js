$('.shop__categories-item').on('click', e => {
  const $this = $(e.currentTarget);
  const target = $this.attr('data-grid');

  $('.shop__categories-item--active').removeClass('shop__categories-item--active');
  $this.addClass('shop__categories-item--active');

  $('.shop__grid').hide(0);
  $(`.shop__grid[data-grid="${target}"]`).css('display', 'flex').hide(0).fadeIn(300);
});

$('.shop__item').on('click', e => {
  e.preventDefault();
  $('.shop__popup').hide(0);
  
  if ($(window).innerWidth() < 1200) {
    $('.shop__item').fadeIn(300);
    $(e.currentTarget).next().fadeIn(300);
    $(e.currentTarget).hide(0);
  } else {
    $(e.currentTarget).next().slideDown(300);
  }

  setTimeout(() => {
    $(e.currentTarget).next().find('.shop__popup-close').fadeIn(300);
  }, 300);
});

$('.shop__popup-close').on('click', e => {
  $(e.currentTarget).hide(0);
  $(e.currentTarget).parent().hide(0);
  if ($(window).innerWidth() < 1200) {
    console.log($(e.currentTarget).parent().prev())
    $(e.currentTarget).parent().prev().fadeIn(300);
  }
});

$('.shop__popup-gallery-thumbnail').on('click', e => {
  const $this = $(e.currentTarget);
  const style = $this.attr('style');

  $('.shop__popup-gallery-thumbnail--active').removeClass('shop__popup-gallery-thumbnail--active');
  $this.addClass('shop__popup-gallery-thumbnail--active');

  $this.closest('.shop__popup-gallery').find('.shop__popup-gallery-image').attr('style', style);
});