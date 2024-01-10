const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjY3MzVkN2IwNGY1NmVkZmY0ZmYxNjhhYjVhZTg1YSIsInN1YiI6IjY1OTUyZmUyZDdhNzBhMTIyZTY5MzcyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7VQTyH_ANq4ILJF9OwsBSBYEz_N7EY5hlKpkesNbJu4",
  },
};

const obj = [
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options,
];
const movieListDiv = document.getElementById("movieList");

fetch(obj[0], obj[1])
  .then((response) => response.json())
  .then((response) => {
    response.results.forEach((movie) => {
      const movieDive = document.createElement("div");
      movieDive.innerHTML = `
      <div class="movieCard">
        <div class="movieCard-center">
        <div >
        <div onclick="handleImageClick('${movie.id}')">
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"  class="movieCard-img" alt="" />
        </div>
          <div class="movieCard-title">
            <h5>${movie.title}</h5>
          </div>
          <p class="movieCard-content">${movie.overview}</p>
          <p class="movieCard-vote-average">평점 ${movie.vote_average}</p> 
        </div>
      </div>`;
      movieListDiv.appendChild(movieDive);
    });
    console.log(response);
  })
  .catch((err) => console.error(err));

const handleImageClick = (movieId) => {
  alert(`영화 아이디: ${movieId}`);
};

const findMovie = () => {
  let search = document.getElementById("search").value;

  fetch(obj[0], obj[1])
    .then((response) => response.json())
    .then((response) => {
      response.results.forEach((movie) => {
        const movieSearchDiv = document.getElementById("searchList");

        if (search.toLowerCase() === movie.title.toLowerCase()) {
          const searchDive = document.createElement("div");
          searchDive.innerHTML = `
            <div class="movieCard-center">
              <div class="movieCard">
                <div onclick="handleImageClick('${movie.id}')">
                  <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="movieCard-img" alt="" />
                </div>
                <div class="movieCard-title">
                  <h5>${movie.title}</h5>
                </div>
                <p class="movieCard-content">${movie.overview}</p>
                <p class="movieCard-vote-average">평점 ${movie.vote_average}</p> 
              </div>
            </div>`;

          movieListDiv.innerHTML = "";
          movieSearchDiv.appendChild(searchDive);
        }
      });
    });
};
