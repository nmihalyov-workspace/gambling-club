$('.login__buttons-signin[type="submit"]').on('click', e => {
  e.preventDefault();
  
  const $this = $(e.currentTarget);
  
  $this.closest('.login__form').find('.login__form-error').fadeIn(300);
  $('.login__success').slideDown();
});

$('.login__buttons-signup[type="submit"]').on('click', e => {
  e.preventDefault();
  
  const $this = $(e.currentTarget);
  
  $this.closest('.login__form').find('.login__form-error').fadeIn(300);
  $('.login__error').slideDown();
});

$('a.login__buttons-signup').on('click', () => {
  $('.login__form').hide(0);
  $('.login__form[data-form="signup"]').fadeIn(300);
});

$('a.login__buttons-signin').on('click', () => {
  $('.login__form').hide(0);
  $('.login__form[data-form="login"]').fadeIn(300);
});