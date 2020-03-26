import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delBtns = document.querySelectorAll(".comments__delete");

const decreaseCommentNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = li => {
    commentList.removeChild(li);
    decreaseCommentNumber();
};

const handleDelete = async e => {
    const videoId = window.location.href.split("/videos/")[1];
    const li = e.target.closest("li");
    const commentId = e.target.dataset.delete;
    console.log(commentId, li);
    const response = await axios({
        url: `/api/${videoId}/comment/delete`,
        method: "POST",
        data: {
            commentId
        }
    });
    if (response.status === 200) {
        deleteComment(li);
    }
};

function init() {
    Array.from(delBtns).forEach(btn => {
        btn.addEventListener("click", handleDelete);
    });
}

if (commentList) {
    init();
}
