const img = document.getElementById("loader");
const items = document.getElementById("items");

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/slow-get-courses");
xhr.responseType = "json";
xhr.send();

xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE) {
        const result = xhr.response["response"]["Valute"];

        for (let key in result) {
            items.innerHTML += `
                <div class="item">
                    <div class="item__code">
                        ${result[key]["CharCode"]}
                    </div>
                    <div class="item__value">
                        ${result[key]["Value"]}
                    </div>
                    <div class="item__currency">
                        руб.
                    </div>
                </div>
            `
        }

        img.classList.remove("loader_active");
    }
});