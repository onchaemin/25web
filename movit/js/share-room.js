// 전역 변수 (모든 함수에서 접근 가능하도록)
let currentRating = 0;
const HOME_PAGE_URL = "../../movit/html/home.html";

// 요소들을 전역으로 가져오기
let ratingModal;
let starRatingContainer;
let saveRatingBtn;
let cancelRatingBtn;

// ★★★ 팝업 열기 함수 ★★★
function openRatingModal() {
    // 팝업을 열기 전에 별점 UI를 생성하고 초기화
    createStars(); // 별 아이콘 생성
    resetStars(); // 별점 초기화 (모든 별 비우기)
    ratingModal.style.display = 'flex'; // 팝업 표시
}

// ★★★ 팝업 닫기 함수 ★★★
function closeRatingModal() {
    ratingModal.style.display = 'none'; // 팝업 숨김
    resetStars(); // 별점 초기화
}

// 별 아이콘 생성 (팝업이 열릴 때만 호출됨)
function createStars() {
    if (!starRatingContainer) return; // 요소가 아직 로드되지 않았다면 함수 종료
    starRatingContainer.innerHTML = ''; // 기존 별점 초기화 (중복 생성 방지)
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.classList.add('fa-solid', 'fa-star');
        star.dataset.rating = i; // 별점에 해당하는 숫자 데이터 저장
        starRatingContainer.appendChild(star);
    }
    attachStarEvents(); // 별들이 모두 생성된 후 이벤트 리스너 추가
}

// 별 이벤트 리스너 추가 (클릭, 마우스 오버/아웃)
function attachStarEvents() {
    const stars = starRatingContainer.querySelectorAll('.fa-star');
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            const clickedRating = parseInt(e.target.dataset.rating);
            currentRating = clickedRating; // 클릭된 별점 저장
            updateStarsDisplay(currentRating); // 클릭 시 별점 반영
        });

        star.addEventListener('mouseover', (e) => {
            const hoverRating = parseInt(e.target.dataset.rating);
            updateStarsDisplay(hoverRating, true); // 호버 시 미리보기
        });

        star.addEventListener('mouseout', () => {
            updateStarsDisplay(currentRating); // 호버 아웃 시 현재 선택된 별점 상태로 복귀
        });
    });
}

// 별점 시각적 표시 업데이트 함수 (순차적 채우기 로직 포함)
function updateStarsDisplay(rating, isHovering = false) {
    const stars = starRatingContainer.querySelectorAll('.fa-star');
    stars.forEach((star, index) => {
        if (index < rating) { // 현재 별이 rating 값보다 작으면 채우기
            star.classList.add('active');
        } else { // 아니면 비우기
            star.classList.remove('active');
        }
    });
}

// 별점 초기화 (팝업 열 때 사용)
function resetStars() {
    currentRating = 0; // 선택된 별점 초기화
    updateStarsDisplay(0); // 모든 별 비우기
}


// ★★★ DOMContentLoaded 이벤트 리스너: 페이지 로드 시 단 한 번만 실행 ★★★
window.addEventListener('DOMContentLoaded', (event) => {
    // 필요한 요소들을 여기서 가져옵니다.
    const micButton = document.getElementById('mic');
    const homeButton = document.getElementById('homeButton'); // 홈 버튼 요소
    const volumeControl = document.getElementById('volume-control');
    const brightnessControl = document.getElementById('brightness-control');
    const movie = document.getElementById('movie');

    // 팝업 관련 요소 할당 (전역 변수에)
    ratingModal = document.getElementById('ratingModal');
    starRatingContainer = document.getElementById('starRating');
    saveRatingBtn = document.getElementById('saveRatingBtn');
    cancelRatingBtn = document.getElementById('cancelRatingBtn');

    // --- 마이크 버튼 토글 기능 ---
    let muted = false;
    micButton.addEventListener('click', () => {
        muted = !muted;
        micButton.textContent = muted ? '🔇' : '🎤';
        console.log('마이크 상태:', muted ? '음소거' : '활성화');
    });

    // --- 볼륨 컨트롤 기능 ---
    if (volumeControl && movie) {
        movie.volume = volumeControl.value / 100;
        volumeControl.addEventListener('input', (e) => {
            movie.volume = e.target.value / 100;
        });
    }

    // --- 밝기 컨트롤 기능 ---
    if (brightnessControl && movie) {
        const initialBrightness = 0.5 + (brightnessControl.value / 100 * 1.5);
        movie.style.filter = `brightness(${initialBrightness})`;

        brightnessControl.addEventListener('input', (e) => {
            const brightnessValue = 0.5 + (e.target.value / 100 * 1.5);
            movie.style.filter = `brightness(${brightnessValue})`;
        });
    }

    // ★★★ 홈 버튼 클릭 이벤트 (팝업 열기 함수 호출) ★★★
    if (homeButton) {
        homeButton.addEventListener('click', openRatingModal);
    }

    // --- 팝업 버튼 이벤트 ---
    if (saveRatingBtn) {
        saveRatingBtn.addEventListener('click', () => {
            if (currentRating > 0) {
                console.log('선택된 별점:', currentRating + '점');
                // 여기에 선택된 별점 값을 서버에 저장하는 AJAX/Fetch 요청 등을 추가할 수 있습니다.

                closeRatingModal(); // 팝업 닫기
                window.location.href = HOME_PAGE_URL; // 홈 페이지로 이동
            } else {
                alert('별점을 선택해주세요!'); // 별점이 0점일 경우 경고
            }
        });
    }

    if (cancelRatingBtn) {
        cancelRatingBtn.addEventListener('click', closeRatingModal);
    }

    // 모달 외부 클릭 시 닫기 (오버레이 클릭 시)
    if (ratingModal) {
        ratingModal.addEventListener('click', (e) => {
            if (e.target === ratingModal) {
                closeRatingModal();
            }
        });
    }

    // ★★★ 중요: 이 DOMContentLoaded 안에서는 openRatingModal()을 호출하지 않기기! ★★★
    // 팝업은 초기 로드 시 자동으로 뜨지 않음.
});