
// 내 apikey
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDFhYTY0NDIxMWQ1MWFhZjc1MTQ1MWQxNjhlMjYwYiIsIm5iZiI6MTcyMjUwNTg4MS41ODgxNTQsInN1YiI6IjY2OWY0MDMxMTcwMThmZjM3YWRkYWM5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._CtNsp6MzArRXrZD4tB9UYuEd67S3NWdapeq0boCcic';

const optionsBanner = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };
  

//영화정보 가져오기
  async function fetchMovie() { 
    try {//try catch문
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', optionsBanner);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error', err);
    }
  }
 
  //각 배너아이템에 영화포스터 넣기
  async function bannerMovie() {
    const mvApi = await fetchMovie();//fetchMovie함수 담기
    const bannerItem = document.querySelectorAll('.banner-item');

    bannerItem.forEach((item,index) => { //배너수만큼 반복
        if(index < mvApi.length){ //아이템의 수가 mvApi수보다 적을때 실행해
            const idx = mvApi[index]; //mvApi 인덱스 담기
            const moviesItemCreate = document.createElement('div');
            moviesItemCreate.classList.add('b-item');

            moviesItemCreate.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${idx.poster_path}" alt="${idx.title}">
                <h2>${idx.title}</h2>
            `;
            item.appendChild(moviesItemCreate);    
        }
    });
  }
        

  bannerMovie()
