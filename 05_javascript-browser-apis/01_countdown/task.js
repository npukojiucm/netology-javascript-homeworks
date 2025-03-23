const span = document.getElementById('timer');
let copySpanTimer = Number(span.textContent);

const timer = new Date();

let intervalId = setInterval(() => {
    copySpanTimer = copySpanTimer - 1;
    if (copySpanTimer === 0) {
        // alert("Вы победили в конкурсе!»")
        document.location.assign('https://www.ritlabs.com/download/the_bat/thebat_64_10-3-2.msi')
    }
    timer.setHours(0, 0, copySpanTimer);
    span.textContent = timer.toLocaleTimeString();
    console.log(timer.toLocaleTimeString());
    
}, 1000)

intervalId;