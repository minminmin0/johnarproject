// 동화책 이미지 순서
const pages = [
  "images/story1.png",
  "images/story2.png",
  "images/story3.png",
  "images/story4.png"
];

let currentPage = 0;

const storyImage = document.getElementById("storyImage");
const pageIndicator = document.getElementById("pageIndicator");
const pageSound = document.getElementById("pageSound");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// 페이지 넘기는 소리 재생
function playPageSound() {
  pageSound.currentTime = 0;
  pageSound.play();
}

// 현재 페이지 화면 업데이트
function updatePage() {
  storyImage.src = pages[currentPage];
  pageIndicator.textContent = `${currentPage + 1} / ${pages.length}`;

  // 첫 페이지에서는 이전 버튼 비활성화
  prevBtn.disabled = currentPage === 0;

  // 마지막 페이지에서는 다음 버튼 문구 변경
if (currentPage === pages.length - 1) {
  nextBtn.textContent = "AR";
  nextBtn.style.fontSize = "18px";
} else {
  nextBtn.textContent = "›";
  nextBtn.style.fontSize = "34px";
}
}

// 다음 페이지로 이동
function nextPage() {
  playPageSound();

  if (currentPage < pages.length - 1) {
    currentPage++;
    updatePage();
  } else {
    alert("여기서 AR 화면으로 넘어가면 됩니다.");
    // 나중에 AR 붙일 때 이 부분을 바꿀 예정
  }
}

// 이전 페이지로 이동
function prevPage() {
  if (currentPage > 0) {
    playPageSound();
    currentPage--;
    updatePage();
  }
}

// 버튼 연결
nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", prevPage);

// 처음 화면 세팅
updatePage();