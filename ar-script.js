const storyText = document.getElementById("storyText");
const gorillaTeacher = document.getElementById("gorillaTeacher");

// ==============================
// 정문 앞 목표 위치
// 두 번째 사진 기준 좌표
// ==============================
const gorillaLat = 37.652915;
const gorillaLon = 127.016362;

let gorillaShown = false;

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

// 처음에는 숨김
gorillaTeacher.setAttribute("visible", "false");
gorillaTeacher.setAttribute("position", "0 -1 -6");
gorillaTeacher.setAttribute("scale", "3.5 3.5 3.5");
gorillaTeacher.setAttribute("rotation", "0 0 0");

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

      // 아직 목표 위치 근처에 도착하지 않았을 때
      if (distanceToGorilla > 25 && gorillaShown === false) {
        storyText.innerHTML =
          "정문으로 이동하는 중입니다.<br>" +
          "현재 위도: " + userLat.toFixed(6) + "<br>" +
          "현재 경도: " + userLon.toFixed(6) + "<br>" +
          "목표 위도: " + gorillaLat + "<br>" +
          "목표 경도: " + gorillaLon + "<br>" +
          "GPS 오차: 약 " + Math.round(accuracy) + "m<br>" +
          "고릴라 선생님까지 약 " + Math.round(distanceToGorilla) + "m";

        gorillaTeacher.setAttribute("visible", "false");
      }

      // 목표 위치 근처에 도착했을 때
      if (distanceToGorilla <= 25 && gorillaShown === false) {
        gorillaShown = true;

        gorillaTeacher.setAttribute("visible", "true");
        gorillaTeacher.setAttribute("position", "0 -1 -6");
        gorillaTeacher.setAttribute("scale", "3.5 3.5 3.5");
        gorillaTeacher.setAttribute("rotation", "0 0 0");

        storyText.innerHTML =
          "정문 앞에 도착한 존은<br>" +
          "믿기 힘든 장면을 보았습니다.<br>" +
          "선생님이 고릴라에게 붙잡혀 있었습니다.";
      }

      // 한 번 나타난 뒤에는 계속 보이게 유지
      if (gorillaShown === true) {
        gorillaTeacher.setAttribute("visible", "true");
      }

      console.log("현재 위도:", userLat);
      console.log("현재 경도:", userLon);
      console.log("GPS 오차:", accuracy);
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