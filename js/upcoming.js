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
        nowPlaying.innerHTML;
        const nowCard = document.createElement("div");
        nowCard.classList.add("nowplayingCard");
        nowCard.setAttribute("movieId", movie.id);

        const movieImage = document.createElement("img");
        movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movieImage.alt = "";

        /** 포스터 이미지 클릭하면 유튜브 영상이 있는 브라우저 띄우기 */

        nowCard.addEventListener("click", () => {
          const movie_id = movie.id;
          fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos`, options)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error!`);
              }
              return response.json();
            })
            .then((data) => {
              const videoKey = data.results[0].key;
              const videoURL = `https://www.youtube.com/embed/${videoKey}`;

              function openVideoPopup(videoURL) {
                const popupWidth = 560;
                const popupHeight = 315;
                const left = window.innerWidth / 2 - popupWidth / 2;
                const top = window.innerHeight / 2 - popupHeight / 2;

                const popupFeatures = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=no,status=no`;

                const popupWindow = window.open("", "VideoPopup", popupFeatures);

                if (popupWindow) {
                  popupWindow.document.title = "iFlix: Watch Trailors";
                  popupWindow.document.body.style.overflow = "hidden";
                  popupWindow.document.body.style.margin = "0px";
                  popupWindow.document.body.innerHTML = `
                <iframe width="${popupWidth}" height="${popupHeight}" 
                src="${videoURL}" title="Youtube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen></iframe>
                `;
                } else {
                  alert("Popup window blocked. Please allow popups for this site.");
                }
              }
              openVideoPopup(videoURL);
            })
            .catch((error) => {
              alert.error("Error fetching data:", error);
            });
        });

        /** 이미지 마우스 오버 효과 */
        nowCard.addEventListener("mouseover", () => {
          movieImage.style.transform = "scale(1.1)";
          movieImage.style.filter = "brightness(0.4)";

          const movieInfo = document.createElement("div");
          movieInfo.classList.add("movieInfo");
          movieInfo.innerHTML = `
            <p class="playingtitle">${movie.title}</p>
            <p class="releaseDate">Release Date<br>${movie.release_date}</p>
            <p class="releaseDate">Rate<br>${movie.vote_average}</p>
          `;

          nowCard.appendChild(movieInfo);
        });

        /** 이미지 마우스 아웃 시 효과 제거 */
        nowCard.addEventListener("mouseout", () => {
          movieImage.style.transform = "";
          movieImage.style.filter = "";

          const movieInfo = nowCard.querySelector(".movieInfo");
          if (movieInfo) {
            nowCard.removeChild(movieInfo);
          }
        });

        nowCard.appendChild(movieImage);
        nowPlayingContainer.appendChild(nowCard);
      });
    }

    nowPlaying();
  });

/** 검색 기능 */
function surf() {
  const surfTerm = document.getElementById("surfInput").value.trim().toUpperCase();
  const topRatednowCard = document.getElementById("topRated-nowCard"); // 수정된 부분

  if (!surfTerm) {
    alert("Please enter a movie title.");
    document.getElementById("surfInput").focus();
    return; // 검색어를 입력하지 않은 경우 함수 종료
  }

  fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
    .then((response) => response.json())
    .then((response) => {
      const filtered = response.results.filter((movie) => movie.title.toUpperCase().includes(surfTerm));
      console.log(filtered);

      if (filtered.length === 0) {
        alert(`Sorry! Not matching search keywords in this page.\nPlease enter another movie title.`);
        document.getElementById("surfInput").focus();
      } else {
        // 영화 목록을 표시
        topRatednowCard.innerHTML = ""; // 내용을 초기화

        filtered.forEach((movie) => {
          const nowCard = document.createElement("div");
          nowCard.classList.add("nowplayingCard");
          nowCard.innerHTML += `<li class="nowCard" movieId="${movie.id}">
          <h2>${movie.title}</h2>
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
          <p>${movie.overview}</p>
          <p class="releaseDate">Release Date<br>${movie.release_date}</p>
          <p class="releaseDate">Rate<br>${movie.vote_average}</p>
        </li>`;

          nowCard.addEventListener("click", () => {
            const movie_id = movie.id;
            fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos`, options)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error!`);
                }
                return response.json();
              })
              .then((data) => {
                const videoKey = data.results[0].key;
                const videoURL = `https://www.youtube.com/embed/${videoKey}`;

                function openVideoPopup(videoURL) {
                  const popupWidth = 560;
                  const popupHeight = 315;
                  const left = window.innerWidth / 2 - popupWidth / 2;
                  const top = window.innerHeight / 2 - popupHeight / 2;

                  const popupFeatures = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=no,status=no`;

                  const popupWindow = window.open("", "VideoPopup", popupFeatures);

                  if (popupWindow) {
                    popupWindow.document.title = "iFlix: Watch Trailors";
                    popupWindow.document.body.style.overflow = "hidden";
                    popupWindow.document.body.style.margin = "0px";
                    popupWindow.document.body.innerHTML = `
                    <iframe width="${popupWidth}" height="${popupHeight}" 
                    src="${videoURL}" title="Youtube video player" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen></iframe>
                    `;
                  } else {
                    alert("Popup window blocked. Please allow popups for this site.");
                  }
                }
                openVideoPopup(videoURL);
              })
              .catch((error) => {
                alert.error("Error fetching data:", error);
              });
          });
          topRatednowCard.appendChild(nowCard);
        });
      }
    })
    .catch((err) => console.error(err));
}

document.getElementById("btn").addEventListener("click", surf);
document.getElementById("surfInput").addEventListener("keydown", ({ key }) => {
  // 엔터키로 검색어 입력 시, 데이터 찾기 실행
  if (key !== "Enter") {
    return;
  }
  surf();
});
