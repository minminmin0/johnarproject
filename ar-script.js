const storyText = document.getElementById("storyText");
const clockImage = document.getElementById("clockImage");

const actionBtn = document.getElementById("actionBtn");
const actionBtnImg = document.getElementById("actionBtnImg");

const crocodile = document.getElementById("crocodile");
const glove = document.getElementById("glove");
const gorillaTeacher = document.getElementById("gorillaTeacher");

// ==============================
// 1단계: 악어 위치
// 네가 네 번째 사진에서 보고 싶다고 한 위치
// ==============================
const crocLat = 37.6516291;
const crocLon = 127.0149008;

// ==============================
// 2단계: 고릴라 선생님 위치
// 기존에 네가 쓰던 값 유지
// ==============================
const gorillaLat = 37.6528396;
const gorillaLon = 127.0163341;

// 장면 상태값
let crocReady = false;      // 악어 위치 도착 여부
let crocDone = false;       // 악어 장면 완료 여부
let gorillaShown = false;   // 고릴라 등장 여부

// 크기값
const CROC_SCALE = "1.8 1.8 1.8";
const CROC_END_SCALE = "0.1 0.1 0.1";
const GLOVE_SCALE = "0.5 0.5 0.5";
const GORILLA_SCALE = "3.5 3.5 3.5";

// 회전값
const CROC_ROTATION = "0 0 0";
const GLOVE_ROTATION = "0 0 0";
const GORILLA_ROTATION = "0 0 0";

// 두 좌표 사이 거리 계산 함수
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// 처음 상태 정리
crocodile.setAttribute("visible", "false");
glove.setAttribute("visible", "false");
gorillaTeacher.setAttribute("visible", "false");

actionBtn.style.display = "none";
actionBtn.disabled = false;

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    function (position) {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      const distanceToCroc = getDistance(userLat, userLon, crocLat, crocLon);
      const distanceToGorilla = getDistance(userLat, userLon, gorillaLat, gorillaLon);

      // ==============================
      // 1단계: 악어 위치로 이동
      // ==============================
      if (crocDone === false) {

        // 아직 악어 위치에 도착하지 않았을 때
        if (distanceToCroc > 25 && crocReady === false) {
          storyText.innerHTML =
            "악어가 나타난 길목으로 이동 중입니다.<br>" +
            "악어 위치까지 약 " + Math.round(distanceToCroc) + "m";

          crocodile.setAttribute("visible", "false");
          glove.setAttribute("visible", "false");
          actionBtn.style.display = "none";
        }

        // 악어 위치에 도착했을 때
        if (distanceToCroc <= 12 && crocReady === false) {
          crocReady = true;

          clockImage.src = "images/am830.png";
          clockImage.alt = "8시 30분";

          crocodile.setAttribute("visible", "true");
          crocodile.setAttribute("scale", CROC_SCALE);
          crocodile.setAttribute("rotation", CROC_ROTATION);

          glove.setAttribute("visible", "false");
          glove.setAttribute("scale", GLOVE_SCALE);
          glove.setAttribute("rotation", GLOVE_ROTATION);

          storyText.innerHTML =
            "길목에 악어가 나타났습니다.<br>" +
            "장갑을 던져 악어의 시선을 돌려보세요.";

          actionBtnImg.src = "images/throwglovebutton.png";
          actionBtnImg.alt = "장갑 던지기";
          actionBtn.style.display = "block";
          actionBtn.disabled = false;
        }

        console.log("현재 위도:", userLat);
        console.log("현재 경도:", userLon);
        console.log("GPS 오차:", accuracy);
        console.log("악어까지 거리:", distanceToCroc);

        return;
      }

      // ==============================
      // 2단계: 악어 장면 완료 후 고릴라 위치로 이동
      // ==============================
      if (crocDone === true && gorillaShown === false) {

        if (distanceToGorilla > 25) {
          storyText.innerHTML =
            "악어를 피해 다시 학교로 달려갑니다.<br>" +
            "고릴라 선생님까지 약 " + Math.round(distanceToGorilla) + "m";

          gorillaTeacher.setAttribute("visible", "false");
          actionBtn.style.display = "none";
        }

        if (distanceToGorilla <= 25) {
          gorillaShown = true;

          clockImage.src = "images/am900.png";
          clockImage.alt = "9시";

          gorillaTeacher.setAttribute("visible", "true");
          gorillaTeacher.setAttribute("scale", GORILLA_SCALE);
          gorillaTeacher.setAttribute("rotation", GORILLA_ROTATION);

          storyText.innerHTML =
            "정문 앞에 도착한 존은<br>" +
            "믿기 힘든 장면을 보았습니다.<br>" +
            "선생님이 고릴라에게 붙잡혀 있었습니다.";

          actionBtn.style.display = "none";
        }
      }

      // 고릴라는 한 번 나오면 계속 보이게 유지
      if (gorillaShown === true) {
        gorillaTeacher.setAttribute("visible", "true");
      }

      console.log("현재 위도:", userLat);
      console.log("현재 경도:", userLon);
      console.log("GPS 오차:", accuracy);
      console.log("악어까지 거리:", distanceToCroc);
      console.log("고릴라까지 거리:", distanceToGorilla);
    },

    function (error) {
      storyText.innerHTML =
        "위치 권한이 필요합니다.<br>" +
        "브라우저에서 위치 접근을 허용해주세요.";

      console.log("GPS 오류:", error);
    },

    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000
    }
  );
} else {
  storyText.innerHTML = "이 브라우저에서는 위치 기능을 사용할 수 없습니다.";
}

// ==============================
// 장갑 던지기 버튼 클릭
// ==============================
actionBtn.addEventListener("click", function () {
  if (crocReady === true && crocDone === false) {
    actionBtn.disabled = true;

    clockImage.src = "images/am845.png";
    clockImage.alt = "8시 45분";

    storyText.innerHTML =
      "존은 장갑을 악어 쪽으로 던졌습니다.<br>" +
      "악어가 장갑을 물고 다른 쪽으로 달아납니다!";

    // 장갑 등장
    glove.setAttribute("visible", "true");
    glove.setAttribute("scale", GLOVE_SCALE);
    glove.setAttribute("rotation", GLOVE_ROTATION);

    // 기존 애니메이션 제거
    glove.removeAttribute("animation__spin");
    glove.removeAttribute("animation__hide");

    crocodile.removeAttribute("animation__turn");
    crocodile.removeAttribute("animation__shrink");

    // 장갑은 커지지 않고 회전만 함
    glove.setAttribute("animation__spin", {
      property: "rotation",
      from: "0 0 0",
      to: "0 720 0",
      dur: 900,
      easing: "linear"
    });

    // 장갑은 잠깐 보였다가 작아짐
    setTimeout(function () {
      glove.setAttribute("animation__hide", {
        property: "scale",
        from: GLOVE_SCALE,
        to: "0.1 0.1 0.1",
        dur: 600,
        easing: "easeInQuad"
      });
    }, 900);

    // 악어가 방향을 트는 느낌
    crocodile.setAttribute("animation__turn", {
      property: "rotation",
      from: CROC_ROTATION,
      to: "0 120 0",
      dur: 900,
      easing: "easeInOutQuad"
    });

    // 악어가 멀어지듯 작아짐
    setTimeout(function () {
      crocodile.setAttribute("animation__shrink", {
        property: "scale",
        from: CROC_SCALE,
        to: CROC_END_SCALE,
        dur: 1300,
        easing: "easeInQuad"
      });
    }, 700);

    // 악어 장면 종료
    setTimeout(function () {
      crocodile.setAttribute("visible", "false");
      glove.setAttribute("visible", "false");

      crocDone = true;

      storyText.innerHTML =
        "악어가 장갑을 물고 도망갔습니다.<br>" +
        "존은 서둘러 정문으로 향합니다.";

      actionBtn.style.display = "none";
      actionBtn.disabled = false;
    }, 2500);
  }
});