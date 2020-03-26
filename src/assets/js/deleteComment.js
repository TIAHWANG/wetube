import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delBtns = document.querySelectorAll(".comments__delete");

const decreaseCommentNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = (commentId, btn) => {
    const span = btn.parentNode;
    const li = span.parentNode;
    commentList.removeChild(li);
    decreaseCommentNumber();
};

const handleDelete = async e => {
    const btn = e.target;
    const commentId = btn.id;
    const response = await axios({
        url: `/api/${commentId}/comment/delete`,
        method: "POST",
        data: {
            commentId
        }
    });
    if (response.status === 200) {
        deleteComment(commentId, btn);
    }
};

function init() {
    Array.from(delBtns).forEach(btn =>
        btn.addEventListener("click", handleDelete)
    );
}

if (commentList) {
    init();
}
