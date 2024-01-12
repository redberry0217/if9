const reviewDiv = document.getElementById("reviewDiv");
const nickname = document.getElementById("nickname");
const password = document.getElementById("password");
const review = document.getElementById("review");
const writeBtn = document.getElementById("writeBtn");

const getComments = () => {
  // 우리는 항상 comments가 배열일 것이라고 생각했음
  // 근데 막상 해보니 null이 나옴 -> 왜? localStorage에 'comments'라는 이름으로 아무것도 없었기 때문

  // (1) 첫 번째 방법(일반 if문)
  // if (!localStorage.getItem("comments")) { // null, undefined, ""
  //   // 값이 없는 경우
  //   comments = [];
  // } else {
  //   // 값이 있는 경우
  //   comments = localStorage.getItem("comments");
  // }

  // (2) 두 번째 방법(null 병합연산자)
  // let comments = localStorage.getItem("comments") ?? [];
  const id = movieId;
  let comments = localStorage.getItem(`comments${id}`) ?? [];
  console.log(id);
  console.log(`comments${id}`);

  // (3) 세 번째 방법(3항연산자)
  // let comments = localStorage.getItem("comments") ? localStorage.getItem("comments") : [];
  if (comments.length >= 1) {
    //Cannot read properties of null (reading 'length')
    let revealArr = JSON.parse(comments);
    console.log(revealArr);
    revealArr.forEach((e) => {
      let stackReview = document.getElementById("stackReview");
      console.log(stackReview);
      stackReview.innerHTML += `
                  <li>이름: ${e.nickname}</li>
                  <li>댓글: ${e.review}</li>
                   `;
    });
  } else {
    return alert("댓글이 존재하지 않습니다.");
  }
};

getComments();

writeBtn.addEventListener("click", () => {
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
  const addComment = document.createElement("li");

  tempArr.forEach((e) => {
    addComment.innerHTML = `
    <li>이름: ${e.nickname}</li>
    <li>댓글: ${e.review}</li>`;
  });
  commentBox.appendChild(addComment);
  if (password === (maxlength = "4")) {
  } else {
    alert("비밀번호는 4글자로 ");
  }
});
