(() => {

    let interval = setInterval(k, 1000, "rotator__case", "rotator__case_active");

    function getArrayClass(className) {
        return Array.from(document.getElementsByClassName(className));
    }

    function delClassAndReturnIndex(arrClass, delClass) {
        let index = arrClass.findIndex(elm => elm.classList.contains(delClass));
        arrClass[index].classList.toggle(delClass);

        if (index === arrClass.length - 1) {
            index = 0;
        } else {
            index++;
        }
        
        return index;
    }
    
    
    function k(className, delClass) {
        const arr = getArrayClass(className); // "rotator__case"
        const indexNextElem = delClassAndReturnIndex(arr, delClass);  // "rotator__case_active"

        const dataSet = arr[indexNextElem].dataset
        const color = dataSet.color
        const speed = dataSet.speed
        
        arr[indexNextElem].classList.toggle(delClass);  // "rotator__case_active"
        arr[indexNextElem].style.color = color;
        
        clearInterval(interval);
        interval = null;
        interval = setInterval(k, speed, "rotator__case", "rotator__case_active");
    }
    
})();