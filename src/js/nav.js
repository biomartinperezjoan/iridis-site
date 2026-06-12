// Mobile nav toggle — shared by the blog's static pages
document.addEventListener('DOMContentLoaded', () => {
  const navTabs = document.getElementById('navTabs');
  const navToggle = document.getElementById('navToggle');
  if (navTabs && navToggle) {
    navToggle.addEventListener('click', () => navTabs.classList.toggle('open'));
  }
});
