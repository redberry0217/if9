const reviewDiv = document.getElementById("reviewDiv");
const nickname = document.getElementById("nickname");
const password = document.getElementById("password");
const review = document.getElementById("review");
const writeBtn = document.getElementById("writeBtn");
// 현재 시간
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const hour = modifyNumber(today.getHours());
const min = modifyNumber(today.getMinutes());
const sec = modifyNumber(today.getSeconds());
function modifyNumber(time) {
  if (parseInt(time) < 10) {
    return "0" + time;
  } else return time;
}
const formatDate = year + "." + ("00" + month.toString()).slice(-2) + "." + ("00" + day.toString()).slice(-2);

const getComments = () => {
  const id = movieId;
  let comments = localStorage.getItem(`comments${id}`) ? localStorage.getItem(`comments${id}`) : [];

  if (comments.length >= 1) {
    //Cannot read properties of null (reading 'length')
    let revealArr = JSON.parse(comments);
    revealArr.forEach((e) => {
      let stackReview = document.getElementById("stackReview");
      stackReview.innerHTML += `
                  <ul>
                  <li>${e.nickname}</li>
                  <span>${formatDate}</span>
                  <hr></hr>
                  <li> ${e.review}</li>
                  </ul>`;
    });
  }
};

getComments();

writeBtn.addEventListener("click", mkReview);
function mkReview() {
  const id = movieId;
  const reviewObj = {
    nickname: nickname.value,
    password: password.value,
    review: review.value
  };
  const arr = [];

  if (JSON.parse(localStorage.getItem(`comments${id}`)) !== null) {
    arr.push(...JSON.parse(localStorage.getItem(`comments${id}`)));
    arr.push(reviewObj);
    localStorage.setItem(`comments${id}`, JSON.stringify(arr));
  } else {
    arr.push(reviewObj);
    localStorage.setItem(`comments${id}`, JSON.stringify(arr));
  }

  let writeComment = localStorage.getItem(`comments${id}`);
  let tempArr = JSON.parse(writeComment);
  let [commentBox] = document.getElementsByClassName("commentBox");
  const addComment = document.createElement("ul");
  console.log(addComment);
  tempArr.forEach((e) => {
    addComment.innerHTML = `
      <li>${e.nickname}</li>
      <hr></hr>
      <li> ${e.review}</li>`;
  });
  console.log(commentBox);
  commentBox.prepend(addComment);
}
document.getElementById("review").addEventListener("keydown", ({ key }) => {
  if (key !== "Enter") {
    return;
  }
  mkReview();
});
