function addDiscussionComment(button) {
    var commentText = button.parentElement.querySelector(".commentText").value;
    if (commentText.trim() === "") {
      alert("Please enter a comment!");
      return;
    }
    var commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.innerHTML = `<div class="user-info">
                                <img src="./assets/images/profile.jpg" width="30" height="30" alt="User Profile Image">
                                <p>User XY</p>
                             </div>
                             <p>${commentText}</p>`;
    button.parentElement.querySelector(".comments").appendChild(commentDiv);
    button.parentElement.querySelector(".commentText").value = "";
  }
  