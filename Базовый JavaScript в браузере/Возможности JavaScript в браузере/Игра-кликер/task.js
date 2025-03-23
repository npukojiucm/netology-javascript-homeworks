const spanCountClick = document.getElementById('clicker__counter');
const spanSpeedClick = document.getElementById('clicker__speed');
const img = document.getElementById('cookie');

let start = new Date().getTime();

img.onclick = () => {
    spanCountClick.textContent = +spanCountClick.textContent + 1;
    if (+img.width === 300) {
        img.width = "200";    
    } else {
        img.width = "300";
    }


    let end = new Date().getTime();
    let speedClick = 1 / ((end - start) / 1000);
    
    spanSpeedClick.textContent = parseInt((speedClick * 100)) / 100;

    start = new Date().getTime();
}