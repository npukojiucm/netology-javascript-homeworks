const textarea = document.getElementById("editor");

textarea.value = localStorage.note ?? textarea.value;

textarea.oninput = () => {
    localStorage.note = textarea.value;
}