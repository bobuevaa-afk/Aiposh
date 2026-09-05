const noBtn = document.getElementById('noBtn');
const bgMusic = document.getElementById('bgMusic');
const heartsContainer = document.getElementById('heartsContainer');
const card = document.getElementById('card');

// Переключение экранов
function goToStep(stepNumber) {
  const step = document.getElementById(`step${stepNumber}`);
  if (!step) return;

  document.querySelectorAll('.step').forEach(stepItem => stepItem.classList.remove('active'));
  step.classList.add('active');
}

// Запуск музыки при первом клике
function playMusic() {
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
}

// Механика убегания кнопки "Нет"
if (noBtn) {
  noBtn.addEventListener('mouseover', moveNoButton);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
  });
}

function moveNoButton() {
  if (!noBtn || !card) return;

  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Случайные координаты внутри карточки
  const maxX = Math.max(cardRect.width - btnRect.width - 20, 0);
  const maxY = Math.max(cardRect.height - btnRect.height - 20, 0);

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.position = 'absolute';
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

// Обработчики кнопок
const yesBtn1 = document.getElementById('yesBtn1');
const yesBtn2 = document.getElementById('yesBtn2');
const yesBtn3 = document.getElementById('yesBtn3');
const yesBtn4 = document.getElementById('yesBtn4');
const yesBtn5 = document.getElementById('yesBtn5');

if (yesBtn1) {
  yesBtn1.addEventListener('click', () => {
    playMusic();
    trackEvent(KEY_YES_CLICK);
    goToStep(2);
  });
}

if (yesBtn2) {
  yesBtn2.addEventListener('click', () => {
    trackEvent(KEY_YES_CLICK);
    goToStep(3);
  });
}

if (yesBtn3) {
  yesBtn3.addEventListener('click', () => {
    trackEvent(KEY_YES_CLICK);
    goToStep(4);
  });
}

if (yesBtn4) {
  yesBtn4.addEventListener('click', () => {
    trackEvent(KEY_YES_CLICK);
    goToStep(5);
  });
}

if (yesBtn5) {
  yesBtn5.addEventListener('click', () => {
    trackEvent(KEY_YES_CLICK);
    goToStep(6);
  });
}

// Генератор летающих сердечек
function createHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement('div');
  heart.classList.add('heart-bg');
  heart.innerHTML = ['💖', '🌸', '✨', '💕'][Math.floor(Math.random() * 4)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 3 + 3 + 's';
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 400);
const KEY_VISITS = 'olya_val_visit_892347';
const KEY_YES_CLICK = 'olya_val_yes_892347';

function trackEvent(key) {
  fetch(`https://countapi.mileshilliard.com/api/v1/hit/${key}`);
}

// Отслеживание визита при открытии
if (!sessionStorage.getItem('visited')) {
  sessionStorage.setItem('visited', 'true');
  trackEvent(KEY_VISITS);
}