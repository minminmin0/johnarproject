const storyText = document.getElementById("storyText");
const crocodile = document.getElementById("crocodile");

// ==============================
// 악어를 띄울 목표 위치
// 네가 말한 현재 위치 좌표
// ==============================
const crocLat = 37.652859;
const crocLon = 127.016284;

// 두 좌표 사이 거리 계산 함수
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // 지구 반지름, 단위 m

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

// 처음부터 악어 테스트용 설정
crocodile.setAttribute("visible", "true");
crocodile.setAttribute("scale", "20 20 20");
crocodile.setAttribute("rotation", "0 180 0");

// 현재 위치 확인
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    function (position) {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      const distanceToCroc = getDistance(userLat, userLon, crocLat, crocLon);

      console.log("현재 위도:", userLat);
      console.log("현재 경도:", userLon);
      console.log("GPS 오차:", accuracy);
      console.log("악어까지 거리:", distanceToCroc);

      storyText.innerHTML =
        "현재 위치 확인 중<br>" +
        "현재 위도: " + userLat.toFixed(6) + "<br>" +
        "현재 경도: " + userLon.toFixed(6) + "<br>" +
        "목표 위도: " + crocLat + "<br>" +
        "목표 경도: " + crocLon + "<br>" +
        "GPS 오차: 약 " + Math.round(accuracy) + "m<br>" +
        "악어까지 약 " + Math.round(distanceToCroc) + "m";

      if (distanceToCroc <= 20) {
        storyText.innerHTML +=
          "<br><br>악어 표시 구역입니다.<br>화면 주변을 천천히 돌려보세요.";

        crocodile.setAttribute("visible", "true");
        crocodile.setAttribute("scale", "20 20 20");
      } else {
        storyText.innerHTML +=
          "<br><br>아직 악어 위치에서 조금 멀리 있습니다.";

        // 테스트 중에는 멀어도 악어를 숨기지 않음
        crocodile.setAttribute("visible", "true");
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