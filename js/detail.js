// Parameter로 넘어오는 id값 처리
let parameters = new URL(location.href).searchParams;
let movieId = parameters.get('id');


//영화 정보
fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko`, options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

//출연진
fetch(
  `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko`,
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
