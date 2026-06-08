const storyText = document.getElementById("storyText");
const gorillaTeacher = document.getElementById("gorillaTeacher");

// ==============================
// 고릴라 선생님을 띄울 위치
// 두 번째 사진 위치 기준
// ==============================
const gorillaLat = 37.652915;
const gorillaLon = 127.016362;

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

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// 처음부터 계속 보이게 하기
gorillaTeacher.setAttribute("visible", "true");
gorillaTeacher.setAttribute("scale", "16 16 16");
gorillaTeacher.setAttribute("rotation", "180 0 0");

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    function (position) {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      const distanceToGorilla = getDistance(
        userLat,
        userLon,
        gorillaLat,
        gorillaLon
      );

      storyText.innerHTML =
        "현재 위치 확인 중<br>" +
        "현재 위도: " + userLat.toFixed(6) + "<br>" +
        "현재 경도: " + userLon.toFixed(6) + "<br>" +
        "목표 위도: " + gorillaLat + "<br>" +
        "목표 경도: " + gorillaLon + "<br>" +
        "GPS 오차: 약 " + Math.round(accuracy) + "m<br>" +
        "고릴라 선생님까지 약 " + Math.round(distanceToGorilla) + "m<br><br>" +
        "고릴라 선생님은 목표 위치에 계속 표시됩니다.<br>" +
        "화면을 천천히 돌려보세요.";

      // 절대 숨기지 않음
      gorillaTeacher.setAttribute("visible", "true");
      gorillaTeacher.setAttribute("scale", "16 16 16");
      gorillaTeacher.setAttribute("rotation", "180 0 0");
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