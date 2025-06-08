// myjs.js
window.addEventListener('DOMContentLoaded', (event) => {
    const digitInputs = document.querySelectorAll('.code-digit-input');
    const roomCodeMessage = document.getElementById('roomCodeMessage'); // 'Enter Room Code' / Error message element
    const joinButton = document.getElementById('joinButton'); // 'Join' 버튼에 id 추가
    
    // ★★★ 상수 정의 ★★★
    const ADMIN_CODE = "0000"; // 관리자 코드
    const SHARE_ROOM_PAGE_URL = "../../movit/html/share-room.html"; // share_room.html 페이지 경로
    const ERROR_MESSAGE_TEXT = "Error: 다시 입력하세요";
    const DEFAULT_MESSAGE_TEXT = "Enter Room Code";

    // 입력 필드 및 메시지 초기화/리셋 함수
    function resetInputAndMessage() {
        digitInputs.forEach(input => {
            input.value = ''; // 입력 값 지우기
            input.style.borderBottom = '2px solid #333'; // 기본 밑줄 바로 복귀 (dashed 아님)
        });
        roomCodeMessage.textContent = DEFAULT_MESSAGE_TEXT; // 메시지 기본으로 리셋
        roomCodeMessage.classList.remove('error'); // 에러 스타일 제거
        digitInputs[0].focus(); // 첫 번째 입력 필드에 포커스
    }

    // 각 입력 필드에 이벤트 리스너 추가
    digitInputs.forEach((input, index) => {
        // 숫자만 입력되도록 제한 및 자동 포커스 이동
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // 숫자 외 문자 제거

            if (e.target.value.length === 1) { // 한 글자 입력 시
                if (index < digitInputs.length - 1) { // 다음 칸이 있다면
                    digitInputs[index + 1].focus(); // 다음 칸으로 포커스 이동
                } else {
                    // 마지막 칸 입력 시 Join 버튼에 포커스
                    joinButton.focus();
                }
            }

            // 입력 값이 있을 때 밑줄 바 투명하게 변경 (CSS :focus와 함께 작동)
            if (e.target.value.length > 0) {
                e.target.style.borderBottom = '2px solid transparent';
            } else {
                // 입력 값이 없으면 다시 밑줄 바 보이기
                e.target.style.borderBottom = '2px solid #333';
            }

            // 사용자가 다시 입력하기 시작하면 에러 메시지 초기화
            if (roomCodeMessage.classList.contains('error')) {
                resetInputAndMessage();
            }
        });

        // 백스페이스 키 처리 (이전 칸으로 이동)
        input.addEventListener('keydown', (e) => {
            // 현재 칸이 비어있고 백스페이스를 누르면 이전 칸으로 이동
            if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                digitInputs[index - 1].focus();
                digitInputs[index - 1].style.borderBottom = '2px solid #333'; // 이전 칸의 밑줄 바 다시 보이기
            }
        });

        // 입력 필드에서 포커스를 잃었을 때 (blur) 처리
        input.addEventListener('blur', () => {
            if (input.value.length === 0) {
                input.style.borderBottom = '2px solid #333'; // 비어있으면 밑줄 바 다시 보이기
            }
        });
    });

    // ★★★ Join 버튼 클릭 이벤트 ★★★
    if (joinButton) {
        joinButton.addEventListener('click', () => {
            let fullCode = '';
            digitInputs.forEach(input => {
                fullCode += input.value;
            });

            if (fullCode.length === 4) { // 4자리 모두 입력되었는지 확인
                if (fullCode === ADMIN_CODE) {
                    // 관리자 코드일 경우 share_room.html로 이동
                    window.location.href = SHARE_ROOM_PAGE_URL;
                } else {
                    // 0000이 아닌 다른 4자리 코드일 경우에도 share_room.html로 이동
                    // (요구사항 1에 따라 0000만 명시되었으므로 다른 코드는 모두 '오류'로 간주하지 않고 동일하게 이동)
                    window.location.href = SHARE_ROOM_PAGE_URL; 
                    // 만약 0000이 아니면 에러 메시지를 띄우고 싶다면 아래 주석을 해제하세요.
                    // roomCodeMessage.textContent = ERROR_MESSAGE_TEXT;
                    // roomCodeMessage.classList.add('error');
                    // resetInputAndMessage();
                }
            } else {
                // 4자리가 모두 입력되지 않은 경우 에러 메시지 표시
                roomCodeMessage.textContent = ERROR_MESSAGE_TEXT;
                roomCodeMessage.classList.add('error');
                resetInputAndMessage(); // 입력 초기화 및 첫 칸으로 포커스
            }
        });
    }
});