const reviewDiv = document.getElementById("reviewDiv");
const nickname = document.getElementById("nickname");
const password = document.getElementById("password");
const review = document.getElementById("review");
const writeBtn = document.getElementById("writeBtn");

let revealArr = [];

const getComments = () => {
  let comments = localStorage.getItem("comments");

  if (comments) {
    revealArr.push(JSON.parse(comments));

    for (let i = 0; i < revealArr.length; i++) {
      let boxItem = document.createElement("li");
      boxItem.append("이름: " + revealArr[i].nickname + "댓글: " + revealArr[i].review);

      let mkBoxItem = mkBoxItem + reviewBox.appendChild(boxItem);
    }
    return mkBoxItem;
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

  localStorage.setItem("comments", JSON.stringify(reviewObj));
  let writeComment = localStorage.getItem("comments");
  let tempArr = JSON.parse(writeComment);
  let commentArr = [];
  commentArr.push(tempArr);

  for (let i = 0; i < commentArr.length; i++) {
    let boxItem = document.createElement("li");
    boxItem.append("이름: " + commentArr[i].nickname + "댓글: " + commentArr[i].review);

    reviewBox.appendChild(boxItem);
  }
});

/*

let getReview = getComments();
getReview.push(reviewObj);

localStorage.setItem("comments", JSON.stringify(getReview));



function loadComments() {
  let commentBox = document.getElementById("reviewBox");
  commentBox.innerHTML = "";

  let comments = getComments();

  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];

    /*
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    ul.appendChild(li);

    let boxItem = document.createElement("li");
    boxItem.append("<strong>" + comment.nickname + ":</strong> " + comment.review);

    commentBox.appendChild(boxItem);
  }
}


commentForm.addEventListener("submit", function (e) {
  const newComment = document.createElement("li");
  const bTag = document.createElement("b");
  bTag.append(nickname);
  newComment.append(bTag);
  newComment.append(`- ${comment}`);
  console.log(newComment);

  console.log(nicknameInput.value, passwordInput.value, reviewInput.value);
});

function createComment() {
  const nickname = document.getElementById("nickname").value; //받아오는 입력값
  const password = document.getElementById("password").value;
  const review = document.getElementById("review").value;

  const commentBox = {
    nickname,
    password,
    review
  };

  localStorage.setItem("review", JSON.stringify(commentBox));
  const makeCommentBox = document.createElement("div");

  let getCommentBox = localStorage.getItem("review");
  let useCommentBox = JSON.parse(getCommentBox);

  makeCommentBox.append(useCommentBox);
  return commentBox.nickname;
}

createComment();
 */
