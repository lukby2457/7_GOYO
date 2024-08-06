function getReviews(id) {
  let reviews = localStorage.getItem(id);

  if (reviews) return JSON.parse(reviews);
  else return [];
}

function getUsernameArr(arr) {
  let usernameArr = [];

  if(arr.length !== 0) {
    for(const review of arr) {
      usernameArr.push(review.username);
    }
    return usernameArr;
  } else return usernameArr;
}

function getOneReview(id, username) {
  let reviewArr = getReviews(id);

  for(const one of reviewArr) {
    if(one.username === username) return one;
  }
}

function createReview(data, id) {
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

  console.log(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    let inputPassword = prompt('작성하실 때 입력하신 패스워드를 입력해주세요');
    let reviewArr = getReviews(id);
    let usernameReview = getOneReview(id, deleteBtn.value);
    
    if(inputPassword !== null) {
      if(inputPassword === usernameReview.password) {
        if(confirm("정말로 삭제하시겠습니까?")) {
          reviewArr.forEach((item, index) => {
            if(item.username === deleteBtn.value) reviewArr.splice(index, 1);
          });
    
          localStorage.setItem(id, JSON.stringify(reviewArr));
    
          alert("리뷰 삭제가 완료되었습니다");
          history.go(0);
        } else alert("삭제가 취소되었습니다");
      } else alert("패스워드가 일치하지 않습니다. 다시 한번 확인해주세요");
    } else alert("패스워드 입력을 취소하셨습니다");
  });

  buttonDiv.appendChild(deleteBtn);

  const div = document.createElement('div');
  div.className = 'reviewCard';
  div.appendChild(buttonDiv);

  const usernameH4 = document.createElement('h4');
  usernameH4.innerHTML = `${data.username}`;
  div.appendChild(usernameH4);

  const reviewP = document.createElement('p');
  reviewP.className = 'reviewBox';
  reviewP.innerHTML = `${data.review}`;
  div.appendChild(reviewP);

  const hashTagP = document.createElement('p');
  // hashTagP.className = 'sizeDown';
  hashTagP.classList.add('sizeDown', 'hash');
  hashTagP.innerHTML = `${hash}`;
  div.appendChild(hashTagP);

  const dateP = document.createElement('p');
  dateP.className = 'sizeDown';
  dateP.innerHTML = `${data.dateFormat}`;
  div.appendChild(dateP);

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
    if(hashTag.checked) checkedArr.push(hashTag.value);
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
    } else alert("같은 이름을 가진 작성자가 이미 존재합니다.");
  } else alert("필수 입력 사항에 입력을 하지 않았습니다. 다시 한번 확인해주세요!");
}

export function loadReviews(id) {
  let countPosition = document.querySelector('.reviewCount');
  let reviewPosition = document.querySelector('.reviews');

  let reviewArr = getReviews(id);
  let length = reviewArr.length;

  countPosition.innerHTML = length;

  reviewArr.forEach((data) => {
    const card = createReview(data, id);
    reviewPosition.appendChild(card);
  });
}