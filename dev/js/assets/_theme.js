const light_theme = {
  '--bg-primary': '#F0F0F0',
  '--bg-secondary': '#E0E6EF',
  '--text-primary': '#0E2B49',
  '--text-secondary': '#748799',
  '--text-tertiary': '#748699'
};

const dark_theme = {
  '--bg-primary': '#030D18',
  '--bg-secondary': '#031120',
  '--text-primary': '#E0E6EF',
  '--text-secondary': '#9DAFC1',
  '--text-tertiary': '#414E5B'
};

const setTheme = (theme, themeName) => {
  for (var name in theme) {
    document.documentElement.style.setProperty(name, theme[name]);
  }

  cssVars({
    variables: theme
  });

  if (themeName === 'dark') {
    $('body').addClass('dark-theme');
    $('.header__theme-switcher').addClass('header__theme-switcher--dark');
  } else {
    $('body').removeClass('dark-theme');
    $('.header__theme-switcher').removeClass('header__theme-switcher--dark');
  }

  themeName != 'undefined' && localStorage.setItem('theme', themeName);
};

if (localStorage.getItem('theme') === 'dark') {
  setTheme(dark_theme, 'dark');
} else if (localStorage.getItem('theme') === 'light') {
  setTheme(light_theme, 'light');
} else {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme(dark_theme, 'dark');
  } else {
    setTheme(light_theme, 'light');
  }
}