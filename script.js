const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.menu-btn');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('mobile-open');
});

document.querySelectorAll('.nav nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('mobile-open'));
});

document.getElementById('year').textContent = new Date().getFullYear();
