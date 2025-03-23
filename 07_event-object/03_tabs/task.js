function isArrayElements(className) {
    return Array.from(document.getElementsByClassName(className));
}

function addClass(array, index, className) {
    return array[index].classList.add(className);
}

function delClass(arrOfArray, index, arrClassName) {
    return arrOfArray.forEach(arr => {
        arrClassName.forEach(itemClass => arr[index].classList.remove(itemClass))
    });
}

const divClassTab = isArrayElements("tab");

divClassTab.forEach( (item, index) => item.onclick = () => {
    const divClassTabContent = isArrayElements("tab__content");
    const indexActiveElement = divClassTab.findIndex(item => item.classList.contains("tab_active"));

    delClass([divClassTab, divClassTabContent], indexActiveElement, ["tab__content_active", "tab_active"]);
    
    addClass(divClassTab, index, "tab_active");
    addClass(divClassTabContent, index, "tab__content_active");
})