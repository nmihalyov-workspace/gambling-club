$('.js-select').each((i, el) => {
  $(el).select2({
    minimumResultsForSearch: -1
  });
});