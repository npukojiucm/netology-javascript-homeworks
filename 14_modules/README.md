# Домашнее задание к лекции «Модули»

## [Webpack](./01_task/)

### Легенда

Ваш проект разросся и необходимо его разделить на модули. Модули помогают обеспечить изолированность кода и внести порядок в проект. Но для работы с модулями необходимо настроить загрузчик модулей (удостоверьтесь с помощью сервиса [caniuse.com](http://caniuse.com/) что модули поддерживаются не везде).

### Описание

Используйте следующую структуру, чтобы настроить экспорт в бандл:

- каталог `src`:
  - каталог `css`
    - файл `style.css` (в качестве содержимого используйте `body { color: #999; }`)
  - каталог `js`
    - файл `app.js` (в качестве содержимого используйте `console.log('app worked')`)
  - файл `index.html` (шаблон для HTMLWebpackPlugin) (содержимое файла - произвольно, скрипты и стили должны подключаться автоматически, за счёт использования HTMLWebpackPlugin и MiniCssExtractPlugin)
  - файл `index.js` (Webpack entry point)
- файл `webpack.config.js`
- файл `package.json`
- другие файлы

Убедитесь, что после экспорта, бандл запускается и работает (создайте для этого скрипт в npm, который запускает HTTP-сервер для каталога `dist`). HTTP-сервер выберите сами.

---

## [Import/Export](./01_task/)

### Легенда

Вы успешно настроили загрузку модулей с Webpack и сборку приложения. Пришло время всё грамотно разделить на модули!

### Описание

Разделите всё приложение на модули:

1. Модуль Domain - где будет храниться логика предметной области (персонажи, атаки и т.д.)
2. Модуль Game - отвечающий за работу приложения (загрузку и сохранение)
3. Модуль App - отвечающий за запуск приложения

Заглушки для модулей:

файл `domain.js`:

```javascript
class Character {}
```

файл `game.js`

```javascript
class Game {
  start() {
    console.log("game started");
  }
}

class GameSavingData {}

function readGameSaving() {}

function writeGameSaving() {}
```

файл `app.js`

```javascript
const game = new Game();
game.start();
```

Организуйте:

1. Из модуля `domain` экспорт класса `Character` в качестве `default`'ного
1. В модуле `game` импорт класса `Character`
1. Экспорт из модуля `game` класса `Game` в качестве дефолтного, класса `GameSavingData` и функций `readGameSaving` и `writeGameSaving`
1. В модуле `app.js` одним импортом импортируйте `Game`, `GameSavingData` и функции `readGameSaving`, `writeGameSaving` (их при импорте переименуйте в `loadGame` и `saveGame` соответственно)

С самими функциями и классами ничего делать не нужно, нужно только правильно расставить инструкции `import`/`export`.

---

## [ESM (задача со звёздочкой)](./02_task/)

**Важно**: данная задача не является обязательной

### Легенда

В качестве внутреннего эксперимента вы решили попробовать нативную поддержку модулей в браузерах (без Webpack).

### Описание

Преобразуйте предыдущую задачу так, чтобы использовалась нативная поддержка модулей ES в браузерах.

Для этого инициализируйте проект на базе `npm`, подключите туда live-server (ESLint, Babel и Webpack не подключайте).

Подключите все модули\* на базовую страницу `index.html`, так, чтобы при открытии этой страницы в браузере в консоли отобразилось `game started`.

<summary>
    <details>Подсказка</details>

    Наверное, стоит подключать не все, а только "стартовый".
</summary>
