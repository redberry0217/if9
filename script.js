const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmI2ZGJkM2YxNTIwYzU0Mzk4OGMxZWQ3ZTIwNTUyZCIsInN1YiI6IjY1OTYxYjkxNTkwN2RlNjYyNTYzYzAwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p8IC4h9MKHXEqeoBrSxdS0xHXBWkwoCiNYdn9Xf1HZ4"
  }
};
fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
  .then((response) => response.json())
  .then((response) => {
    function displayMovies() {
      // 기본 로딩 화면
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
      /*-------------카드 클릭 시 alert창 띄우기-----------------*/
      const movieAll = document.querySelectorAll(".movieCard");
      movieAll.forEach((movie) => movie.addEventListener("click", clickBox));

      function clickBox(event) {
        alert(`Movie ID: ${event.currentTarget.getAttribute("movieId")}`);
      }
    }

    displayMovies();

    console.log(response.results);

    /*-----검색 시 이벤트 발생-----*/

    document.getElementById("btn").addEventListener("click", surf); //검색 버튼 클릭 시, 데이터 찾기 실행
    surfInput.addEventListener("keydown", ({ key }) => {
      //엔터키로 검색어 입력 시, 데이터 찾기 실행
      if (key !== "Enter") {
        return;
      }
      surf();
    });
    function surf() {
      //실행할 함수
      fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
        .then((response) => response.json())
        .then((response) => {
          const surfTerm = document.getElementById("surfInput").value.trim().toUpperCase(); //검색창 입력값 받아옴
          const movieDiv2 = document.getElementById("movie"); //받아온 데이터 출력할 div
          const filtered = response.results.filter((movie) => movie.title.toUpperCase().includes(surfTerm)); //필터기능
          console.log(filtered);
          movieDiv2.innerHTML = "";

          filtered.forEach((movie) => {
            movieDiv2.innerHTML += `
                            <li class="movieCard" movieId="${movie.id}">
                             <h2>${movie.title}</h2>
                             <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
                             <p>${movie.overview}</p>
                             <p>Ratings ${movie.vote_average}/10</p>
                             </li>`;
          });

          if (!surfTerm) {
            //input창에 아무것도 없는 경우, 경고창 띄우기
            alert("Please enter a movie title.");
            document.getElementById("surfInput").focus();
          }

          if (filtered.length === 0) {
            alert(`Sorry! Not matching search keywords in this page.\nPlease enter another movie title.`);
            document.getElementById("surfInput").focus();
          }

          const movieAll = document.querySelectorAll(".movieCard");
          movieAll.forEach((movie) => movie.addEventListener("click", clickBox));

          function clickBox(event) {
            alert(`Movie ID: ${event.currentTarget.getAttribute("movieId")}`);
          }
        });
    }
  })
  .catch((err) => console.error(err));
