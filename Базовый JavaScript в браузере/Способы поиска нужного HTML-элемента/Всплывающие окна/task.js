(() => {
    const divModalMain = document.getElementById( "modal_main" );
    const divModalSuccess = document.getElementById( "modal_success" );
    const divModalCloseTimes = document.querySelectorAll( ".modal__close_times" );
    const aShowSuccess = document.querySelector( ".show-success" );
    
    divModalMain.classList.add( "modal_active" );
    
    aShowSuccess.onclick = () => {
        divModalMain.classList.remove( "modal_active" );
        divModalSuccess.classList.add( "modal_active" );
    }

    divModalCloseTimes.forEach(item => item.onclick = () => {
        const modalActive = document.querySelector( ".modal_active" );
        console.log(modalActive);
        modalActive.classList.remove( "modal_active" );
    });
})();

