const divForm = document.getElementById("signin");
const form = document.getElementById("signin__form");

if (localStorage.length === 0) {
    divForm.classList.add("signin_active");
} else {
    activateWelcome("welcome");
}

function authentication(response) {
    if (response["success"]) {
        localStorage.user_id = response["user_id"];
        activateWelcome("welcome");
    } else {
        return alert("Неверный логин/пароль");
    }
}

function activateWelcome(classWelcome) {
    const divWelcome = document.getElementById(classWelcome);
    const childSpan = document.getElementById("user_id");

    divForm.classList.remove("signin_active");

    divWelcome.classList.add("welcome_active");
    childSpan.textContent = localStorage.getItem("user_id");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    const formData = new FormData(form);

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/auth");
    xhr.send(formData);

    xhr.addEventListener("readystatechange", (e) => {
        if (xhr.readyState === xhr.DONE) {
            authentication(xhr.response);
        }
    });
});