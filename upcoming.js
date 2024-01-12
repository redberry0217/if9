/** 상세 페이지 카드를 만드는 함수*/
function loadDetails() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODcyOWQ0NWJlYmUyODE2NWNkMTRiZjExNjMxODZiNyIsInN1YiI6IjY1OTUxZGQzNTkwN2RlNjlmOTYzYmVlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ht5Y9ao6JK1UztEJ5lw7LFKMomCbsPdyFkOo0VUtBEI'
        }
    };

    /** 이 페이지에 사용된 api들*/
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`; // 개봉 예정작

    const viewUpcoming = document.getElementById('viewUpcoming');

    Promise.all([
        fetch(url, options),
    ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(([upcomingMovies]) => {
            const directors = creditsData.crew.filter(member => member.job === 'Director');
            const actors = creditsData.cast.slice(0, 5);
            const postersData = imgData.posters.slice(0, 5);

/** 데이터 불러와서 영화 카드 붙이기 */
fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
  .then((response) => response.json())
  .then((response) => {

    /** 영화 카드 클릭 시 영화 ID값 갖고 이동 */
    function clickBox(event) {
      const movieId = event.currentTarget.getAttribute("movieId");
      window.location.href = `detail.html?id=${movieId}`;
    }

    /** 카드 붙이는 함수 */
    function displayMovies() {
      response.results.forEach((movie) => {
        const movieDiv = document.getElementById("movie");
        movieDiv.innerHTML += `
          <li class="movieCard" movieId="${movie.id}">
            <h2>${movie.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
            <p>${movie.overview}</p>
            <p>Ratings ${movie.vote_average}/10</p>
          </li>`;
      });
      const movieAll = document.querySelectorAll(".movieCard");
      movieAll.forEach((movie) => movie.addEventListener("click", clickBox));
    }
    displayMovies();
  });
        })
        .catch(err => console.error(err));
}