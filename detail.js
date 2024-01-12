/** index에서 카드 클릭시 영화 id 정보를 갖고 이동*/
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    loadDetails(movieId);
});

/** 상세 페이지 카드를 만드는 함수*/
function loadDetails(movieId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODcyOWQ0NWJlYmUyODE2NWNkMTRiZjExNjMxODZiNyIsInN1YiI6IjY1OTUxZGQzNTkwN2RlNjlmOTYzYmVlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ht5Y9ao6JK1UztEJ5lw7LFKMomCbsPdyFkOo0VUtBEI'
        }
    };

    /** 이 페이지에 사용된 api들*/
    const url1 = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`; // 영화 상세 정보
    const url2 = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`; // 영화 크레딧(배우, 제작진)
    const url3 = `https://api.themoviedb.org/3/movie/${movieId}/images`; // 영화 이미지

    const viewDetails = document.getElementById('viewDetails');

    Promise.all([
        fetch(url1, options),
        fetch(url2, options),
        fetch(url3, options),
    ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(([movieData, creditsData, imgData]) => {
            const directors = creditsData.crew.filter(member => member.job === 'Director');
            const actors = creditsData.cast.slice(0, 5);
            const postersData = imgData.posters.slice(0, 5);

            /** 포스터 이미지를 클릭하면 다음 이미지로 이동 */
            let currentPosterIndex = 0;

            function handleImageClick() {
                currentPosterIndex = (currentPosterIndex + 1) % postersData.length;
                const nextPosterPath = postersData[currentPosterIndex].file_path;
                document.getElementById('moviePoster').querySelector('img').src = `https://image.tmdb.org/t/p/w500${nextPosterPath}`;
            }

            /** 영화 상세내용 카드 */
            viewDetails.innerHTML = `
            <div class="detailCards">
            <div class="moviePoster" id="moviePoster">
              <img src="https://image.tmdb.org/t/p/w500${postersData[0].file_path}" alt="${movieData.title}" title="클릭하여 다음 이미지 보기" width="300" style="border-radius: 20px;">
            </div>
            <div class="movieDatails" id="movieDatails">
              <div class="aboutMovie">
                <h1>${movieData.title}</h1>
                <p class="tagline">"${movieData.tagline}"</p>
                <p class="movieinfo">Release: ${movieData.release_date}<br>
                  Director: ${directors.map(director => director.name).join(', ')}<br>
                  Genre: ${movieData.genres.map(genre => genre.name).join(', ')}<br>
                  Run time: ${movieData.runtime} min<br>
                  Rate: ${movieData.vote_average} / 10</p>
                <p class="overview">"${movieData.overview}"</p>
              </div>
              <div class="aboutCast" id="aboutCast">
              ${actors.map(actor => `
              <div class="castCard">
                  <div class="castPhoto">
                  <img src="https://image.tmdb.org/t/p/w500${actor.profile_path}" alt="${actor.name}" width="100" style="border-radius: 10px;>
                  </div>
                  <div class="castInfo">
                  <p class="castName">${actor.name}</p>
                  <p class="character">${actor.character}</p>
                  </div>
              </div>
              `).join('')}
            </div>
          </div> 
          `;

            /** 각 이미지에 클릭 이벤트 추가 */
            const posterImages = document.querySelectorAll('.moviePoster img');
            posterImages.forEach(img => {
                img.removeEventListener('click', handleImageClick);
                img.addEventListener('click', handleImageClick);
            });
        })
        .catch(err => console.error(err));
}