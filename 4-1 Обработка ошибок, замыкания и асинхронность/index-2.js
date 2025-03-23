const rl = require('readline').createInterface(process.stdin, process.stdout);
const fs = require('fs');

function appendFile(writeText) {
  fs.appendFile('message.txt', writeText, (err) => {
      if (err) throw err;
    });
}


function question() {
  const numb = Math.floor(Math.random() * 100);
  let count = 1;
  console.log(numb);
  
  console.log("Число загадано. Игра началась!")
  appendFile(`Число загадано. Игра началась!\nЗагаданное число - ${numb}\n`)
  
  function game() {
    rl.question(`Попытка №${count}. Введите число: `, (answer) => {
      if (+answer === numb) {
        console.log(`Вы угадали число! Общее число попыток - ${count}`);
        appendFile(`Попытка №${count}. Введенное число: ${answer}\nВы угадали число! Общее число попыток - ${count}`);
        rl.close;
        return;
      } else if (+answer < numb) {
        console.log("Больше");
        appendFile(`Попытка №${count}. Введенное число: ${answer}. Подсказка - Больше.\n`);
      } else if (+answer > numb) {
        console.log("Меньше");
        appendFile(`Попытка №${count}. Введенное число: ${answer}. Подсказка - Меньше.\n`);
      } else if (answer === "q") {
        appendFile(`Игра завершена по желанию пользователя.
        Число не угадано. Сделано ${count - 1} попыток.`);
        rl.close;
        return;
      }
      count++;
      game();
    })
  }
  game();
}

question();