function getReviews(id) {
  let reviews = localStorage.getItem(id);

  if (reviews) {
    return JSON.parse(reviews);
  } else {
    return [];
  }
}

function getUsernameArr(arr) {
  let usernameArr = [];

  if(arr.length !== 0) {
    for(const review of arr) {
      usernameArr.push(review.username);
    }
    return usernameArr;
  } else {
    return usernameArr;
  }
}

function createReview(arr, position) {
  arr.forEach((review) => {
    let hash = '';
    let checkedArr = (review.checkedArr.length === 0) ? [] : review.checkedArr;
    for(let i = 0; i < checkedArr.length; i++) {
      hash += `#${checkedArr[i]}  `;
    }

    const div = document.createElement('div');
    div.className = 'reviewCard';
    div.innerHTML = `
      <div class="reviewCardButtons">
        <button>수정</button>
        <p>|</p>
        <button>삭제</button>
      </div>
      <h4>${review.username}</h4>
      <p class="reviewBox">${review.review}</p>
      <p class="sizeDown">${hash}</p>
      <p class="sizeDown">${review.dateFormat}</p>
    `;

    position.appendChild(div);
  })
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
  
  let reviewArr = getReviews(id);
  let usernameArr = getUsernameArr(reviewArr);

  if(username !== '' && password !== '' && review !== '') {
    if(!usernameArr.includes(username)) {
      let reviewObject = {
        username, password, review, checkedArr, dateFormat
      };

      reviewArr.push(reviewObject);

      localStorage.setItem(id, JSON.stringify(reviewArr));

      alert("리뷰 입력이 완료되었습니다.");
      history.go(0);
    } else {
      alert("같은 이름을 가진 작성자가 이미 존재합니다.");
    }
  } else {
    alert("필수 입력 사항에 입력을 하지 않았습니다. 다시 한번 확인해주세요!");
  }
}

export function loadReviews(id) {
  let countPosition = document.querySelector('.reviewCount');
  let reviewPosition = document.querySelector('.reviews');

  let reviewArr = getReviews(id);
  let length = reviewArr.length;

  countPosition.innerHTML = length;

  createReview(reviewArr, reviewPosition);
}