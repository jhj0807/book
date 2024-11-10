// 로그인 시 사용자 이름을 로컬 스토리지에서 가져와서 표시
document.addEventListener("DOMContentLoaded", function() {
  const userNameElement = document.getElementById('userName');
  
  // 로컬 스토리지에서 로그인한 사용자 정보 가져오기
  const email = localStorage.getItem('loggedInEmail');  // 로그인 이메일을 저장한다고 가정
  const user = email ? JSON.parse(localStorage.getItem(email)) : null;

  // 사용자 정보가 있다면 이름을 표시, 없다면 기본값 "홍길동"을 표시
  if (user) {
    userNameElement.innerText = user.name; // 사용자의 이름으로 업데이트
  }
});

// 로그아웃 처리
function logout() {
  // 로컬 스토리지에서 로그인 상태를 삭제 (예: 'loggedInEmail' 항목 제거)
  localStorage.removeItem('loggedInEmail');

  // 사용자 이름을 초기화
  document.getElementById('userName').innerText = '홍길동';  // 기본값으로 설정

  // 로그아웃 후 로그인 페이지로 리디렉션
  window.location.href = 'https://jhj0807.github.io/book/';  // 로그인 페이지 URL
}

// Google Books API에서 베스트셀러 도서 목록 가져오기
fetch('https://www.googleapis.com/books/v1/volumes?q=bestseller&maxResults=6')
  .then(response => response.json())
  .then(data => {
    const bookListContainer = document.getElementById('bookList');
    
    // 데이터를 제목을 기준으로 알파벳순으로 정렬
    const sortedBooks = data.items.sort((a, b) => {
      const titleA = a.volumeInfo.title.toUpperCase();
      const titleB = b.volumeInfo.title.toUpperCase();
      return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
    });

    // 정렬된 도서 목록을 HTML에 추가
    sortedBooks.forEach(item => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');
      
      const title = item.volumeInfo.title;
      const author = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : '저자 정보 없음';
      const imageUrl = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150x200';
      
      bookCard.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <h4>${title}</h4>
        <p>${author}</p>
      `;
      
      bookListContainer.appendChild(bookCard);
    });
  })
  .catch(error => {
    console.error('도서 목록을 불러오는 중 오류가 발생했습니다:', error);
    alert('도서 목록을 불러오는 중 오류가 발생했습니다.');
  });