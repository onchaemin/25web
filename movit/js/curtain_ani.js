// curtain_ani.js

window.addEventListener('DOMContentLoaded', (event) => {
    // 요소들이 제대로 로드되었는지 확인하는 로그 추가
    console.log('DOM Content Loaded. Starting animation.'); 
    const leftCurtain = document.querySelector('.left-curtain');
    const rightCurtain = document.querySelector('.right-curtain');
    const backCurtainBg = document.querySelector('.back-curtain-bg');
    const logoAnimationContainer = document.querySelector('.logo-animation-container');
    const pinLight = document.querySelector('.pin-light');
    const mainLogo = document.querySelector('.main-logo');
    const tiedCurtain = document.querySelector('.tied-curtain');

    // 각 요소가 제대로 찾아졌는지 확인하는 로그 (개발자 도구 콘솔에서 확인)
    console.log('leftCurtain:', leftCurtain);
    console.log('rightCurtain:', rightCurtain);
    console.log('backCurtainBg:', backCurtainBg);
    console.log('logoAnimationContainer:', logoAnimationContainer);
    console.log('pinLight:', pinLight);
    console.log('mainLogo:', mainLogo);
    console.log('tiedCurtain:', tiedCurtain);


    // home.html로 이동하는 경로 (intro.html에서 html 폴더를 벗어나 home.html로 진입)
    const HOME_PAGE_URL = "movit/html/home.html"; // intro.html과 home.html이 같은 html 폴더 안에 있다면 이렇게 사용

    // 만약 home.html이 movit 폴더 바로 아래에 있다면:
    // const HOME_PAGE_URL = "../../home.html"; // intro.html(movit/html) -> (movit) -> home.html

    // 1. 커튼 열기 애니메이션 시작
    const curtainOpenDelay = 500; // 0.5초 뒤 시작
    const curtainAnimationDuration = 2000; // 2초 동안 열림

    setTimeout(() => {
        if (leftCurtain && rightCurtain) {
            leftCurtain.classList.add('open');
            rightCurtain.classList.add('open');
            console.log('Curtains opening. Adding "open" class.');
        } else {
            console.error('Error: Curtain elements not found for opening animation!');
        }
    }, curtainOpenDelay);

    // 2. 뒷 배경 커튼 사라지는 애니메이션
    const backCurtainFadeDelay = curtainOpenDelay + 1000; // 커튼 열림 시작 후 1초 뒤 (총 1.5초)
    setTimeout(() => {
        if (backCurtainBg) {
            backCurtainBg.style.opacity = '0'; // 투명하게 만듦
            console.log('Back curtain fading out. Setting opacity to 0. Current opacity:', backCurtainBg.style.opacity);
        } else {
            console.error('Error: backCurtainBg element not found for fading out!');
        }
    }, backCurtainFadeDelay);

    // 3. 로고 관련 애니메이션 시작 (핀조명 -> 로고 -> 묶인 커튼)
    // 로고 컨테이너가 나타나기 시작하는 시간
    const logoContainerStartDelay = curtainOpenDelay + curtainAnimationDuration + 500; // 커튼 열림 완료 후 0.5초 뒤 (총 0.5s + 2s + 0.5s = 3초)
    
    setTimeout(() => {
        if (logoAnimationContainer) {
            logoAnimationContainer.classList.add('visible'); // 로고 컨테이너를 보이게 함 (opacity 0 -> 1)
            console.log('Logo animation container visible class added.');

            // 각 이미지의 'hidden' 클래스 제거 타이밍 (logoContainerStartDelay 이후를 기준으로 계산)
            
            // 핀 조명
            setTimeout(() => {
                if (pinLight) {
                    pinLight.classList.remove('hidden');
                    console.log('Pin light hidden class removed. Pin light element:', pinLight);
                } else {
                    console.error('Error: pinLight element not found for animation!');
                }
            }, 500); // logoAnimationContainer.visible 후 0.5초

            // 메인 로고
            setTimeout(() => {
                if (mainLogo) {
                    mainLogo.classList.remove('hidden');
                    console.log('Main logo hidden class removed. Main logo element:', mainLogo);
                } else {
                    console.error('Error: mainLogo element not found for animation!');
                }
            }, 1500); // logoAnimationContainer.visible 후 1.5초

            // 묶인 커튼
            setTimeout(() => {
                if (tiedCurtain) {
                    tiedCurtain.classList.remove('hidden');
                    console.log('Tied curtain hidden class removed. Tied curtain element:', tiedCurtain);
                } else {
                    console.error('Error: tiedCurtain element not found for animation!');
                }
            }, 2500); // logoAnimationContainer.visible 후 2.5초

        } else {
            console.error('Error: logoAnimationContainer element not found for starting animation!');
        }
    }, logoContainerStartDelay);


    // 4. 최종 페이지 이동
    // 모든 애니메이션이 완료될 시간 계산:
    // (logoContainerStartDelay) + (tiedCurtain 애니메이션 시작 지연) + (tiedCurtain 애니메이션 지속 시간) + (추가 대기 시간)
    // 3초 + 2.5초 + 1초 + 1.5초 = 총 9.5초
    const finalRedirectTime = (logoContainerStartDelay + 2500 + 1000 + 1500); // 로고 애니메이션 완료 후 3초 대기

    setTimeout(() => {
        console.log('Redirecting to home.html...');
        window.location.href = HOME_PAGE_URL;
    }, finalRedirectTime);
});