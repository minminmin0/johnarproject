AFRAME.registerComponent("play-all-animations", {
  init: function () {
    this.mixer = null;
    this.clock = new THREE.Clock();

    this.el.addEventListener("model-loaded", () => {
      const model = this.el.getObject3D("mesh");

      if (!model || !model.animations || model.animations.length === 0) {
        console.log("애니메이션이 없거나 모델을 찾지 못했습니다.");
        return;
      }

      this.mixer = new THREE.AnimationMixer(model);

      model.animations.forEach((clip) => {
        this.mixer.clipAction(clip).play();
      });

      console.log("애니메이션 재생:", model.animations.length);
    });
  },

  tick: function () {
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta());
    }
  }
});

window.addEventListener("DOMContentLoaded", function () {
 const actionBtn = document.getElementById("actionBtn");
 const actionBtnImg = document.getElementById("actionBtnImg");
 const actionBtnText = document.getElementById("actionBtnText");
 
 const clockImage = document.getElementById("clockImage");
 const storyText = document.getElementById("storyText");
  const crocodile = document.getElementById("crocodile");
  const glove = document.getElementById("glove");
  const gorillaPlace = document.getElementById("gorillaPlace");
  const gorillaTeacher = document.getElementById("gorillaTeacher");

  let sceneStep = 0;

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

      // 장갑이 날아간 뒤 악어 반응
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

        actionBtn.classList.remove("image-button");
        actionBtn.classList.add("text-button");

        actionBtnImg.style.display = "none";
        actionBtnText.style.display = "inline";
        actionBtnText.textContent = "정문으로 가기";
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

      actionBtnText.textContent = "?? 선생님!";
    }

    // 3단계: 선생님 멘트
    else if (sceneStep === 2) {
      sceneStep = 3;

      storyText.innerHTML =
        "“존 패트릭 노먼 멕헤너시.<br>" +
        "난 지금 커다란 털복숭이 고릴라한테<br>" +
        "붙들려 매달려 있다.<br>" +
        "빨리 날 좀 내려다오.”";

      actionBtnText.textContent = "존의 대답";
    }

// 4단계: 존의 대답
else if (sceneStep === 3) {
  sceneStep = 4;

  storyText.innerHTML =
    "“이 동네에 커다란 털복숭이 따위는<br>" +
    "살지 않아요, 선생님.”";

  // 마지막 장면이므로 버튼 숨기기
  actionBtn.style.display = "none";
}

  });
});