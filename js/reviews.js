function getReviews(id) {
  let reviews = localStorage.getItem(id);

  if (reviews) {
    return JSON.parse(reviews);
  } else {
    return [];
  }
}

function createReview(arr, position) {
  arr.forEach((review) => {
    const div = document.createElement('div');
    div.className = 'reviewCard';
    div.innerHTML = `
      <div>
        <button>수정</button>
        <p>|</p>
        <button>삭제</button>
      </div>
      <h4>${review.username}</h4>
      <p>${review.review}</p>
      <p></p>
      <p>${review.dateFormat}</p>
    `;

    position.appendChild(div);
  })
}

export function createReviews(id) {
  let username = document.querySelector('#username').value;
  let password = document.querySelector('#password').value;
  let review = document.querySelector('#review').value;
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let dateFormat = `${year}.${month}.${day}`;
  
  let idReviews = getReviews(id);

  let reviewObject = {
    username, password, review, dateFormat
  };

  idReviews.push(reviewObject);

  localStorage.setItem(id, JSON.stringify(idReviews));

  history.go(0);
}

export function loadReviews(id) {
  let countPosition = document.querySelector('.reviewCount');
  let reviewPosition = document.querySelector('.reviews');

  let reviewArr = getReviews(id);
  let length = reviewArr.length;

  countPosition.innerHTML = length;

  createReview(reviewArr, reviewPosition);
}