window.addEventListener('DOMContentLoaded', (event) => {
   
    const digitInputs = document.querySelectorAll('.code-digit-input');
    const roomCodeSection = document.querySelector('.room-code-section');
    const joinButton = document.querySelector('.button-join');

    // 각 입력 필드에 이벤트 리스너 추가
    digitInputs.forEach((input, index) => {
        // 숫자만 입력되도록 제한
        input.addEventListener('input', (e) => {
            // 숫자 외 문자 제거
            e.target.value = e.target.value.replace(/[^0-9]/g, '');

            // 입력 후 다음 칸으로 자동 포커스 이동
            if (e.target.value.length === 1 && index < digitInputs.length - 1) {
                digitInputs[index + 1].focus();
            }

            // (옵션) 입력 값이 있을 때 바 숨기기 (CSS :focus 만으로도 충분하지만, 더 정교한 제어를 위해)
            // if (e.target.value.length > 0) {
            //     e.target.classList.add('has-value');
            // } else {
            //     e.target.classList.remove('has-value');
            // }
        });

        // 백스페이스 키 처리 (이전 칸으로 이동)
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                digitInputs[index - 1].focus();
            }
        });
    });

    // (옵션) Join 버튼 클릭 시 현재 입력된 코드 확인 (개발용)
    if (joinButton) {
        joinButton.addEventListener('click', () => {
            let fullCode = '';
            digitInputs.forEach(input => {
                fullCode += input.value;
            });
            console.log('입력된 Room Code:', fullCode);
            // 여기에 입력된 코드에 따른 로직 (예: 서버 전송, 유효성 검사) 추가
        });
    }
});