window.onload = function () {
    document.addEventListener("DOMContentLoaded", function () {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('id');
        console.log(movieId);
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODcyOWQ0NWJlYmUyODE2NWNkMTRiZjExNjMxODZiNyIsInN1YiI6IjY1OTUxZGQzNTkwN2RlNjlmOTYzYmVlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ht5Y9ao6JK1UztEJ5lw7LFKMomCbsPdyFkOo0VUtBEI'
            }
        };

        const url1 = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        const url2 = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
        const moviePoster = document.getElementById('moviePoster');
        const viewDetails = document.getElementById('viewDetails');
        const aboutCast = document.querySelector('.aboutCast');

        Promise.all([
            fetch(url1, options),
            fetch(url2, options),
        ])
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(([movieData, creditsData]) => {
                const directors = creditsData.crew.filter(member => member.job === 'Director');
                moviePoster.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movieData.poster_path}" alt="${movieData.title}" width="300" style="border-radius: 20px;">
            `;
                viewDetails.innerHTML = `
            <div class="aboutMovie">
              <h1>${movieData.title}</h1>
              <p class="tagline">"Fear can hold you prisoner. Hope can set you free."</p>
              <p class="movieinfo">Release: ${movieData.release_date}<br>
                Director: ${directors.map(director => director.name).join(', ')}<br>
                Genre: ${movieData.genres.map(genre => genre.name).join(', ')}<br>
                Run time: ${movieData.runtime}min<br>
                Rate: ${movieData.vote_average} / 10</p>
              <p class="overview">${movieData.overview}</p>
            </div>
            `;

                const actors = creditsData.cast.slice(0, 5);
                aboutCast.innerHTML = `
        ${actors.map(actor => `
            <div class="castCard">
                <div class="castPhoto">
                <img src="https://image.tmdb.org/t/p/w500${actor.profile_path}" alt="${actor.name}" width="100">
                </div>
                <div class="castInfo">
                <p class="castName">${actor.name}</p>
                <p class="character">${actor.character}</p>
                </div>
            </div>
        `).join('')}
    `;
            })
            .catch(err => console.error(err));
    });
}


// document.getElementById("btn").addEventListener("click", surf); //검색 버튼 클릭 시, 데이터 찾기 실행
// surfInput.addEventListener("keydown", ({ key }) => {
//   //엔터키로 검색어 입력 시, 데이터 찾기 실행
//   if (key !== "Enter") {
//     return;
//   }
//   surf();
// });
// function surf() {
//   //실행할 함수
//   fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
//     .then((response) => response.json())
//     .then((response) => {
//       const surfTerm = document.getElementById("surfInput").value.trim().toUpperCase(); //검색창 입력값 받아옴
//       const movieDiv2 = document.getElementById("movie"); //받아온 데이터 출력할 div
//       const filtered = response.results.filter((movie) => movie.title.toUpperCase().includes(surfTerm)); //필터기능
//       console.log(filtered);
//       movieDiv2.innerHTML = "";

//       filtered.forEach((movie) => {
//         movieDiv2.innerHTML += `
//                             <li class="movieCard" movieId="${movie.id}">
//                              <h2>${movie.title}</h2>
//                              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
//                              <p>${movie.overview}</p>
//                              <p>Ratings ${movie.vote_average}/10</p>
//                              </li>`;
//       });

//       if (!surfTerm) {
//         //input창에 아무것도 없는 경우, 경고창 띄우기
//         alert("Please enter a movie title.");
//         document.getElementById("surfInput").focus();
//       }

//       if (filtered.length === 0) {
//         alert(`Sorry! Not matching search keywords in this page.\nPlease enter another movie title.`);
//         document.getElementById("surfInput").focus();
//       }

//       const movieAll = document.querySelectorAll(".movieCard");
//       movieAll.forEach((movie) => movie.addEventListener("click", clickBox));

//       function clickBox(event) {
//         alert(`Movie ID: ${event.currentTarget.getAttribute("movieId")}`);
//       }
//     })
//   .catch ((err) => console.error(err));
// }