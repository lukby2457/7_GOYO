// TMDB에서 Upcoming 20개 API 들고오는 function
export function loadUpcomingCards(location, options, arr1, arr2) {
  fetch(
    'https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1',
    options
  )
  .then(response => response.json())
      .then((datas) => {
        const dataUpcomingArr = datas.results;
  
        dataUpcomingArr.forEach((data) => {
          const upcomingCard = createUpcomingCard(data);
          location.appendChild(upcomingCard);
  
          // 검색용 array에 값 주입
          arr1.push(data.title);
          arr2.push(data.id);
        });
      })
      .catch((err) => console.error(err));
  }
  
  // card를 하나 만드는 function
  function createUpcomingCard(object) {
    const imgPath = "https://image.tmdb.org/t/p/w500";
  
    const upcomingCard = document.createElement("div");
    upcomingCard.className = "card";
    upcomingCard.id = `${object.id}`;
    upcomingCard.innerHTML = `
      <div class="cardWrap">
        <div>
          <img src="${imgPath + object.poster_path}">
          <h2>${object.title}</h2>
        </div>
        <p class="rating"><ion-icon name="thumbs-up-outline"></ion-icon>  ${object.vote_average.toFixed(1)}</p>
      </div>
      <div class="detailBtnWrap">
        <button onclick="location.href='./detail.html?id=${object.id}'" class="goDetail">상세보기</button>
      </div>
      `;
  
    return upcomingCard;
  }
  