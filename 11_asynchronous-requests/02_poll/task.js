const poolTittle = document.getElementById("poll__title");
const poolAnswer = document.getElementById("poll__answers");
let buttonAnswers;

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");
xhr.responseType = "json";
xhr.send();

xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE) {
        const result = xhr.response["data"];

        poolTittle.innerHTML += `
            ${result["title"]}
        `
        result["answers"].forEach(elm => {
            poolAnswer.innerHTML += `
                <button class="poll__answer">
                    ${elm}
                </button>
            `
        });

        buttonAnswers = Array.from( document.getElementsByClassName("poll__answer") );
        buttonAnswers.forEach(elem => elem.onclick = () => {
            alert("Спасибо, ваш голос засчитан!");
        });
   }
});
