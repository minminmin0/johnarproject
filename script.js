const storyImages = [
  "images/story1.png",
  "images/story2.png",
  "images/story3.png",
  "images/story4.png"
];

let currentPage = 0;

const storyImage = document.getElementById("storyImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageSound = document.getElementById("pageSound");

// 현재 페이지 보여주기
function showPage() {
  storyImage.src = storyImages[currentPage];

  // 첫 페이지에서는 이전 버튼 숨기기
  if (currentPage === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "flex";
  }
}

// 책장 넘기는 소리
function playSound() {
  pageSound.currentTime = 0;

  pageSound.play().catch(function () {
    console.log("소리 재생이 차단될 수 있습니다.");
  });
}

// 이전 버튼 클릭
prevBtn.addEventListener("click", function () {
  if (currentPage > 0) {
    currentPage--;
    playSound();
    showPage();
  }
});

// 다음 버튼 클릭
nextBtn.addEventListener("click", function () {
  playSound();

  if (currentPage < storyImages.length - 1) {
    currentPage++;
    showPage();
  } else {
    // 마지막 페이지에서 오른쪽 버튼 누르면 AR 페이지로 이동
    window.location.href = "ar.html";
  }
});

// 처음 화면 세팅
showPage();