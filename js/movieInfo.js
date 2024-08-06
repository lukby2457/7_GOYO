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
    //리뷰 입력창에 제목 표시
    const inputTitle = document.querySelector(".inputFormTitle");
  inputTitle.innerHTML = `'${object.title}' 영화 어떠셨나요?`;
}

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

//영화 정보 가져오는 함수
export function showMovieInfo(id, options) {
  fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showInfo(data);
    })
    .catch((err) => console.error(err));
}

export function showCredits(id, options) {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=ko`,
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
}