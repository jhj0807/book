// 탭 전환 함수
function showTab(tab) {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const loginTab = document.querySelector('.tab-btn.active');

  if (tab === 'login') {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    loginTab.classList.add('active');
    document.querySelectorAll('.tab-btn')[1].classList.remove('active');
  } else {
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    loginTab.classList.remove('active');
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
  }
}

// 회원 가입 처리
document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  // 사용자 정보를 로컬 스토리지에 저장
  localStorage.setItem(email, JSON.stringify({ name, password }));
  
  alert('회원 가입 성공!');
  showTab('login');  // 회원 가입 후 로그인 화면으로 전환
});

// 로그인 처리
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // 로컬 스토리지에서 저장된 사용자 정보 가져오기
  const user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
    alert('로그인 성공!');
    window.location.href = 'https://jhj0807.github.io/main/'; // 로그인 성공 시 페이지 이동
  } else {
    alert('이메일 또는 비밀번호가 일치하지 않습니다.');
  }
});