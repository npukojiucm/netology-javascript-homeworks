const modalWindow = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");

if (document.cookie === "") {
    modalWindow.classList.add("modal_active");
}

modalClose.onclick = () => {
    modalWindow.classList.remove("modal_active");
    document.cookie = "window=" + encodeURI("close");
}