
// 내 apikey
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDFhYTY0NDIxMWQ1MWFhZjc1MTQ1MWQxNjhlMjYwYiIsIm5iZiI6MTcyMjUwNTg4MS41ODgxNTQsInN1YiI6IjY2OWY0MDMxMTcwMThmZjM3YWRkYWM5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._CtNsp6MzArRXrZD4tB9UYuEd67S3NWdapeq0boCcic';

const optionsBanner = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };
  

//영화정보 가져오는 기능
  async function fetchMovie() { 
    try {//try catch문
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', optionsBanner);
        const data = await response.json();
        console.log(data)
        return data.results;
    } catch (err) {
        console.error('Error', err);
    }
   
  }

//각 배너아이템에 정보넣기
  async function bannerMovie() {
    const mvApi = await fetchMovie();//fetchMovie함수 담기
    const bannerItem = document.querySelectorAll('.banner-item');
    const bannerTitle = document.querySelectorAll('.bannerTitle h2');

    bannerItem.forEach((item,index) => { //배너수만큼 반복
        if(index < mvApi.length){ //아이템의 수가 mvApi수보다 적을때 실행해
            const idx = mvApi[index], //mvApi 인덱스 담기
              moviesItemCreate = document.createElement('div'),
              itemVideoBox = document.createElement('div'),
              itemVideo = document.createElement('video');

              moviesItemCreate.classList.add('b-item');
              itemVideoBox.classList.add('itemVideoBox');
              itemVideo.classList.add('itemVideo');

              if(bannerTitle[index]){
                bannerTitle[index].textContent = `${idx.title}`
              };

            moviesItemCreate.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${idx.poster_path}" alt="${idx.title}">
                <h2>${idx.title}</h2>
            `;
            item.appendChild(moviesItemCreate);    
            item.appendChild(itemVideoBox);    
            itemVideoBox.appendChild(itemVideo);


        }
    });
  }

  bannerMovie()

  async function bannerDetail() {
    const mvApi = await fetchMovie();
    const detailBtn = document.querySelectorAll('.detailBtn');
    detailBtn.forEach((item,index)=>{
      const idx = mvApi[index];
      const url = "./detail.html";
      detailBtn[index].addEventListener('click', (e) => {
        const detailUrl = `${url}?id=${idx.id}`
        window.open(detailUrl, '_self'); 

        console.log(`클릭클릭 : ${index}${idx.id}${detailUrl}`)
      })
    });

  };
  bannerDetail()

  