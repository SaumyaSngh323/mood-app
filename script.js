// Select all theme buttons
const buttons = document.querySelectorAll('.theme-selector button');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove old themes
    document.body.classList.remove('theme-cute','theme-classy','theme-dark');
    // Add new theme
    document.body.classList.add(`theme-${btn.dataset.theme}`);
  });
});
