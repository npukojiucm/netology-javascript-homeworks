const input = document.getElementById("task__input");
const tasksList = document.getElementById("tasks__list")
const form = document.getElementById("tasks__form");

form.onsubmit = (e) => {
    e.preventDefault();

    if (input.value !== "") {
        tasksList.insertAdjacentHTML("afterbegin", `
            <div class="task">
                <div class="task__title">
                    ${input.value}
                </div>
                <a href="#" class="task__remove">&times;</a>
            </div>
        `);
        input.value = "";

        const removeButton = Array.from(document.getElementsByClassName("task__remove"));
        removeButton[0].onclick = () => {
            const parent = removeButton[0].closest(".task")
            parent.remove();
        }
    }
}