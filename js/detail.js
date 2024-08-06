import { showMovieInfo, showCredits } from "./movieInfo.js";
import { createReviews, loadReviews } from "./reviews.js";

// Parameter로 넘어오는 id값 처리
let parameters = new URL(location.href).searchParams;
let movieId = parameters.get("id");

// 위치 정보 및 세팅값
let openReviewInput = document.querySelector(".openReviewInput");
let reviewInputForm = document.querySelector(".reviewInputForm");
let reviewCloseButton = document.querySelector(".close");
let reviewSubmitButton = document.querySelector(".submit");
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjI1Mzc5NDZmOGEwYjIxZjFiMWNjZGQwZjk0MDZkNSIsIm5iZiI6MTcyMTcyNDg4OC40ODcxNzcsInN1YiI6IjY2OWY2ZWZiNGI0OTYxOGI0OTJlN2I4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mYKz6yxy0yiHtcLr1pmMFR7VeNziqwLVgBTLM-SSdNA",
  },
};

//영화 정보 가져오는 함수
showMovieInfo(movieId, options);

//출연진
//cast에서 15명까지만
showCredits(movieId, options);

// 화면 출력시 reviews 출력
loadReviews(movieId);

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


//포스터 이미지 로드 후 0.5초뒤 나타나게
window.addEventListener('load', function() {
  setTimeout(() => {
    const posterImg = this.document.querySelector('.movie_poster_wrap > img');
    if(posterImg){
      posterImg.classList.add('visible');
    }
  }, 500);
});
