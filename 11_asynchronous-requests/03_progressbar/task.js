const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const progressBar = document.querySelector("progress");

    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (e) => {
        progressBar.value = (e.loaded / e.total).toFixed(2);
    }

    const formData = new FormData(form);

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
    xhr.send(formData);
});
