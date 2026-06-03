const actionBtn = document.getElementById("actionBtn");
const actionBtnImg = document.getElementById("actionBtnImg");
const clockImage = document.getElementById("clockImage");
const storyText = document.getElementById("storyText");

const crocodile = document.getElementById("crocodile");
const glove = document.getElementById("glove");
const gorillaPlace = document.getElementById("gorillaPlace");
const gorillaTeacher = document.getElementById("gorillaTeacher");

// 1번 위치: 뭉게네 / 악어 + 장갑
const crocLat = 37.650197;
const crocLon = 127.013888;

// 2번 위치: 쌍문제1동 / 고릴라 선생님
const gorillaLat = 37.650392;
const gorillaLon = 127.013551;

let sceneStep = 0;
let crocSceneReady = false;

// 두 좌표 사이 거리 계산
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 현재 위치 확인
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    function (position) {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      const distanceToCroc = getDistance(userLat, userLon, crocLat, crocLon);

      console.log("현재 위치:", userLat, userLon);
      console.log("악어 위치까지 거리:", distanceToCroc);

      // 악어 위치 근처에 도착했을 때만 멘트/버튼 등장
      if (distanceToCroc <= 120 && crocSceneReady === false) {
        crocSceneReady = true;

        storyText.innerHTML =
          "악어가 길목을 서성이며 존의 앞을 막고 있습니다.<br>" +
          "장갑을 던져 악어의 시선을 돌려보세요.";

        actionBtn.style.display = "block";
      }

      // 아직 멀리 있을 때
      if (distanceToCroc > 120 && crocSceneReady === false) {
        storyText.innerHTML =
          "AR 위치를 찾는 중입니다.<br>" +
          "악어 장면 위치까지 약 " + Math.round(distanceToCroc) + "m 남았습니다.";
      }
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

// 버튼 클릭으로 장면 진행
actionBtn.addEventListener("click", function () {

  // 1단계: 장갑 던지기
  if (sceneStep === 0) {
    sceneStep = 1;

    clockImage.src = "images/am845.png";
    clockImage.alt = "8시 45분";

    storyText.innerHTML =
      "존은 장갑을 악어 쪽으로 던졌습니다.<br>" +
      "악어가 장갑에 정신이 팔린 사이,<br>" +
      "존은 다시 학교로 달려갔습니다.";

    // 장갑이 악어 쪽으로 날아가는 연출
    glove.setAttribute("animation__throw", {
      property: "position",
      from: "-1 0.7 -3",
      to: "1.5 0.7 -6",
      dur: 900,
      easing: "easeOutQuad"
    });

    // 악어가 장갑 쪽을 보는 것처럼 회전 + 작아짐
    setTimeout(function () {
      crocodile.setAttribute("animation__turn", {
        property: "rotation",
        from: "0 180 0",
        to: "0 250 0",
        dur: 800,
        easing: "easeInOutSine"
      });

      crocodile.setAttribute("animation__shrink", {
        property: "scale",
        from: "4 4 4",
        to: "0.3 0.3 0.3",
        dur: 1200,
        easing: "easeInQuad"
      });
    }, 900);

    // 악어와 장갑 숨기기
    setTimeout(function () {
      crocodile.setAttribute("visible", "false");
      glove.setAttribute("visible", "false");

      storyText.innerHTML =
        "악어를 피하느라 15분이나 지나버렸습니다.<br>" +
        "존은 서둘러 정문으로 향했습니다.";

      actionBtnImg.src = "images/gotogatebutton.png";
      actionBtnImg.alt = "정문으로 가기";
    }, 2300);
  }

  // 2단계: 고릴라 선생님 장면
  else if (sceneStep === 1) {
    sceneStep = 2;

    clockImage.src = "images/am900.png";
    clockImage.alt = "9시";

    storyText.innerHTML =
      "정문 앞에 도착한 존은<br>" +
      "믿기 힘든 장면을 보았습니다.<br>" +
      "선생님이 고릴라에게 붙잡혀 있었습니다.";

    gorillaPlace.setAttribute("visible", "true");

    gorillaTeacher.setAttribute("animation__appear", {
      property: "scale",
      from: "0.2 0.2 0.2",
      to: "2.5 2.5 2.5",
      dur: 900,
      easing: "easeOutBack"
    });

    actionBtnImg.src = "images/listenteacherbutton.png";
    actionBtnImg.alt = "선생님 말 듣기";
  }

  // 3단계: 선생님 멘트
  else if (sceneStep === 2) {
    sceneStep = 3;

    storyText.innerHTML =
      "“존 패트릭 노먼 멕헤너시.<br>" +
      "난 지금 커다란 털복숭이 고릴라한테<br>" +
      "붙들려 매달려 있다.<br>" +
      "빨리 날 좀 내려다오.”";

    actionBtnImg.src = "images/johnanswerbutton.png";
    actionBtnImg.alt = "존의 대답";
  }

  // 4단계: 존의 대답
  else if (sceneStep === 3) {
    sceneStep = 4;

    storyText.innerHTML =
      "존은 선생님을 바라보며 말했습니다.<br><br>" +
      "“이 동네에 커다란 털복숭이 따위는<br>" +
      "살지 않아요, 선생님.”";

    actionBtnImg.src = "images/backstorybutton.png";
    actionBtnImg.alt = "동화책으로 돌아가기";
  }

  // 5단계: 끝
  else {
    location.href = "index.html";
  }
});