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

// 화면 출력시 reviews 출력
loadReviews(movieId);

//영화 정보 가져오는 함수
fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko`, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    showInfo(data);
  })
  .catch((err) => console.error(err));

//영화 정보를 넣는 함수
function showInfo(object) {
  const backgroundImgPath =
    "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces";
  const posterImgPath = "https://image.tmdb.org/t/p/w500";

  //배너 배경으로 영화 이미지 넣기
  const backgroundBox = document.getElementsByClassName(
    "movie_detail_container"
  )[0];
  console.log(backgroundBox);
  backgroundBox.style.backgroundImage = `url(${backgroundImgPath}${object.backdrop_path})`;

  //영화 정보 화면에 표시
  //장르
  const genres = document.getElementById("movie_genres");
  if (genres) {
    genres.textContent = object.genres.map((genre) => genre.name).join(", ");
  }
  //제목
  const title = document.getElementById("movie_title");
  title.textContent = `${object.title}`;
  //개봉일
  const release = document.getElementById("movie_release");
  release.textContent = `${object.release_date}`;
  //평점
  const vote = document.getElementById("movie_vote");
  vote.textContent = `${object.vote_average}`;
  //줄거리
  const overview = document.getElementById("movie_overview");
  overview.textContent = `${object.overview}`;
  //영화 포스터 화면에 표시
  const postCard = document.getElementsByClassName("movie_poster_wrap")[0];
  postCard.innerHTML = `
    <img src="${posterImgPath + object.poster_path}" alt="">
  `;
}

//출연진
//cast에서 15명까지만

fetch(
  `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko`,
  options
)
  .then((response) => response.json())
  //.then((response) => console.log(response))
  //.then((jsonData) => jsonData.crew.filter(({ job }) => job === "Director"))
  .then((data) => {
    console.log(data);
    if (!data || !data.cast) {
      console.error("출연진 데이터에 cast 정보가 없습니다.");
      return;
    }

    const creditsInfo = data.cast;
    const creditsBox = document.getElementsByClassName("credits_wrap")[0];

    creditsInfo.slice(0, 14).forEach((cast) => {
      const cdCard = mkCreditsBox(cast);
      console.log(cdCard);
      creditsBox.appendChild(cdCard);
    });
  })
  .catch((err) => console.error(err));

function mkCreditsBox(cast) {
  const card = document.createElement("div");
  card.className = "credits_card";

  card.innerHTML = `
    <img src="${"https://image.tmdb.org/t/p/w500" + cast.profile_path}" alt="${
    cast.name
  }">
    <h2>${cast.name}</h2>
    <span>${cast.character}역</span>
  `;
  return card;
}

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
