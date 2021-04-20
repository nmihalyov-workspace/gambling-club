$('.js-tournament').on('click', e => {
  const $this = $(e.currentTarget);
  const target = $this.attr('data-tournament');

  $('.tournaments__select-item--active').removeClass('tournaments__select-item--active');
  $this.addClass('tournaments__select-item--active');
  $('.js-tournament-table').hide(0);
  $(`.js-tournament-table[data-tournament="${target}"]`).fadeIn(300);
});