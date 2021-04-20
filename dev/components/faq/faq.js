$('.faq__item-head').on('click', e => {
  const $this = $(e.currentTarget);

  $('.faq__item-content').slideUp(300);

  $('.faq__inner-head--active').click();
  
  if ($this.hasClass('faq__item-head--active')) {
    $this.removeClass('faq__item-head--active');
  } else {
    $('.faq__item-head--active').removeClass('faq__item-head--active');
    $this.addClass('faq__item-head--active');
    $this.parent().find('.faq__item-content').slideDown(300);
  }
});

$('.faq__inner-head').on('click', e => {
  const $this = $(e.currentTarget);

  $('.faq__inner-content').slideUp(300);
  
  if ($this.hasClass('faq__inner-head--active')) {
    $this.removeClass('faq__inner-head--active');
  } else {
    $('.faq__inner-head--active').removeClass('faq__inner-head--active');
    $this.addClass('faq__inner-head--active');
    $this.parent().find('.faq__inner-content').slideDown(300);
  }
});