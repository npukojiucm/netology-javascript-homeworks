const idBook = document.getElementById("book"); // book_fs-big
const fontSize = Array.from( document.getElementsByClassName("font-size") );

const textColor = Array.from( document.getElementsByClassName("color") ).filter(
    elm => elm.closest(".book__control_color")); // book_color-gray

const bgColor = Array.from( document.getElementsByClassName("color") ).filter(
    elm => elm.closest(".book__control_background")); // book_bg-gray



function click(currElem, dataAttr, arrClass, addAndDelClass, parentElem, regexp) {
    const dataAtt = currElem.dataset[dataAttr];
    
    const delClass = () => {
        const index = arrClass.findIndex(elm => elm.classList.contains(addAndDelClass));
        arrClass[index].classList.remove(addAndDelClass);
    }
    
    const parent = () => {
        const reg = new RegExp(regexp);
        const arr = Array.from(parentElem.classList);
   
        arr.forEach(elm => {
            if (reg.test(elm)) {
                parentElem.classList.remove(elm);
        }

        parentElem.classList.add(`${regexp}-${dataAtt}`);
    
        });
    }
    
    delClass();
    parent();
    currElem.classList.add(addAndDelClass);
    
    return false;
}

fontSize.forEach(item => item.onclick = function () {
    return click(
        item, "size", fontSize, "font-size_active", idBook, "book_fs");
})

textColor.forEach(item => item.onclick = function () {
    return click(
        item, "textColor", textColor, "color_active", idBook, "book_color");
})

bgColor.forEach(item => item.onclick = function () {
    return click(
        item, "bgColor", bgColor, "color_active", idBook, "book_bg");
})