function getReviews(id) {
  let reviews = localStorage.getItem(id);

  if (reviews) {
    return JSON.parse(reviews);
  } else {
    return [];
  }
}

function createReview(data) {
  let hash = '';
  let checkedArr = (data.checkedArr.length === 0) ? [] : data.checkedArr;
  for(let i = 0; i < checkedArr.length; i++) {
    hash += `#${checkedArr[i]}  `;
  };

  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'reviewCardButtons';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'deleteBtn';
  deleteBtn.value = `${data.username}`;
  deleteBtn.innerHTML = '삭제';

  deleteBtn.addEventListener("click", () => {
    alert(deleteBtn.value);
  });

  buttonDiv.appendChild(deleteBtn);

  const div = document.createElement('div');
  div.className = 'reviewCard';
  div.appendChild(buttonDiv);
  div.innerHTML += `
    <h4>${data.username}</h4>
    <p class="reviewBox">${data.review}</p>
    <p class="sizeDown">${hash}</p>
    <p class="sizeDown">${data.dateFormat}</p>
  `;

  return div;
}

export function createReviews(id) {
  let username = document.querySelector('#username').value;
  let password = document.querySelector('#password').value;
  let review = document.querySelector('#review').value;
  let checked = document.querySelectorAll('input[name=reviewPoint]');
  let checkedArr = [];

  // 관람포인트 체크 여부 확인 및 저장
  checked.forEach((hashTag) => {
    if(hashTag.checked) {
      checkedArr.push(hashTag.value);
    }
  });

  // 작성 날짜 저장
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let dateFormat = `${year}.${month}.${day}`;
  
  let idReviews = getReviews(id);

  let reviewObject = {
    username, password, review, checkedArr, dateFormat
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

  reviewArr.forEach((data) => {
    const card = createReview(data);
    reviewPosition.appendChild(card);
  });
}