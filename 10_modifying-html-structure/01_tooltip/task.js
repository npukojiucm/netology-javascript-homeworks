const a = Array.from( document.getElementsByClassName("has-tooltip") );

const div = document.createElement("div");
div.classList.add("tooltip");

a.forEach(elm => elm.onclick = () => {
    elm.insertAdjacentElement("afterend", div);
    let top = elm.getBoundingClientRect().top

    div.classList.toggle("tooltip_active");
    div.style.left = elm.offsetLeft + "px";
    div.style.top = top + 20 + "px";
    div.textContent = elm.title;

    return false;
});

document.onscroll = () => {
    const div = document.querySelector(".tooltip");

    if (div) {
        div.classList.remove("tooltip_active");
    }
}