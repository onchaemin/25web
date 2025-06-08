// myjs.js
document.addEventListener('DOMContentLoaded', function() {
    // 드롭다운 버튼 클릭 시 토글 (기존 코드 유지)
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function(dropdown) {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        if (dropbtn && dropdownContent) {
            dropbtn.addEventListener('click', function(e) {
                e.preventDefault();
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            });
        }
    });

    window.addEventListener('click', function(e) {
        dropdowns.forEach(function(dropdown) {
            if (!dropdown.contains(e.target)) {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownContent) {
                    dropdownContent.style.display = 'none';
                }
            }
        });
    });

    // --- 순환 슬라이더 기능 구현 ---
    const sliderTrack = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let sliderItems = Array.from(sliderTrack.children); // 원본 아이템들
    const totalItems = sliderItems.length; // 원본 아이템의 총 개수
    const itemsToShow = 3; // 화면에 동시에 보여줄 아이템 개수 (CSS의 min-width와 gap에 따라 조절)

    // 복제할 아이템 개수: 최소한 itemsToShow 개수만큼은 복제해야 자연스럽습니다.
    // 여기서는 itemsToShow와 동일하게 복제합니다.
    const cloneCount = itemsToShow; 

    // 1. 슬라이더 아이템 복제
    // 마지막 cloneCount 개수 아이템들을 복제하여 앞에 추가
    for (let i = 0; i < cloneCount; i++) {
        const clonedItem = sliderItems[totalItems - 1 - i].cloneNode(true);
        sliderTrack.prepend(clonedItem);
    }
    // 첫 cloneCount 개수 아이템들을 복제하여 뒤에 추가
    for (let i = 0; i < cloneCount; i++) {
        const clonedItem = sliderItems[i].cloneNode(true);
        sliderTrack.appendChild(clonedItem);
    }

    // 복제된 아이템들을 포함한 전체 아이템 리스트 업데이트
    sliderItems = Array.from(sliderTrack.children);

    let currentIndex = cloneCount; // 현재 보고 있는 원본 아이템의 시작 인덱스 (복제된 부분을 건너뛰고 시작)
    let isTransitioning = false; // 전환 중인지 여부 플래그

    // 각 아이템의 정확한 너비 + 간격 계산
    let itemWidth = 0;
    let gap = 0;
    if (sliderTrack.children.length > 0) {
        itemWidth = sliderTrack.children[0].offsetWidth; // 첫 아이템의 너비
        const computedStyle = window.getComputedStyle(sliderTrack);
        gap = parseFloat(computedStyle.gap || '0px');
        if (isNaN(gap)) gap = 0;
    }
    const slideDistance = (itemWidth + gap); // 한 아이템을 이동하는 거리

    // 2. 초기 스크롤 위치 설정 (복제된 아이템 건너뛰고 원본의 첫 번째로 이동)
    sliderTrack.scrollLeft = currentIndex * slideDistance;

    // 3. 슬라이더 이동 함수
    function scrollToItem(index, smooth = true) {
        if (isTransitioning) return; // 전환 중이면 함수 종료

        if (!smooth) { // 부드러운 전환을 끄고 즉시 이동
            sliderTrack.style.scrollBehavior = 'auto';
        } else {
            sliderTrack.style.scrollBehavior = 'smooth';
        }

        sliderTrack.scrollLeft = index * slideDistance;
        isTransitioning = true; // 전환 시작

        // transitionend 이벤트 리스너를 한 번만 실행되도록
        const onTransitionEnd = () => {
            isTransitioning = false; // 전환 종료
            sliderTrack.removeEventListener('scrollend', onTransitionEnd); // `scrollend`는 비교적 최신 이벤트.
            // 구형 브라우저 호환성을 위해서는 'transitionend' 또는 setTimeout 사용
        };
        
        // 'scrollend' 이벤트는 스크롤 애니메이션이 완료되었을 때 발생합니다.
        // 대부분의 최신 브라우저에서 지원하지만, 구형 브라우저에서는 `setTimeout`을 사용해야 할 수도 있습니다.
        sliderTrack.addEventListener('scrollend', onTransitionEnd, { once: true });

        // (대체) `setTimeout` 사용 (구형 브라우저 호환성)
        // setTimeout(() => {
        //     isTransitioning = false;
        // }, 600); // CSS transition 시간(0.5s)보다 약간 길게 설정
    }


    // 4. 순환 로직 처리
    sliderTrack.addEventListener('scroll', () => {
        if (!isTransitioning) { // 사용자가 직접 스크롤하는 경우를 대비
            const scrollLeft = sliderTrack.scrollLeft;
            const scrollWidth = sliderTrack.scrollWidth;
            const clientWidth = sliderTrack.clientWidth;
            
            // 마지막 복제된 아이템 영역에 도달했을 때
            if (scrollLeft >= (totalItems + cloneCount - itemsToShow) * slideDistance) {
                // 원본의 첫 번째로 즉시 이동
                scrollToItem(cloneCount, false);
            } 
            // 첫 복제된 아이템 영역에 도달했을 때
            else if (scrollLeft <= 0) { // scrollLeft가 0에 가까워지면
                // 원본의 마지막으로 즉시 이동
                scrollToItem(totalItems + cloneCount - itemsToShow, false);
            }
        }
    });


    // 5. 버튼 클릭 이벤트 리스너
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex--;
            scrollToItem(currentIndex);
            
            // 만약 복제된 첫 번째 구간으로 이동하면
            if (currentIndex < cloneCount) {
                setTimeout(() => {
                    currentIndex = totalItems + cloneCount - itemsToShow;
                    scrollToItem(currentIndex, false); // 즉시 원본 마지막으로 점프
                }, 500); // CSS transition 시간(0.5s)과 동일하게 설정
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex++;
            scrollToItem(currentIndex);

            // 만약 복제된 마지막 구간으로 이동하면
            if (currentIndex >= totalItems + cloneCount) {
                setTimeout(() => {
                    currentIndex = cloneCount;
                    scrollToItem(currentIndex, false); // 즉시 원본 첫 번째로 점프
                }, 500); // CSS transition 시간(0.5s)과 동일하게 설정
            }
        });
    }
});