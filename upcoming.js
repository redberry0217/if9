/** TMDB 데이터 불러오기 */
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmI2ZGJkM2YxNTIwYzU0Mzk4OGMxZWQ3ZTIwNTUyZCIsInN1YiI6IjY1OTYxYjkxNTkwN2RlNjYyNTYzYzAwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p8IC4h9MKHXEqeoBrSxdS0xHXBWkwoCiNYdn9Xf1HZ4"
  }
};

/** 데이터 불러와서 상영중 영화 카드 붙이기 */
fetch("https://api.themoviedb.org/3/movie/now_playing", options)
  .then((response) => response.json())
  .then((response) => {

    /** 상영중 카드 붙이는 함수 */
    function nowPlaying() {
      const nowPlayingContainer = document.getElementById("nowPlaying");

      response.results.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("nowplayingCard");
        movieCard.setAttribute("movieId", movie.id);

        const movieImage = document.createElement("img");
        movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movieImage.alt = "";

        movieCard.addEventListener("click", () => {
          const searchQuery = encodeURIComponent(`${movie.title} trailer`);
          window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, "_blank");
        });

        /** 이미지 마우스 오버 효과 */
        movieCard.addEventListener("mouseover", () => {
          movieImage.style.transform = "scale(1.1)";
          movieImage.style.filter = "brightness(0.5)";

          const movieInfo = document.createElement("div");
          movieInfo.classList.add("movieInfo");
          movieInfo.innerHTML = `
            <p class="playingtitle">${movie.title}</p>
            <p class="releaseDate">Release Date<br>${movie.release_date}</p>
          `;

          movieCard.appendChild(movieInfo);
        });

        /** 이미지 마우스 아웃 시 효과 제거 */
        movieCard.addEventListener("mouseout", () => {
          movieImage.style.transform = "";
          movieImage.style.filter = "";

          const movieInfo = movieCard.querySelector(".movieInfo");
          if (movieInfo) {
            movieCard.removeChild(movieInfo);
          }
        });

        movieCard.appendChild(movieImage);
        nowPlayingContainer.appendChild(movieCard);
      });
    }

    nowPlaying();
  });
