$('.js-tab').on('click', e => {
  const $this = $(e.currentTarget);
  const target = $this.attr('data-tab');

  if ($this.hasClass('profit__tabs-item')) {
    $('.profit__tabs-item--active').removeClass('profit__tabs-item--active');
    $this.addClass('profit__tabs-item--active');
  } if ($this.hasClass('winners__tabs-item')) {
    $('.winners__tabs-item--active').removeClass('winners__tabs-item--active');
    $this.addClass('winners__tabs-item--active');
  }
  $this.parent().parent().find('.js-tab-content').hide(0);
  $this.parent().parent().find(`.js-tab-content[data-tab="${target}"]`).fadeIn(300);
});