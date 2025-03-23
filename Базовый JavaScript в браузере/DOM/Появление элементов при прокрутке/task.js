(() => {
    const reveal = Array.from(document.getElementsByClassName("reveal"));

    document.addEventListener("scroll", () => {
        let innerHeight = window.innerHeight;

        reveal.forEach(element => {
            let top = element.getBoundingClientRect().top;
            let height = element.getBoundingClientRect().height;
            
            if ( (0 - height) < top && top < innerHeight ) {
                element.classList.add("reveal_active");
            
            } else {
                element.classList.remove("reveal_active");
            }
        });

        

    });
})();