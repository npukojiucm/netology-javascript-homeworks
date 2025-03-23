const parents = Array.from( document.querySelector("ul").children );

parents.forEach(parent => {
    const parentLabel = parent.querySelector("label");
    const parentCheckBox = parentLabel.querySelector(".interest__check");

    parentCheckBox.onclick = () => {
        const childCheckBoxes = Array.from(parent.querySelectorAll(".interest__check")).filter(
            checkBox => checkBox.closest(".interests_active"));
        
        childCheckBoxes.forEach(box => box.checked = !box.checked);
    }
})