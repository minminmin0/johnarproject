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
    // 모바일에서는 사용자 터치 후에만 소리가 날 수 있음
  });
}

function showPage() {
  storyImage.src = storyImages[currentPage];

  if (currentPage === 2) {
    storyImage.style.objectFit = "cover";
    storyImage.style.objectPosition = "center top";
  } else {
    storyImage.style.objectFit = "contain";
    storyImage.style.objectPosition = "center";
  }

  if (currentPage === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "flex";
  }
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
    window.location.href = "ar.html";
  }
});

showPage();