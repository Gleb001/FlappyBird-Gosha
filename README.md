
# Table of contents
* [FlappyBird-Gosha (ru)](#FlappyBird-Gosha-русская-версия)
* [FlappyBird-Gosha (en)](#FlappyBird-Gosha-english-version)

# FlappyBird-Gosha русская версия

## Вступление
Привет, перед тобой представлен мой первый домашний проект-игра под названием "FlappyBird-Gosha". Над данным проектом было пролито не мало крови, пота, слёз, сил и времени с одной целью - создать наиболее хорошую (идеальную) систему браузерной игры; в качестве испытательного прототипа была взята небезизвестная всеми игра [FlappyBird](https://ru.wikipedia.org/wiki/Flappy_Bird). Насколько удачно у меня получилось реализовать представленную цель вы можете увидеть через непосредственно код игры и результат, отображаемый в браузере.

Ссылка на игру: https://gleb001.github.io/FlappyBird-Gosha/

## Основная часть

### Обзор файловой структуры (системы) JS-части проекта
Как можно заметить корневой каталог данного проекта является привычным. Его описывать я не вижу смысла, поэтому перейдём к интересующим меня двум каталогам - /styles и /scripts, наименование которых отражает их содержание.

#### Каталог utility русская версия
Данный каталог содержит самописные утилиты, которые позволяют реализовать данную игру в браузере. Грубо говоря, рассматриваемый каталог - это и есть своеобразная библиотека по созданию подобного рода игр и не только. В данный каталог входят три независимых модуля:
- Движок (в данном проекте) - это сущность, которая управляет потоком (процессом) выполнения алгоритмов. Реализация данной сущности заложена в абстракции под названием miniSyncEngine, отвечающей за выполнение только синхронных алгоритмов. Однако у данного движка есть метод по выполнению асинхронной функции как синхронной (в рамках потока выполнения данной сущности). Приставка mini говорит об отсутствии сложных абстракций и тяжёлого размера файла, при условии, что вся реализация данного проекта построенная на использовании рассматриваемой абстракции. [Описание API по работе с данной абстракцией](#miniSyncEngine.js-API-русская-версия).
- work_with_animations.js - модуль по созданию динамических анимаций. С помощью данного модуля можно создавать как CSS, так и JS анимацию. Настоятельно рекомендую ознакомится с даннмы модулем. [Описание API по работе с данной абстракцией](#work_with_animations.js-API-русская-версия).
- work_with_html.js - модуль по созданию html элементов. Рассматриваемый модуль состоит из одной функции - createElementHTML(). Описание API по работе с данной абстракцией не прилагаются.

Как было сказано выше утилиты выступают в роли каркаса для данного проекта. Изменению утилит как правило приводит к полному изменению остальных частей рассматриваемого каталога /sсripts! У любого решения есть свои плюсы и минусы, с которыми приходится мириться. В нашем случае минусом является полное изменение всего проекта при изменении какой-либо утилиты, а плюсом - легкость в поддержке проекта.

#### Каталог game_components русская версия
Компонент (игры) - это JS-объект, который содержит ссылку на HTML элемент, а также определённые свойства и методы, предназначенные для работы с ним (HTML элементом). Как правило (относительно данного проекта), для работы с рассматриваемой сущностью используются два ранее описанных модуля: work_with_animations.js и work_with_html.js. В качестве наглядного примера возьмём один из уже написанных - player.js.

```js
const player = {

    // специальное (стандартное) свойство для работы с html
    // элемент. Здесь мы создаем html-элемент (ссылку)
    // используемый модуль: work_with_html.js
    HTML: createElementHTML({
        tag_name: "div",
        attributes: { id: "player", }
    }),

    // это свойство хранит несколько анимаций вместе с
    // их продолжительность
    // используемый модуль: work_with_animations.js
    ANIMATIONS: {

        // durations
        durations: ...,

        // fall animations
        get fall() {

            player.HTML.className = player.statuses.fall;

            return new AnimationJS({
                changing_elements: [player.HTML],
                changing_properties: [
                    {
                        name: 'top',
                        unit_of_measurement: 'px',
                        start_value: player.HTML.offsetTop,
                        end_value:  play_field.HTML.offsetHeight -
                                    player.HTML.offsetHeight,
                    },
                ],
                timing_settings: {
                    timing_function: AnimationJS.TIMING_FUNCTIONS.linear,
                    duration: this.durations.fall,
                },
            });

        },

        ...

    },

    // это свойство хранит статус (класс) этого компонента
    statuses: {
        fly: 'player_fly',
        fall: 'player_fall',
        losing_fall: 'losing_fall',
    },

    ...

};
```

#### Каталог components_of_algorithms русская версия
Данный каталог содержит JS-файлы, внтури которых помещены компоненты для [алгоритмов](https://ru.wikipedia.org/wiki/Алгоритм). Компонент алгоритма - это один шаг алгоритма, определённое действие. Так, например, алгоритм создания бумажного кораблика содержит следующие компоненты (не упорядочены): *) согните лист А4; *) Теперь необходимо согнуть углы так, чтобы получилось два одинаковых треугольника; *) возьмите лист A4 и т.п. Упорядоченные компоненты алгоритма - это и есть алгоритм.

#### main.js русская версия
main.js - точка входа (запуска), в которой собираются исходные алгоритмы игры с помощью каталога [/components_of_algorithms](https://github.com/Gleb001/FlappyBird-Gosha/blob/master/README.md####Каталог-components_of_algorithms-русская-версия) и утилиты [miniSyncEngine](https://github.com/Gleb001/FlappyBird-Gosha/blob/master/README.md####miniSyncEngine-API-русская-версия), а также начинается игры при наступлении события "load" у глобального объекта window.

### Документация к утилитам

#### miniSyncEngine.js API русская версия
miniSyncEngine - это сущность, которая управляет синхронным потоком (процессом, который на данный момент не имеет возможности разделиться, т.е. иметь ветвления) выполнения алгоритмов. Так, например, для начала работы вам необходимо передать данному движку алгоритмы, компоненты которых являются синхронными функциями. Чтобы это сделать воспользуйтесь методом - algorithm.add({ name, name_next, components, trigger }) как показано ниже.

```js
miniSyncEngine.algorithm.add({
    name: "name_current_algorithm",
    name_next: "name_next_algorihm", // может отсутствовать
    components: [
        function component_1() { console.log("Launch first component"); },
        function component_2() { console.log("Launch second component");},
        ...
    ],
    trigger: function trigger() { return true; },
    // триггер по запуску текущего алгоритма. Данный триггер должен возвращать булевое
    // значение, чтобы функция, отвечающая за переключение алгоритмов, знала, когда
    // требуется запустить текущий алгоритм
});
```

В случае, если вы желаете выполнить асинхронную функцию как синхронную, то воспользуйтесь следующим методом рассматриваемого нами движка - executionDelay(async_function, duration_delay).

```js
miniSyncEngine.algorithm.add({
    ...,
    components: [
        function async_component() { 

            let duration_setTimeout = 1000;

            miniSyncEngine.executionDelay(
                function async_function() {

                    setTimeout({
                        function () {
                            console.log("Launch asynchronous components");
                        },
                        duration_setTimeout
                    });

                },
                duration_setTimeout
            );

        },
        function sync_component() { console.log("Launch synchronous component");},
        ...
    ],
    ...,
});
```

После того как вы подготовили и передали алгоритмы рассматриваемому движку (также при условии отсутствия каких-либо ошибок), вы можете запустить данные алгоритмы с помощью метода - start().

```js
miniSyncEngine.start();
```

#### work_with_animations.js API русккая версия
AnimationCSS и AnimationJS - это классы (шаблоны) для созданию и управлению анимациями. Так, например, вы можете создать анимацию и передать её в какую-либо переменную, чтобы использовать анимацию в разных частях программы, или можете сразу после создания анимации её проиграть как обычную функцию.

Изначально рассмотрим работу с классом AnimationJS.

```js
// 1. храним анимацию в переменной.
let curret_animation = new AnimationJS({
    changing_elements: [player.HTML], // массив, содержащий элементы, которые будут изменены в ходе проигрывания анимации
    changing_properties: [
        {
            name: 'opacity', // наименование анимации
            unit_of_measurement: '', // единица измерения анимации - может быть не указана
            function_value: "",  // функция изменяемого свойства - может быть не указана
            start_value: 0, // начальное значение
            end_value: 1, // конечное значение
        }, // итоговый результат: opacity: 0 -> opacity: 1
        {
            name: 'transform', // наименование анимации
            unit_of_measurement: 'deg', // единица измерения анимации - может быть не указана
            function_value: "rotate",  // функция изменяемого свойства - может быть не указана
            start_value: 0, // начальное значение
            end_value: 45, // конечное значение
        }, // итоговый результат: transform: rotate(0deg) -> transform: rotate(45deg)
    ],
    timing_settings: {
        timing_function: function linear(time_fraction) {
            return time_fraction; // f(x) = x - алгебраическая функция
        },
        // данная функция должна возвращать результат алгебраической функции. В качестве координаты
        // Х всегда выступает time_fraction. Именно данная координата под данным именем (time_fraction)
        // с течением времени изменяется. Ваша задача настроить её изменение с помощью данной функции
        // - либо замедлить делением, либо ускорить умножением и т.п. в зависимости от заданной вами
        // алгебраической функции f(x).
        // Также вы можете воспользоваться заранее написанными алгебраическими функциями. Они храняться
        // в свойстве TIMING_FUNCTIONS рассматриваемого класса AnimationJS.
        duration: 1000, // длительность анимации измеряется в ms(милисекундах)
        delay, // задержка анимации измеряется в ms(милисекундах)
    },
    next_function: function startAfterExecutionThisAnimation() {
        ...
    }; // функция, выполняемая после проигрывания анимации
});
curret_animation.start();

// 2. нигде не храним анимацию, а сразу её исполняем
new AnimationJS({
    changing_elements: [player.HTML], // массив, содержащий элементы, которые будут изменены в ходе проигрывания анимации
    changing_properties: [
        {
            name: 'opacity', // наименование анимации
            unit_of_measurement: '', // единица измерения анимации - может быть не указана
            function_value: "",  // функция изменяемого свойства - может быть не указана
            start_value: 0, // начальное значение
            end_value: 1, // конечное значение
        }, // итоговый результат: opacity: 0 -> opacity: 1
        {
            name: 'transform', // наименование анимации
            unit_of_measurement: 'deg', // единица измерения анимации - может быть не указана
            function_value: "rotate",  // функция изменяемого свойства - может быть не указана
            start_value: 0, // начальное значение
            end_value: 45, // конечное значение
        }, // итоговый результат: transform: rotate(0deg) -> transform: rotate(45deg)
    ],
    timing_settings: {
        timing_function: function linear(time_fraction) {
            return time_fraction; // f(x) = x - алгебраическая функция
        },
        // данная функция должна возвращать результат алгебраической функции. В качестве координаты
        // Х всегда выступает time_fraction. Именно данная координата под данным именем (time_fraction)
        // с течением времени изменяется. Ваша задача настроить её изменение с помощью данной функции
        // - либо замедлить делением, либо ускорить умножением и т.п. в зависимости от заданной вами
        // алгебраической функции f(x).
        // Также вы можете воспользоваться заранее написанными алгебраическими функциями. Они храняться
        // в свойстве TIMING_FUNCTIONS рассматриваемого класса AnimationJS.
        duration: 1000, // длительность анимации измеряется в ms(милисекундах)
        delay, // задержка анимации измеряется в ms(милисекундах)
    },
    next_function: function startAfterExecutionThisAnimation() {
        ...
    }; // функция, выполняемая после проигрывания анимации
}).start();

// 3. останавливаем анимацию с помощью метода end(), созданной вами анимации
// PS: вы не сможете остановить анимацию как во втором примере, так как нигде
// её не храним => не можем к ней обратиться во время выполнения
curret_animation.end();
```

При работе с AnimationCSS - настройки аналогичны уже представленным в выше описанном классе. Однако, в настройки анимации данного типа добавляется необязательный параметр - имя анимации (как в свойстве CSS animation-name).

```js
// 1. храним анимацию в переменной.
let curret_animation = new AnimationCSS({
    name_animation: "change_opacity_and_transform_player" // может быть не указан
    changing_elements: [player.HTML], // массив, содержащий элементы, которые будут изменены в ходе проигрывания анимации
    changing_properties: [
        {
            name: 'opacity', // наименование анимации
            unit_of_measurement: '', // единица измерения анимации - может быть не указана
            function_value: "",  // функция изменяемого свойства - может быть не указана
            start_value: 0, // начальное значение
            end_value: 1, // конечное значение
        }, // итоговый результат: opacity: 0 -> opacity: 1
        {
            name: 'transform', // наименование анимации
            unit_of_measurement: 'deg', // единица измерения анимации - может быть не указана
            function_value: "rotate",  // функция изменяемого свойства - может быть не указана
            start_value: 0, // начальное значение
            end_value: 45, // конечное значение
        }, // итоговый результат: transform: rotate(0deg) -> transform: rotate(45deg)
    ],
    timing_settings: {
        timing_function: "linear", // вводите только значения свойства animation-timing-function
        delay, // задержка анимации измеряется в ms(милисекундах)
    },
    next_function: function startAfterExecutionThisAnimation() {
        ...
    }; // функция, выполняемая после проигрывания анимации
});
curret_animation.start();

// 2. нигде не храним анимацию, а сразу её исполняем
new AnimationCSS({
    name_animation: "change_opacity_and_transform_player" // может быть не указан
    changing_elements: [player.HTML], // массив, содержащий элементы, которые будут изменены в ходе проигрывания анимации
    changing_properties: [
        {
            name: 'opacity', // наименование анимации
            unit_of_measurement: '', // единица измерения анимации - может быть не указана
            function_value: "",  // функция изменяемого свойства - может быть не указана
            start_value: 0, // начальное значение
            end_value: 1, // конечное значение
        }, // итоговый результат: opacity: 0 -> opacity: 1
        {
            name: 'transform', // наименование анимации
            unit_of_measurement: 'deg', // единица измерения анимации - может быть не указана
            function_value: "rotate",  // функция изменяемого свойства - может быть не указана
            start_value: 0, // начальное значение
            end_value: 45, // конечное значение
        }, // итоговый результат: transform: rotate(0deg) -> transform: rotate(45deg)
    ],
    timing_settings: {
        timing_function: "linear", // вводите только значения свойства animation-timing-function
        duration: 1000, // длительность анимации измеряется в ms(милисекундах)
        delay, // задержка анимации измеряется в ms(милисекундах)
    },
    next_function: function startAfterExecutionThisAnimation() {
        ...
    }; // функция, выполняемая после проигрывания анимации
}).start();

// 3. останавливаем анимацию с помощью метода end(), созданной вами анимации
// PS: вы не сможете остановить анимацию как во втором примере, так как нигде
// её не храним => не можем к ней обратиться во время выполнения
curret_animation.end();
```

Однако класс AnimationCSS предоставляет вам дополнительную возможность в добавлении css файлов с помощью метода - createAnimationCSSFile(changing_properties, name_animation). Это может вам пригодиться если у вас есть несколько элементов, которым вы хотите добавить одну и ту же CSS анимацию (+ если параметры анимации динамически изменяемые).

```js
// 1. наименование анимации
let name_current_animation = "name_current_animation";

// 2. создание CSS файла с анимацией
AnimationCSS.createAnimationCSSFile(
    [
        {
            name: "background-color",
            unit_of_measurement: "",
            start_value: "white",
            end_value: "black",
        }
    ],
    name_current_animation
);

// 3. добавление анимации созданному элементу
let html_element = document.getElementById("id_html_element");
html_element.style.animation = `${name_current_animation} 1000ms linear forwards`;
```

Достоинства данного подхода в работе с анимациями:
1. можем динамически изменять свойства в зависимости от условий (состояния) программы;
2. можем настроить алгебраическую функцию согласно нашим желаниям.
Недостатки:
1. Занимает немало места!;
2. Требует адаптацию к использованию.

Проанализировав написанный мною модуль я пришёл к следующему выводу: используйте данный модуль только, если:
- вы хотите сделать необычную анимацию (относительно CSS). Помочь вам в этом сможет написанная вами алгебраическая функция;
- перед вами стоит задача динамически изменять параметры анимации, например, размер или время относительно окна браузера и т.п.
В иных случаях не используйте данный модуль, так как он ест не мало памяти => производительность падает => лучше используйте @keyframes в CSS.

## Заключение
...отсутствует...



# FlappyBird-Gosha english version

## Introduction
Hi, here is my first home project-a game called "FlappyBird-Gosha". A lot of blood, sweat, tears, effort and time were shed on this project with one goal - to create the best (ideal) browser game system; the well-known game was taken as a test prototype [FlappyBird](https://en.wikipedia.org/wiki/Flappy_Bird). You can see how successfully I managed to implement the presented goal through the game code itself and the result displayed in the browser.

Link to the game: https://gleb001.github.io/FlappyBird-Gosha/

## The main part

### Overview of the file structure (system) of the JS part of the project
As you can see, the root directory of this project is familiar. I don't see any point in describing it, so let's move on to the two directories that interest me - /styles and /scripts, the name of which reflects their content.

#### Catalog utility english version
This catalog contains self-written utilities that allow you to implement this game in the browser. Roughly speaking, the catalog in question is a kind of library for creating this kind of games and not only. This catalog includes three independent modules:
- The engine (in this project) is an entity that controls the flow (process) of executing algorithms. The implementation of this entity is embedded in an abstraction called miniSyncEngine, which is responsible for executing only synchronous algorithms. However, this engine has a method for executing an asynchronous function as synchronous (within the execution flow of this entity). The mini prefix indicates the absence of complex abstractions and heavy file size, provided that the entire implementation of this project is based on the use of the abstraction in question. [API description for working with this abstraction](https://github.com/Gleb001/FlappyBird-Gosha/blob/master/README.md####miniSyncEngine.js-API-english-version).
- work_with_animations.js is a module for creating dynamic animations. With this module, you can create both CSS and JS animations. I strongly recommend that you familiarize yourself with this module. [API description for working with this abstraction](https://github.com/Gleb001/FlappyBird-Gosha/blob/master/README.md####work_with_animations.js-API-english-version).
- work_with_html.js is a module for creating html elements. The module in question consists of one function - createElementHTM(). API descriptions for working with this abstraction are not included.

As mentioned above, utilities act as a framework for this project. Changing utilities usually leads to a complete change in the remaining parts of the /scripts directory in question! Any solution has its pros and cons, which you have to put up with. In our case, the downside is a complete change of the entire project when changing any utility, and the plus is the ease of project support.

#### Catalog game_components english version
A component (games) is a JS object that contains a link to an HTML element, as well as certain properties and methods designed to work with it (an HTML element). As a rule (regarding this project), two previously described modules are used to work with the entity in question: work_with_animations.js and work_with_html.js . As an illustrative example, let's take one of the already written ones - player.js .

```js
const player = {

    // special (standard) property for working with html
    // element. Here we create an html element (link)
    // the module used: work_with_html.js
    HTML: createElementHTML({
        tag_name: "div",
        attributes: { id: "player", }
    }),

    // this property stores multiple animations together with
    // their duration
    // the module used: work_with_animations.js
    ANIMATIONS: {

        // durations
        durations: ...,

        // fall animations
        get fall() {

            player.HTML.className = player.statuses.fall;

            return new AnimationJS({
                changing_elements: [player.HTML],
                changing_properties: [
                    {
                        name: 'top',
                        unit_of_measurement: 'px',
                        start_value: player.HTML.offsetTop,
                        end_value:  play_field.HTML.offsetHeight -
                                    player.HTML.offsetHeight,
                    },
                ],
                timing_settings: {
                    timing_function: AnimationJS.TIMING_FUNCTIONS.linear,
                    duration: this.durations.fall,
                },
            });

        },

        ...

    },

    // this property stores the status (class) of this component
    statuses: {
        fly: 'player_fly',
        fall: 'player_fall',
        losing_fall: 'losing_fall',
    },

    ...

};
```

#### Catalog components_of_algorithms english version
This directory contains JS files, in which components for [algorithms](https://en.wikipedia.org/wiki/Algorithm) are placed. The algorithm component is one step of the algorithm, a certain action. So, for example, the algorithm for creating a paper boat contains the following components (not ordered): *) bend the A4 sheet; *) Now you need to bend the corners so that you get two identical triangles; *) take the A4 sheet, etc. The ordered components of the algorithm are the algorithm.

#### main.js english version
main.js is the entry point (launch point) where the game's source algorithms are assembled using the [/components_of_algorithms](https://github.com/Gleb001/FlappyBird-Gosha/blob/master/README.md####Catalog-components_of_algorithms-english-version) directory and the utility [miniSyncEngine.js](https://github.com/Gleb001/FlappyBird-Gosha/blob/master/README.md####miniSyncEngine.js-API-english-version), and also the game starts when the "load" event occurs at the global window object.

### Documentation for utilities

#### miniSyncEngine.js API english version
miniSyncEngine is an entity that manages the synchronous flow (a process that currently has no way to split, i.e. have branches) of executing algorithms. So, for example, to get started, you need to pass algorithms to this engine, the components of which are synchronous functions. To do this, use the method - algorithm.add({ name, name_next, components, trigger }) as shown below.

```js
miniSyncEngine.algorithm.add({
    name: "name_current_algorithm",
    name_next: "name_next_algorihm", // may be missing
    components: [
        function component_1() { console.log("Launch first component"); },
        function component_2() { console.log("Launch second component");},
        ...
    ],
    trigger: function trigger() { return true; },
    // trigger to start the current algorithm. This trigger should return a
    // Boolean value so that the function responsible for switching algorithms
    // knows when to run the current algorithm
});
```

If you want to perform an asynchronous function as synchronous, then use the following method of the engine we are considering - executionDelay(async_function, duration_delay).

```js
miniSyncEngine.algorithm.add({
    ...,
    components: [
        function async_component() { 

            let duration_setTimeout = 1000;

            miniSyncEngine.executionDelay(
                function async_function() {

                    setTimeout({
                        function () {
                            console.log("Launch asynchronous components");
                        },
                        duration_setTimeout
                    });

                },
                duration_setTimeout
            );

        },
        function sync_component() { console.log("Launch synchronous component");},
        ...
    ],
    ...,
});
```

After you have prepared and passed the algorithms to the engine in question (also provided there are no errors), you can run these algorithms using the - start() method.

```js
miniSyncEngine.start();
```

#### work_with_animations.js API english version
AnimationCSS and AnimationJS are classes (templates) for creating and managing animations. So, for example, you can create an animation and pass it to some variable to use the animation in different parts of the program, or you can play it as a regular function immediately after creating the animation.

Initially, let's consider working with the AnimationJS class.

```js
// 1. we store the animation in a variable.
let current_animation = new AnimationJS({
    changing_elements: [player.HTML ], // array containing elements that will be changed during animation playback
    changing_properties: [
        {
            name: 'opacity', // animation name
            unit_of_measuration: ", // animation unit - may not be specified
            function_value: "", // function of the property being modified - may not be specified
            start_value: 0, // initial value
            end_value: 1, // final value
        }, // final result: opacity: 0 -> opacity: 1
        {
            name: 'transform', // animation name
            unit_of_measuration: 'deg', // animation unit - may not be specified
            function_value: "rotate", // the function of the property being changed - may not be specified
            start_value: 0, // initial value
            end_value: 45, // final value
        }, // final result: transform: rotate(0deg) -> transform: rotate(45deg)
    ],
    timing_settings: {
        timing_function: function linear(time_fraction) {
            return time_fraction; // f(x) = x is an algebraic function
        },
        // this function should return the result of an algebraic function. The X coordinate is always
        // time_fraction. It is this coordinate under the given name (time_fraction) that changes over
        // time. Your task is to adjust its change using this function - either slow it down by division,
        // or speed it up by multiplication, etc., depending on the algebraic function f(x) you set.
        // You can also use pre-written algebraic functions. They are stored in the TIMING_FUNCTIONS
        // property of the AnimationJS class in question.
        duration: 1000, // animation duration is measured in ms(milliseconds)
        delay, // animation delay is measured in ms(milliseconds)
    },
    next_function: function startAfterExecutionThisAnimation() {
        ...
    }; // function executed after animation playback
});
curret_animation.start();

// 2. we don't store animation anywhere, but we execute it right away
new AnimationJS({
    changing_elements: [player.HTML ], // array containing elements that will be changed during animation playback
    changing_properties: [
        {
            name: 'opacity', // animation name
            unit_of_measuration: ", // animation unit - may not be specified
            function_value: "", // function of the property being modified - may not be specified
            start_value: 0, // initial value
            end_value: 1, // final value
        }, // final result: opacity: 0 -> opacity: 1
        {
            name: 'transform', // animation name
            unit_of_measuration: 'deg', // animation unit - may not be specified
            function_value: "rotate", // the function of the property being changed - may not be specified
            start_value: 0, // initial value
            end_value: 45, // final value
        }, // final result: transform: rotate(0deg) -> transform: rotate(45deg)
    ],
    timing_settings: {
        timing_function: function linear(time_fraction) {
            return time_fraction; // f(x) = x is an algebraic function
        },
        // this function should return the result of an algebraic function. The X coordinate is always
        // time_fraction. It is this coordinate under the given name (time_fraction) that changes over
        // time. Your task is to adjust its change using this function - either slow it down by division,
        // or speed it up by multiplication, etc., depending on the algebraic function f(x) you set.
        // You can also use pre-written algebraic functions. They are stored in the TIMING_FUNCTIONS
        // property of the AnimationJS class in question.
        duration: 1000, // animation duration is measured in ms(milliseconds)
        delay, // animation delay is measured in ms(milliseconds)
    },
    next_function: function startAfterExecutionThisAnimation() {
        ...
    }; // function executed after animation playback
}).start();

// 3. we stop the animation using the end() method of the animation you created
// PS: you will not be able to stop the animation as in the second example, since we do
// not store it anywhere => we cannot access it during the execution of
current_animation.end();
```

When working with AnimationCSS, the settings are similar to those already presented in the class described above. However, an optional parameter is added to the animation settings of this type - the animation name (as in the CSS animation-name property).

```js
// 1. we store the animation in a variable.
let current_animation = new animationCSS({
    name_animation: "change_opacity_and_transform_player" // may not be specified
    changing_elements: [player.HTML ], // array containing elements that will be changed during the playback of the animation
    changing_properties: [
        {
            name: 'opacity', // animation name
            unit_of_measuration: ", // animation unit - may not be specified
            function_value: "", // function of the property being modified - may not be specified
            start_value: 0, // initial value
            end_value: 1, // final value
        }, // final result: opacity: 0 -> opacity: 1
        {
            name: 'transform', // animation name
            unit_of_measuration: 'deg', // animation unit - may not be specified
            function_value: "rotate", // the function of the property being changed - may not be specified
            start_value: 0, // initial value
            end_value: 45, // final value
        }, // final result: transform: rotate(0deg) -> transform: rotate(45deg)
    ],
    timing_settings: {
        timing_function: "linear" // enter only the values of the animation-timing-function property
        duration: 1000, // animation duration is measured in ms(milliseconds)
        delay, // animation delay is measured in ms(milliseconds)
    },
    next_function: function startAfterExecutionThisAnimation() {
        ...
    }; // function executed after animation playback
});
curret_animation.start();

// 2. we don't store animation anywhere, but we execute it right away
new AnimationCSS({
    name_animation: "change_opacity_and_transform_player" // may not be specified
    changing_elements: [player.HTML ], // an array containing elements that will be changed during the animation playback
    changing_properties: [
        {
            name: 'opacity', // animation name
            unit_of_measuration: ", // animation unit - may not be specified
            function_value: "", // function of the property being modified - may not be specified
            start_value: 0, // initial value
            end_value: 1, // final value
        }, // final result: opacity: 0 -> opacity: 1
        {
            name: 'transform', // animation name
            unit_of_measuration: 'deg', // animation unit - may not be specified
            function_value: "rotate", // the function of the property being changed - may not be specified
            start_value: 0, // initial value
            end_value: 45, // final value
        }, // final result: transform: rotate(0deg) -> transform: rotate(45deg)
    ],
    timing_settings: {
        timing_function: "linear" // enter only the values of the animation-timing-function property
        duration: 1000, // animation duration is measured in ms(milliseconds)
        delay, // animation delay is measured in ms(milliseconds)
    },
    next_function: function startAfterExecutionThisAnimation() {
...
}; // function executed after animation playback
}).start();

// 3. we stop the animation using the end() method of the animation you created
// PS: you will not be able to stop the animation as in the second example, since we do
// not store it anywhere => we cannot access it during the execution of
current_animation.end();
```

However, the AnimationCSS class provides you with an additional option in adding css files using the - createAnimationCSSFile(changing_properties, name_animation) method. This can be useful to you if you have several elements to which you want to add the same CSS animation (+ if the animation parameters are dynamically changeable).

```js
// 1. animation name
let name_current_animation = "name_current_animation";

// 2. creating a CSS file with animation
AnimationCSS.createAnimationCSSFile(
    [
        {
            name: "background-color",
            unit_of_measurement: "",
            start_value: "white",
            end_value: "black",
        }
    ],
    name_current_animation
);

// 3. adding animation to the created element
let html_element = document.getElementById("id_html_element");
html_element.style.animation = `${name_current_animation} 1000ms linear forwards`;
```

Advantages of this approach in working with animations:
1. we can dynamically change properties depending on the conditions (state) of the program;
2. we can adjust the algebraic function according to our wishes.
Disadvantages:
1. Takes up a lot of space!;
2. Requires adaptation to use.

After analyzing the module I wrote, I came to the following conclusion: use this module only if:
- you want to make an unusual animation (relative to CSS). The algebraic function you have written can help you with this;
- your task is to dynamically change the animation parameters, for example, the size or time relative to the browser window, etc.
In other cases, do not use this module, as it eats a lot of memory => performance drops => it is better to use @keyframes in CSS.

## Conclusion
...absent...
