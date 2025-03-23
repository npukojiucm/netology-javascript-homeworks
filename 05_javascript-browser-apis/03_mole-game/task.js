(() => {
    const spanIdDead = document.getElementById( `dead` ),
        spanIdLost = document.getElementById( `lost` ),
        getHole = index => document.getElementById( `hole${index}` ),
        onClick = element => element.onclick = () => {
            if ( element.classList.contains( 'hole_has-mole' ) ) {
                spanIdDead.textContent = +spanIdDead.textContent + 1;
            } else {
                spanIdLost.textContent = +spanIdLost.textContent + 1;
            };
            checkResult();
        },
        checkResult = () => {
            if ( +spanIdLost.textContent === 5 && +spanIdDead.textContent < 10 ) {
                alert('Вы проиграли');
                spanIdDead.textContent = 0;
                spanIdLost.textContent = 0;
            } else if ( +spanIdLost.textContent < 5 && +spanIdDead.textContent === 10 ) {
                alert('Вы выйграли');
                spanIdDead.textContent = 0;
                spanIdLost.textContent = 0;
            }
        };
    
    
    setInterval(() => {
        for (i = 1; i <= 9; i++) {
            onClick( getHole( i ) );
        }
    }, 800);
})();