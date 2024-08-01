const optionsBanner = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDFhYTY0NDIxMWQ1MWFhZjc1MTQ1MWQxNjhlMjYwYiIsIm5iZiI6MTcyMjUwNTg4MS41ODgxNTQsInN1YiI6IjY2OWY0MDMxMTcwMThmZjM3YWRkYWM5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._CtNsp6MzArRXrZD4tB9UYuEd67S3NWdapeq0boCcic'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', optionsBanner)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const bannerItem = document.querySelectorAll('.banner-item');

        bannerItem.forEach((item,index) => { //배너수만큼 반복
            if(index < data.results.length){ 
                const idx = data.results[index];
                const moviesItemCreate = document.createElement('div');
                moviesItemCreate.classList.add('b-item');

                moviesItemCreate.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${idx.poster_path}" alt="${idx.title}">
                    <h2>${idx.title}</h2>
                `;
                item.appendChild(moviesItemCreate);    
            }
        });
    })
    .catch(err => console.error(err));

    //1번배너 > 1번인덱스의 영화정보만 자식으로 들어가도록