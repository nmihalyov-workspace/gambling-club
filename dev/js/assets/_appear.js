const appearCheck = () => {
  const screenBottom = $(window).innerWidth() >= 1200 ? $(window).scrollTop() + $(window).innerHeight() : $(window).scrollTop() + $(window).innerHeight() * 1.2;
  
  $('.js-appear').each((i, el) => {
    if (screenBottom - $(el).innerHeight() > el.getBoundingClientRect().top + $(window).scrollTop()) {
      setTimeout(() => {
        $(el).removeClass('js-appear');
      }, $(window).innerWidth() >= 1200 ? $(el).attr('data-delay') : 0);
    }
  });
};

appearCheck();

$(window).on('scroll', () => {
  requestAnimationFrame(appearCheck);
});