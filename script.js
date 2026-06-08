const storyImage = document.getElementById("storyImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageSound = document.getElementById("pageSound");

const storyImages = [
  "images/story1.png",
  "images/story2.png",
  "images/story3.png",
  "images/story4.png"
];

let currentPage = 0;

function playPageSound() {
  if (!pageSound) return;

  pageSound.currentTime = 0;
  pageSound.play().catch(function () {
    // 모바일에서는 터치 후에만 소리가 재생될 수 있음
  });
}

function showPage() {
  storyImage.src = storyImages[currentPage];

  // 모든 페이지를 잘리지 않게 표시
  storyImage.style.objectFit = "contain";
  storyImage.style.objectPosition = "center";

  // 첫 페이지에서는 이전 버튼 숨김
  if (currentPage === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "flex";
  }

  // 다음 버튼은 항상 보이게
  nextBtn.style.display = "flex";
}

prevBtn.addEventListener("click", function () {
  if (currentPage > 0) {
    currentPage--;
    playPageSound();
    showPage();
  }
});

nextBtn.addEventListener("click", function () {
  if (currentPage < storyImages.length - 1) {
    currentPage++;
    playPageSound();
    showPage();
  } else {
    // 마지막 페이지에서 다음 버튼 누르면 AR로 이동
    window.location.href = "ar.html";
  }
});

showPage();