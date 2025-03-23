(() => {
    const divDropdownValue = document.querySelector( ".dropdown__value" );
    const ulDropdownList = document.querySelector( ".dropdown__list" );
    const aDropdownLink = Array.from(document.getElementsByClassName( "dropdown__link" ));
    
    
    divDropdownValue.onclick = () => {
        ulDropdownList.classList.toggle( "dropdown__list_active" );
    }
    
    aDropdownLink.forEach(item => item.onclick = () => {
        divDropdownValue.textContent = item.textContent;
        ulDropdownList.classList.toggle( "dropdown__list_active" );
        return false;
    })
})();