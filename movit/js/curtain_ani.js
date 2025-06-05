window.addEventListener('DOMContentLoaded', (event) => {
    const leftCurtain = document.querySelector('.left-curtain');
    const rightCurtain = document.querySelector('.right-curtain');
    const logo = document.querySelector('.logo');

    // 0.5초 후 커튼 열기 시작
    setTimeout(() => {
        if(leftCurtain && rightCurtain) {
            leftCurtain.classList.add('open');
            rightCurtain.classList.add('open');
        }
    }, 500); // 0.5초 딜레이


    // 로고 페이드인 시작을 위한 클래스 추가
    // 커튼 애니메이션 시간 (2초) + 로고 transition-delay (1.5초) = 총 3.5초 후에 로고가 완전히 나타남
    // 여기서는 커튼 열림 시작 (0.5초) + 커튼 애니메이션 완료 시간 (2초) 이후에 로고 visible 클래스를 추가하여
    // 로고 자체의 transition-delay(1.5초)가 적용돼야 함.
        setTimeout(() => {
        if(logo) {
            logo.classList.add('visible');
        }
    }, 500 + 2000); // 0.5초 (커튼 시작 딜레이) + 2000ms (커튼 애니메이션 시간) = 2500ms
                  // 즉, 커튼 애니메이션이 끝난 직후 로고 페이드인 애니메이션이 시작

    // 애니메이션 종료 후 다음 페이지로 이동
    // 총 4초 후 홈 페이지로 이동 (커튼 애니메이션 2초 + 로고 표시 시간 등 고려)
    setTimeout(() => {
         window.location.href = '../.../movit/html/intro.html'; // 실제 홈 페이지 경로로 수정
     }, 4000);
});