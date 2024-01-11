const reviewDiv = document.getElementById("reviewDiv");
const nickname = document.getElementById("nickname");
const password = document.getElementById("password");
const review = document.getElementById("review");
const writeBtn = document.getElementById("writeBtn");

let revealArr = [];

const getComments = () => {
  let comments = localStorage.getItem("comments");

  if (comments.length >= 1) {
    revealArr.push(JSON.parse(comments));

    revealArr.forEach((e) => {
      const stackReview = document.getElementById("stackReview");
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
  const reviewObj = {
    nickname: nickname.value,
    password: password.value,
    review: review.value
  };
  const arr = [];

  if (JSON.parse(localStorage.getItem("comments")) !== null) {
    arr.push(...JSON.parse(localStorage.getItem("comments")));
    arr.push(reviewObj);
    localStorage.setItem("comments", JSON.stringify(arr));
  } else {
    arr.push(reviewObj);
    localStorage.setItem("comments", JSON.stringify(arr));
  }

  let writeComment = localStorage.getItem("comments");
  let tempArr = JSON.parse(writeComment);

  let [commentBox] = document.getElementsByClassName("commentBox");
  const addComment = document.createElement("li");

  tempArr.forEach((e) => {
    addComment.innerHTML = `
    <li>이름: ${e.nickname}</li>
    <li>댓글: ${e.review}</li>`;
  });
  commentBox.appendChild(addComment);
});
