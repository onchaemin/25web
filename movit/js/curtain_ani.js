// curtain_ani.js

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM Content Loaded. Starting animation.'); 
    
    const leftCurtain = document.querySelector('.left-curtain');
    const rightCurtain = document.querySelector('.right-curtain');
    const backCurtainBg = document.querySelector('.back-curtain-bg');
    const logoAnimationContainer = document.querySelector('.logo-animation-container');
    const pinLight = document.querySelector('.pin-light');
    const mainLogo = document.querySelector('.main-logo');
    const tiedCurtain = document.querySelector('.tied-curtain');

    console.log('leftCurtain:', leftCurtain);
    console.log('rightCurtain:', rightCurtain);
    console.log('backCurtainBg:', backCurtainBg);
    console.log('logoAnimationContainer:', logoAnimationContainer);
    console.log('pinLight:', pinLight);
    console.log('mainLogo:', mainLogo);
    console.log('tiedCurtain:', tiedCurtain);

    const HOME_PAGE_URL = "movit/html/home.html"; 

    // =============================================
    // 1. 좌우 커튼 열림 애니메이션 타이밍
    // =============================================
    const curtainOpenDelay = 300; // 0.3초 뒤에 좌우 커튼 애니메이션 시작
    const curtainAnimationDuration = 1200; // 좌우 커튼이 열리는 애니메이션 지속 시간 (1.2초)

    setTimeout(() => {
        if (leftCurtain && rightCurtain) {
            leftCurtain.classList.add('open');  // 'open' 클래스 추가하여 커튼 열기 시작
            rightCurtain.classList.add('open');
            console.log('Curtains opening. Adding "open" class.');
        } else {
            console.error('Error: Curtain elements not found for opening animation!');
        }
    }, curtainOpenDelay);

    // =============================================
    // 2. 뒷 배경 커튼 사라짐 & 핀조명/로고 나타남 애니메이션 시작 타이밍
    // =============================================
    // 좌우 커튼 열림 시작 후 0.5초 뒤에 뒷 배경 사라짐 및 로고 애니메이션 시작
    const revealLogoElementsDelay = curtainOpenDelay + 500; 

    setTimeout(() => {
        // 뒷 배경 커튼 사라지기
        if (backCurtainBg) {
            backCurtainBg.style.opacity = '0'; // opacity를 0으로 만들어 투명하게 함 (CSS transition 적용)
            console.log('Back curtain fading out. Setting opacity to 0.');
        } else {
            console.error('Error: backCurtainBg element not found for fading out!');
        }

        // 핀 조명 나타남 애니메이션 트리거
        if (pinLight) {
            pinLight.classList.add('animated'); // 'animated' 클래스 추가하여 CSS 애니메이션 트리거
            console.log('Pin light animation triggered.');
        } else {
            console.error('Error: pinLight element not found for animation!');
        }

        // 메인 로고 나타남 애니메이션 트리거
        if (mainLogo) {
            mainLogo.classList.add('animated'); // 'animated' 클래스 추가하여 CSS 애니메이션 트리거
            console.log('Main logo animation triggered.');
        } else {
            console.error('Error: mainLogo element not found for animation!');
        }

        // 묶인 커튼은 CSS에서 opacity 1로 시작하고, backCurtainBg가 사라지면서 드러나므로 JS 제어 불필요

    }, revealLogoElementsDelay);

    // =============================================
    // 3. 모든 애니메이션 완료 후 최종 페이지 이동
    // =============================================
    // 최종 리디렉션 시간 계산:
    // (revealLogoElementsDelay) + (가장 늦게 시작하는 메인 로고의 CSS transition-delay) + (메인 로고 애니메이션 지속 시간) + (추가 대기 시간)
    // CSS 상 메인 로고 transition-delay 0.5s, transition duration 0.8s
    const finalRedirectTime = (revealLogoElementsDelay + 500 + 800 + 1000); // 메인 로고 애니메이션 완료 후 1초 대기

    setTimeout(() => {
        console.log('Redirecting to home.html...');
        window.location.href = HOME_PAGE_URL; // 설정된 URL로 페이지 이동
    }, finalRedirectTime);

});