
function setTheme(type) {
  document.body.className = type + '-mode';
  localStorage.setItem('theme', type);
}

function loadTheme() {
  const saved = localStorage.getItem('theme') || 'cute';
  document.body.className = saved + '-mode';
}

document.addEventListener('DOMContentLoaded', loadTheme);
