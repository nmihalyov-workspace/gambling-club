$('.js-reliable-term').on('change', e => {
  $('.reliable__table-inner').hide(0);
  $(`.reliable__table-inner[data-table="${$(e.currentTarget).val()}"]`).css('display', 'inline-block').hide(0).fadeIn(300);
});