const reviewDiv = document.getElementById("reviewDiv");
const nickname = document.getElementById("nickname");
const password = document.getElementById("password");
const review = document.getElementById("review");
const writeBtn = document.getElementById("writeBtn");
const nothing = document.getElementById("nothing");
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
    nothing.remove();
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

  //빈칸인 채로 입력 시, 경고문구 띄우기
  if (reviewObj.nickname == "") {
    alert("닉네임을 입력해주세요.");
    nickname.focus();
    return;
  } else if (reviewObj.password == "") {
    alert("비밀번호를 입력해주세요.");
    password.focus();
    return;
  } else if (reviewObj.review == "") {
    alert("리뷰를 작성해주세요.");
    review.focus();
    return;
  }

  if (reviewObj.password.length < 4 || reviewObj.password.length > 6) {
    alert("비밀번호를 4~6글자 사이로 설정해주세요.");
    password.focus();
    return;
  }
  const arr = []; //이전에 작성했던 데이터 초기화 및 새로 작성한 데이터 저장

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

  console.log(writeComment.nickname);
  let [commentBox] = document.getElementsByClassName("commentBox");
  const addComment = document.createElement("ul");
  console.log(commentBox);
  tempArr.forEach((e) => {
    addComment.innerHTML = `
      <li>${e.nickname}</li>
      <span>${formatDate}</span>
      <hr></hr>
      <li> ${e.review}</li>`;
  });
  commentBox.prepend(addComment);
}

reviewDiv.addEventListener("keydown", ({ key }) => {
  if (key !== "Enter") {
    return;
  }
  mkReview();
});
