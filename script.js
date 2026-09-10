const sheets = document.querySelectorAll('.page-sheet');
const totalSheets = sheets.length;
let currentSheetIndex = 0;

function renderSheet() {
  sheets.forEach((sheet, idx) => {
    sheet.classList.toggle('active', idx === currentSheetIndex);
  });
}

function navigateSheet(direction) {
  const target = currentSheetIndex + direction;
  if (target >= 0 && target < totalSheets) {
    currentSheetIndex = target;
    renderSheet();
  }
}

// Navigasi Touch / Usap Layar
let touchStartX = 0;
let touchStartY = 0;
const stage = document.getElementById('bookStage');

stage.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

stage.addEventListener('touchend', (e) => {
  const diffX = touchStartX - e.changedTouches[0].screenX;
  const diffY = touchStartY - e.changedTouches[0].screenY;

  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
    if (diffX > 0) {
      navigateSheet(1);
    } else {
      navigateSheet(-1);
    }
  }
}, { passive: true });

// Navigasi Klik Kanan / Kiri
stage.addEventListener('click', (e) => {
  const rect = stage.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  if (clickX > rect.width / 2) {
    navigateSheet(1);
  } else {
    navigateSheet(-1);
  }
});

// Navigasi Tombol Keyboard
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
    navigateSheet(1);
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    navigateSheet(-1);
  }
});

renderSheet();
