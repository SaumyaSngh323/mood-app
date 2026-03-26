// Theme Switcher
const buttons = document.querySelectorAll('.theme-selector button');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.classList.remove('theme-cute','theme-classy','theme-dark');
    document.body.classList.add(`theme-${btn.dataset.theme}`);
  });
});
