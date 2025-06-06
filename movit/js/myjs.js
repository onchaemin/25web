window.addEventListener('DOMContentLoaded', (event) => {
   
    const digitInputs = document.querySelectorAll('.code-digit-input');
    const roomCodeSection = document.querySelector('.room-code-section');
    const joinButton = document.querySelector('.button-join');
    const roomCodeMessage = document.getElementById('roomCodeMessage'); // 'Enter Room Code' / Error message elemen
    const ADMIN_CODE = "0000"; // Admin code
    const ADMIN_PAGE_URL = "../../movit/html/share-room.html"; 
    const GENERAL_ROOM_PAGE_URL = "../../movit/html/share-room.html"; // URL for general room page (UPDATE THIS PATH)
    const ERROR_MESSAGE_TEXT = "Error: 다시 입력하세요";
    const DEFAULT_MESSAGE_TEXT = "Enter Room Code";

     // 메세지 수정 함수
    function resetInputAndMessage() {
        digitInputs.forEach(input => {
            input.value = ''; // Clear input
            input.style.borderBottom = '2px dashed #711D19'; // Show bottom border again
        });
        roomCodeMessage.textContent = DEFAULT_MESSAGE_TEXT; // Reset message to default
        roomCodeMessage.classList.remove('error'); // Remove error styling
        digitInputs[0].focus(); // Focus on the first input field
    }

    // 각 입력 필드에 이벤트 리스너 추가
    digitInputs.forEach((input, index) => {
        // 숫자만 입력되도록 제한
        input.addEventListener('input', (e) => {
            // 숫자 외 문자 제거
            e.target.value = e.target.value.replace(/[^0-9]/g, '');

            // 입력 후 다음 칸으로 자동 포커스 이동
            if (e.target.value.length === 1) {
                if (index < digitInputs.length - 1) {
                    digitInputs[index + 1].focus();
                } else {
                    // If it's the last input, focus on the Join button
                    joinButton.focus();
                }
            }

            // 입력 값이 있을 때 바 숨기기 (CSS :focus 만으로도 충분하지만, 더 정교한 제어를 위해)
             if (e.target.value.length > 0) {
                 e.target.style.borderBottom = '2px dashed transparent';
             } else {
                 e.target.style.borderBottom = '2px dashed #711D19';
             }
         // Reset error message if user starts typing again
            if (roomCodeMessage.classList.contains('error')) {
                resetInputAndMessage(); // Reset all inputs and message
            }
        });

        // 백스페이스 키 처리 (이전 칸으로 이동)
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                digitInputs[index - 1].focus();
                  digitInputs[index - 1].style.borderBottom = '2px dashed #711D19';
            }
        });
    });

    // Show border when input loses focus if it's empty
        input.addEventListener('blur', () => {
            if (input.value.length === 0) {
                input.style.borderBottom = '2px dashed #711D19';
            }
        });
    

    // (옵션) Join 버튼 클릭 시 현재 입력된 코드 확인 (개발용)
    if (joinButton) {
        joinButton.addEventListener('click', () => {
            let fullCode = '';
            digitInputs.forEach(input => {
                fullCode += input.value;
            });

           if (fullCode.length === 4) { // Check if exactly 4 digits are entered
                if (fullCode === ADMIN_CODE) {
                    // If it's the admin code, navigate to the admin page
                    window.location.href = ADMIN_PAGE_URL;
                } else {
                    // For any other 4-digit code, navigate to the general room page
                    window.location.href = GENERAL_ROOM_PAGE_URL;
                }
            } else {
                // If not 4 digits, display error message
                roomCodeMessage.textContent = ERROR_MESSAGE_TEXT;
                roomCodeMessage.classList.add('error');
                resetInputAndMessage(); // Clear inputs and refocus
            }
        });
    }
});