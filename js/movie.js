// TMDB에서 Top Rated 20개 들고오는 function
export function loadCards(location, options, arr1, arr2) {
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((datas) => {
      const dataArr = datas.results;

      dataArr.forEach((data) => {
        const card = createCard(data);
        location.appendChild(card);

        // 검색용 array에 값 주입
        arr1.push(data.title);
        arr2.push(data.id);
      });
    })
    .catch((err) => console.error(err));
}

// card를 하나 만드는 function
function createCard(object) {
  const imgPath = "https://image.tmdb.org/t/p/w500";

  const card = document.createElement("div");
  card.className = "card";
  card.id = `${object.id}`;
  card.innerHTML = `
    <div class="cardWrap">
      <div>
        <img src="${imgPath + object.poster_path}">
        <h2>${object.title}</h2>
      </div>
      <p class="rating"><ion-icon name="thumbs-up-outline"></ion-icon>  ${object.vote_average.toFixed(1)}</p>
    </div>
    <div class="detailBtnWrap">
      <button onclick="location.href='detail.html?id=${object.id}'" class="goDetail">상세보기</button>
    </div>
    `;

  return card;
}
