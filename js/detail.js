
import { createReviews, loadReviews } from "./reviews.js";

// Parameter로 넘어오는 id값 처리
let parameters = new URL(location.href).searchParams;
let movieId = parameters.get('id');

// 위치 정보 및 세팅값
let openReviewInput = document.querySelector('.openReviewInput');
let reviewInputForm = document.querySelector('.reviewInputForm');
let reviewCloseButton = document.querySelector('.close');
let reviewSubmitButton = document.querySelector('.submit');

// 화면 출력시 reviews 출력
loadReviews(movieId);

//영화 정보
// fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko`, options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

//출연진
// fetch(
//   `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko`,
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// 실관람평 쓰기 클릭시 입력창 열리는 event
openReviewInput.addEventListener("click", (e) => {
  reviewInputForm.style.display = "block";
});

// 입력창에 X 버튼 클릭시 입력창 닫히는 event
reviewCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  reviewInputForm.style.display = "none";
});

// 입력창에 내용을 입력하고 localStorage에 저장
reviewSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  createReviews(movieId);
});