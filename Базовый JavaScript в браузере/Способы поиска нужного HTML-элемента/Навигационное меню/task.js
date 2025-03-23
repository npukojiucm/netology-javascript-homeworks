(() => {
    function getFilterArrayElements(className, parentClass) {
        return Array.from( document.getElementsByClassName( className ) ).filter(
            item => item.closest( `.${parentClass}`));
    }    
        
    const menuMain = getFilterArrayElements("menu__link", "menu_main").filter(
        item => item.nextElementSibling);
    
    const menuFoot = getFilterArrayElements("menu__link", "menu_foot").filter(
        item => item.nextElementSibling);

    
    menuMain.forEach((item, index) => item.onclick = () => {
        const menuSubMain = getFilterArrayElements("menu_sub", "menu_main");
        const indexActiveElem = menuSubMain.findIndex(item => item.classList.contains("menu_active"));

        
        if (indexActiveElem === -1 || indexActiveElem === index) {
            menuSubMain[index].classList.toggle("menu_active");
            return false;
        
        } else {
            menuSubMain[indexActiveElem].classList.remove("menu_active");
            menuSubMain[index].classList.toggle("menu_active");
            return false;
        }
        
    });
    
    menuFoot.forEach((item, index) => item.onclick = () => {
        const menuSubMain = getFilterArrayElements("menu_sub", "menu_foot");
        const indexActiveElem = menuSubMain.findIndex(item => item.classList.contains("menu_active"));
        
        if (indexActiveElem === -1 || indexActiveElem === index) {
            menuSubMain[index].classList.toggle("menu_active");
            return false;
        
        } else {
            menuSubMain[indexActiveElem].classList.remove("menu_active");
            menuSubMain[index].classList.toggle("menu_active");
            return false;
        }
    })
})();