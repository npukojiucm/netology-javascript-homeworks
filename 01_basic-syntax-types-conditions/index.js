while (true) {
    const startGame = confirm("Эта страница предлагает сыграть вам в игру. " +
        "Компьютер загадывает число от 0 до 999. Вам надо угадать число. " +
        "Во время игры вам будут даваться подсказки. Если Вы захотите закончить игру введите q. " +
        "Начнем?");

    if (startGame === false) {
        alert("Очень жаль, будем рады увидеть вас снова.");
        break;
    }

    while (true) {
        const numComp = Math.floor(Math.random() * 1000);
        console.log('Загаданное число: ', numComp);
        alert("Число загадано. Удачи!!!");

        let numGuess = prompt("Введите число: ");
        console.log("Ввод от пользователя: ", numGuess);

        let minRange = 0;
        let maxRange = 999;

        while (true) {
            if (numGuess === "q") {
                numGuess = false;
                break;
            } else if (isNaN(+numGuess) || numGuess > 999 || numGuess < 0) {
                alert("Некорректное значение. Введите число от 0 до 999: ");
            } else if (+numGuess === numComp) {
                numGuess = true;
                break;
            }

            if (numGuess < numComp && (numComp - numGuess) < (numComp - minRange)) {
                minRange = numGuess;
            } else if (numGuess > numComp && (numGuess - numComp) < (maxRange - numComp)) {
                maxRange = numGuess;
            }

            numGuess = prompt(`Подсказка: загаданное число в диапазоне между
            ${minRange} и ${maxRange}`);
            console.log("Повторный ввод от пользователя: ", numGuess);
        }

        if (numGuess === false) {
            break;
        } else {
            let endGame = confirm("Вы угадали число. Повторим?");
            if (endGame === true) {
                continue;
            } else {
                break;
            }
        }
    }
    break;
}