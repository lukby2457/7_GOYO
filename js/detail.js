//영화 정보
fetch("https://api.themoviedb.org/3/movie/{movie_id}?language=ko", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

//출연진
fetch(
  "https://api.themoviedb.org/3/movie/{movie_id}/credits?language=ko",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
