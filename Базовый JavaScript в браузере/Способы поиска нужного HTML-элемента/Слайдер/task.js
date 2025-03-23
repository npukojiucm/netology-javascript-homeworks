(() => {
    function getArrayElementsByClassName(className) {
        return Array.from( document.getElementsByClassName( className ) );
    }
       
    function removeClassAndReturnIndex(arrClass, removeClass) {
        const index = arrClass.findIndex(item => item.classList.contains(removeClass))
        arrClass[index].classList.remove(removeClass);
        
        return index;
    }
    
    function addSelector(array, index, className) {
        return array[index].classList.add(className);
    }
     
    
    
    getArrayElementsByClassName( "slider__arrow" ).forEach(item => item.onclick = () => {
        const sliderItemElements = getArrayElementsByClassName( "slider__item" ),
            sliderDotElements = getArrayElementsByClassName( "slider__dot" );
        
        let indexItem = removeClassAndReturnIndex(sliderItemElements, "slider__item_active");
        
        removeClassAndReturnIndex(sliderDotElements, "slider__dot_active");
        
        if (item.classList.contains( "slider__arrow_prev" )) {
            if ( indexItem === 0 ) {
                indexItem = sliderItemElements.length - 1;
            } else {
                indexItem -= 1;
            }
            
        } else if (item.classList.contains( "slider__arrow_next" )){
            if ( indexItem === sliderItemElements.length - 1 ) {
                indexItem = 0;
            } else {
                indexItem += 1;
            }
        }
        addSelector(sliderItemElements, indexItem, "slider__item_active");
        addSelector(sliderDotElements, indexItem, "slider__dot_active");
    })
    
    getArrayElementsByClassName( "slider__dot" ).forEach((item, index) => item.onclick = () => {
        const sliderItemElements = getArrayElementsByClassName( "slider__item" ),
            sliderDotElements = getArrayElementsByClassName( "slider__dot" );
        
        removeClassAndReturnIndex(sliderItemElements, "slider__item_active");
        removeClassAndReturnIndex(sliderDotElements, "slider__dot_active");
        
        addSelector(sliderItemElements, index, "slider__item_active");
        addSelector(sliderDotElements, index, "slider__dot_active");
    })
   
})();