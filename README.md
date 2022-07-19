# FlappyGosha (ru)
Привет, перед тобой представлен мой первый домашний проект-игра под названием FlappyGosha. Над данным проектом было пролито не мало крови, пота, слёз, сил и времени с одной целью - создать наиболее хорошую (идеальную) систему браузерной игры; в качестве испытательного прототипа была взята небезизвестная всеми игра FlappyBird. Насколько удачно у меня получилось реализовать представленную цель вы можете увидеть через непосредственно код игры (я начинающий, поэтому уверен, что я мог что-либо не заметить - буду очень благодарен, если подправите или подскажете как можно было бы сделать намного лучше) и результат, отображаемы в браузере.

Ссылка на игру: https://gleb001.github.io/FlappyGosha/

## Обзор файловой сисетмы игры
Файловая система игры основана на принципе разделения функциональности. Следуя данному принципу, всевозможные сущности игры были поделены на три следующих вида:
- абстракция представляет собой внутренний механизм, который выполняет какую-либо конкретную задачу в игре (например, игровой движок, алгоритмы игры);
- компонент - это элемент игрового интерфейса, который является незаменимой составляющей игры (например, игрок, препятствия);
- элемент - это элемент игрового интерфейса, который является второстепенной составляющей игры (например, сообщения, наименование игры, счётчик очков).

Также помимо данных сущностей имеются следующие вспомогателные файлы:
- main.js - главенствующий файл всей игры. Он запускает конкретные в зависимости от условий функции или алгоритмы в ответ на заранее прописанные действия игрока и браузера;
- collector_elements.js и collector_components.js содержат соответственно все элементы и компоненты в игре, что позволяет незатруднительно перемещать их  все (компонетны и элементы) в любую часть механизма игры.

## Обзор внутреннего механизма игры
Внутренний механизм игры проистекает из одного действия - реагирования на действия игрока. Так файл main.js лежит во главе механизма. Именно этот файл, обнаружив действие игрока (браузера), запускает подходящий под конкрентые условия игры алгоритм, по окончании которого ожидает следующего ответного действия от субъекта действия.
Ниже представлена схема описанного механизма.

![Flappy Gosha system (ru) 01](https://user-images.githubusercontent.com/89206789/179702762-db058d8a-c30f-4026-9148-952c17dcd904.png)


# FlappyGosha (en)
Hi, my first home project is presented to you-a game called FlappyGosha. A lot of blood, sweat, tears, effort and time were shed on this project with one goal - to create the best (ideal) browser game system; the well-known FlappyBird game was taken as a test prototype. You can see how successfully I managed to implement the presented goal through the game code itself (I'm a beginner, so I'm sure I could have missed something - I would be very grateful if you could correct or tell me how it could be done much better) and the result is displayed in the browser.

Link to the game: https://gleb001.github.io/FlappyGosha/

## Overview of the game's file system
The game's file system is based on the principle of separation of functionality. Following this principle, all possible entities of the game were divided into the following three types:
- abstraction is an internal mechanism that performs a specific task in a game (for example, a game engine, game algorithms);
- a component is an element of the game interface, which is an indispensable component of the game (for example, a player, obstacles);
- an element is an element of the game interface, which is a secondary component of the game (for example, messages, the name of the game, the score counter).

Also, in addition to these entities , there are the following auxiliary files:
- main.js is the dominant file of the entire game. It launches specific functions or algorithms depending on the conditions in response to pre-prescribed actions of the player and the browser;
- collector_elements.js and collector_components.js contain, respectively, all the elements and components in the game, which makes it easy to move them all (components and elements) to any part of the game mechanism.

## Overview of the internal mechanism of the game
The internal mechanism of the game stems from one action - reaction to the actions of the player. So the main file.js is at the head of the mechanism. It is this file that, having detected the player's (browser's) action, launches an algorithm suitable for the specific conditions of the game, at the end of which it expects the next response from the subject of the action.
Below is a diagram of the described mechanism.

![Flappy Gosha system (en)](https://user-images.githubusercontent.com/89206789/179704756-5d0bd28d-4fa7-47b8-9512-698fdf9713c3.png)
