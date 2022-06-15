'use strict'

// pattern class
class GameEntity {

    constructor(attribute_value) {

        this.ATTRIBUTE_VALUE = attribute_value;
        this.setHTML_LINK();

    }


    // adding methods
    addingNewProperties(...array__properties) {

        array__properties.forEach(object__property => {

            for (let name__property in object__property) {
                this[name__property] = object__property[name__property];
            }

        });

    }

    addingNewMethods(...array__methods) {

        array__methods.forEach(object__method => {

            for (let name__method in object__method) {
                this[name__method] = object__method[name__method];
            }

        });

    }

    // HTML_LINK
    setHTML_LINK() {
        this.HTML_LINK = document.querySelector(`${this.ATTRIBUTE_VALUE}`);
    }

    // delete
    delete() {
        this.HTML_LINK.remove();
    }

}

class GameElement extends GameEntity {

    constructor(attribute_value) {

        super(attribute_value);

    }


    // set sizes and positions
    setSizesAndPositions() {

        this.setSizes();
        this.setPosition();

    }

    setSizes() {

        this.height = this.HTML_LINK.offsetHeight;
        this.width = this.HTML_LINK.offsetWidth;

    }

    setPosition() {

        this.position_top = this.HTML_LINK.offsetTop;
        // this.position_bottom = window.screen.availHeight - (this.position_top + this.height);

        this.position_left = this.HTML_LINK.offsetLeft;
        this.position_right = (this.position__offset_left + this.width);

    }

}


// countdown class
class Countdown extends GameEntity {

    constructor(attribute_value) {

        super(attribute_value);

        this.addingNewProperties({

            counter_value: 3,

            phrase_value: 'GO',
            phrase_presence: true,

            duration__counting: 2750,

        });

    }


    // countdown
    countdownStartGame() {

        let countdown_interval = setInterval(

            function () {
                countdown.setHTMLCounterValue(countdown.nextCounterValue);
            },
            this.timeBetweenCounts

        );

        setTimeout(

            function () {

                countdown.delete();
                clearInterval(countdown_interval);

                generalGameFunctions.gamePlay();

            },
            this.duration__counting

        );

    }

    // get
    get timeBetweenCounts() {

        let count_interval;

        if (this.phrase_presence == true) {
            count_interval = this.duration__counting / (this.counter_value + 2)
        } else {
            count_interval = this.duration__counting / (this.counter_value + 1);
        }

        return count_interval;

    }

    get nextCounterValue() {

        let counter_value;

        if (this.counter_value <= 0) {
            counter_value = this.phrase_value;
        } else {
            counter_value = this.counter_value;
            this.counter_value--;
        }

        return counter_value;

    }

    // set
    setHTMLCounterValue(next__value) {

        this.setHTML_LINK();
        this.HTML_LINK.setAttribute('value', `${next__value}`);

    }

}

// passed obstacles counter class
class ObstaclesCounter extends GameEntity {

    constructor(attribute_value) {

        super(attribute_value);

        this.addingNewProperties({

            interval_update_counter: 100,

            current_obstacle_number: 1,
            pass_obstacle_number: 0,

        });

    }


    // update
    updatingCounterValue() {

        this.function_update_counter = setInterval(

            function () {

                obstacles_counter.setHTMLCounterValue(
                    obstacles_counter.counterValue
                );

            },
            this.interval_update_counter

        );

    }

    // get
    get counterValue() {

        let current_obstacle = game_field.HTML_LINK.querySelector(`[
            data-number="${this.current_obstacle_number}"
        ]`);

        if (current_obstacle != null) {
            this.checkPositionObstacleAndPlayer(current_obstacle);
        }

        return this.pass_obstacle_number;

    }

    // change
    checkPositionObstacleAndPlayer(current_obstacle) {

        let position_player = player.position_left;
        let position_obstacle = current_obstacle.offsetLeft + current_obstacle.offsetWidth;

        if (position_player > position_obstacle) {
            this.pass_obstacle_number++;
            this.current_obstacle_number++;
        }

    }

    setHTMLCounterValue(next__value) {

        this.HTML_LINK.setAttribute(
            'value',
            `counter: ${next__value}`
        );

    }

}


// game field class
class GameField extends GameElement {

    constructor(attribute_value) {

        super(attribute_value);

        this.setSizesAndPositions();
        this.addingNewProperties({

            click_value: 0,

            duration__updating: 1000,

            command__clear: 'clear',
            command__create: 'create',

            status__waiting: {
                class: 'js-game_field__expectation',
                html:
                    `
                        <h1 class="name_game">Flappy Bird</h1>
                        <button class="button__start_game">
                            Start game
                        </button> 
                    `
            },
            status__play: {
                class: 'js-game_field__play',
                html:
                    `
                        <input id='obstacles_counter' value='counter: 0' disabled>
                        <input id='countdown' disabled>
                        <span id="player" class='js-game_field__play'></span>
                    `
            },

        });

    }


    // update
    updatingField(command, next_status) {

        this.setExecutionCommand(command);

        let start_animation = performance.now();

        window.requestAnimationFrame(function animate(timestamp) {

            let time_fraction = (timestamp - start_animation) / game_field.duration__updating;
            if (time_fraction > 1) time_fraction = 1;

            game_field.setOpacityValue(time_fraction);
            game_field.setHTMLOpacity();

            if (time_fraction < 1) {
                window.requestAnimationFrame(animate);
            } else {

                game_field.setStatusField(next_status);

                generalGameFunctions.initializationGameElements();

            }

        });

    }

    updatingGameElement(...game_elements) {

        game_elements.forEach(element => {
            element.setHTML_LINK();
        });

    }

    // set
    setExecutionCommand(command) {

        this.execution_command = command;

    }

    setOpacityValue(time_fraction) {

        switch (this.execution_command) {

            case 'clear':
                this.opacity_value = 1 - time_fraction;
                break;

            case 'create':
                this.opacity_value = time_fraction;
                break;

        }

    }

    setHTMLOpacity() {

        this.setHTMLOpacityElements();
        this.setHTMLOpacityBackground();

    }

    setHTMLOpacityElements() {

        let array__game_elements = this.HTML_LINK.children;

        for (let index = array__game_elements.length - 1; index >= 0; index--) {

            let game_element = array__game_elements[index];
            game_element.style.opacity = this.opacity_value;

        }

    }

    setHTMLOpacityBackground() {

        this.HTML_LINK.style.backgroundColor = 'rgba(128, 128, 128,' + this.opacity_value + ')';

    }

    setStatusField(next_status) {

        this.HTML_LINK.className = `${next_status.class}`;
        this.HTML_LINK.innerHTML = `${next_status.html}`;

    }

}

// player class
class Player extends GameElement {

    // constructor
    constructor(attribute_value) {

        super(attribute_value);

        this.addingNewProperties({

            access__fly: true,

            command__fly: 'fly',
            command__fall: 'fall',

            duration__fall: 800,
            duration__fly: 200,

        });

    }

    // actions
    movingToGameField(movement) {

        this.setDirectionMovement(movement);
        this.setPointsPosition();

        switch (movement) {

            case 'fly':

                if (ControlActionGamer.player_not_fly == false) {
                    this.flyUp();
                }
                break;

            case 'fall':
                this.fallDown();
                break;

        }

    }

    flyUp() {

        player.access__fly = false;

        let start_animation = performance.now();

        window.requestAnimationFrame(function flying(timestamp) {

            let time_fraction = (timestamp - start_animation) / player.duration__fly;
            if (time_fraction > 1) time_fraction = 1;

            player.setReplacementValue(time_fraction);
            player.setHTMLPosition(player.replacement_value);

            if (time_fraction < 1) {
                window.requestAnimationFrame(flying);
            } else {

                player.movingToGameField(
                    player.command__fall
                );

                player.access__fly = true;

            }

        });

    }

    fallDown() {

        let start_animation = performance.now();

        window.requestAnimationFrame(function falling(timestamp) {

            let time_fraction = (timestamp - start_animation) / player.duration__fall;
            if (time_fraction > 1) time_fraction = 1;

            player.setReplacementValue(time_fraction);
            player.setHTMLPosition(player.replacement_value);

            if (time_fraction < 1) {
                window.requestAnimationFrame(falling);
            }

        });

    }


    // get
    get distanceMove() {

        let distance = this.final_position - this.current_position;
        return distance;

    }

    // set
    setPointsPosition() {

        this.setSizesAndPositions();

        switch (this.direction_movement) {

            case 'fly':
                this.current_position = this.position_top;
                this.final_position = this.current_position + 55;
                break;

            case 'fall':
                this.current_position = this.position_top;
                this.final_position = game_field.height - this.height;
                break;

        }

    }

    setCoordinateProperties() {

        this.setSizesAndPositions();

        this.position_x = this.position_left;
        this.position_x1 = this.position_x + this.width;

        this.position_y = this.position_top;
        this.position_y1 = this.position_y + this.height;

    }


    setDirectionMovement(movement) {

        this.direction_movement = movement;

    }

    setReplacementValue(time_fraction) {

        let y; // coordinate system Y axis

        switch (this.direction_movement) {

            case 'fly':
                y = Math.sin(time_fraction * Math.PI / 2);
                y = -y;
                break;

            case 'fall':
                y = Math.pow(time_fraction, 2);
                break;

        }

        this.replacement_value = y * this.distanceMove;

    }

    setHTMLPosition(replacement_value) {

        let new_position = this.current_position + replacement_value;
        this.HTML_LINK.style.top = new_position + 'px';

    }

}

// obstacle class
class Obstacle extends GameElement {

    constructor(attribute_value) {

        super(attribute_value);

        this.addingNewMethods({

            duration__movement: 6200,

            serial_number: 0,

            max_height: 70,
            min_height: 20,
            pass_height: 25,

        });

    }


    // movement
    movementOnPlayer() {

        let obstacle = this;

        let start_animation = performance.now();

        window.requestAnimationFrame(function moving(timestamp) {

            let time_fraction = (timestamp - start_animation) / obstacle.duration__movement;
            if (time_fraction > 1) time_fraction = 1;

            obstacle.setReplacementValue(time_fraction);
            obstacle.setHTMLPosition(obstacle.replacement_value);

            if (time_fraction < 1) {
                requestAnimationFrame(moving);
            } else {
                obstacle.delete();
            }

        });


    }

    // get
    get distanceMove() {

        let distance = this.final_position - this.current_position;
        return distance;

    }

    get numericInterval() {

        let numeric__interval = this.max_height - this.min_height;
        return numeric__interval;

    }

    // set
    setImportantProperties() {

        this.setHTMLHeight();
        this.setPointsPosition();
        this.setSerialNumber();

    }

    setPointsPosition() {

        this.setSizesAndPositions();

        this.current_position = game_field.width + this.width;
        this.final_position = -this.width;

    }

    setHTMLHeight() {

        let height_obstacle_top = (Math.random() * this.numericInterval) + this.min_height;

        let obstacle_top = this.HTML_LINK.querySelector('.obstacle_top');
        let obstacle_bottom = this.HTML_LINK.querySelector('.obstacle_bottom');

        obstacle_top.style.height = height_obstacle_top + '%';
        obstacle_bottom.style.height = (100 - (height_obstacle_top + this.pass_height)) + '%';

    }

    setSerialNumber() {

        this.serial_number = this.HTML_LINK.dataset.number;

    }

    setReplacementValue(time_fraction) {

        this.replacement_value = time_fraction * this.distanceMove;
        this.replacement_value--;

    }

    setHTMLPosition(replacement_value) {

        let new_position = this.current_position + replacement_value;
        this.HTML_LINK.style.left = new_position + 'px';

    }

}



// control action gamer (abstract) class
class ControlActionGamer {

    static interval_check_collision = 1;
    static interval_check_falling = 2;
    static player_not_fly = false;

    static checkingLoseGamer() {

        this.interval_collision = setInterval(

            function () {

                let end_interval_collision = ControlActionGamer.checkingCollisionObstacle();

                if (end_interval_collision == true) {
                    ControlActionGamer.endProcessesGamePlay();
                }

            },
            this.interval_check_collision

        );

        this.interval_fall = setInterval(

            function () {

                let end_interval_fall = ControlActionGamer.checkingFall();

                if (end_interval_fall == true) {
                    ControlActionGamer.endProcessesGamePlay();
                }

            },
            this.interval_check_falling

        );

    }

    static endProcessesGamePlay() {

        player.HTML_LINK.style.backgroundColor = 'red';
        player.access__fly = false;
        ControlActionGamer.player_not_fly = true;

        clearInterval(this.interval_collision);
        clearInterval(this.interval_fall);
        clearInterval(ObstaclesWrapper.function_create_obstacles);
        clearInterval(obstacles_counter.function_update_counter);

    }

    static checkingFall() {

        player.setSizesAndPositions();

        let current_position = player.position_top + player.height;
        let final_position = game_field.height;

        if (current_position >= final_position) {

            let end_interval_fall = true;
            return end_interval_fall;

        }

    }

    static checkingCollisionObstacle() {

        let current_obstacle = game_field.HTML_LINK.querySelector(`[
            data-number="${obstacles_counter.current_obstacle_number}"
        ]`);
        if (current_obstacle == null) return;


        player.setCoordinateProperties();
        PassObstacle.setCoordinateProperties(current_obstacle);


        if (
            player.position_x <= current_obstacle.position_x + current_obstacle.offsetWidth &&
            player.position_x1 >= PassObstacle.position_x &&
            (player.position_y < PassObstacle.position_y ||
                player.position_y1 > PassObstacle.position_y1)
        ) {

            let end_interval_collision = true;
            return end_interval_collision;

        }

    }

}

// obstacle wrapper (abstract) class
class ObstaclesWrapper {

    // static properties
    static number_obstacles = 0;
    static interval_create_obstacles;

    // create
    static createObstacles() {

        this.function_create_obstacles = setInterval(

            function () {

                ObstaclesWrapper.createHTMLObstacle();
                ObstaclesWrapper.createJSObstacle();

            },
            this.intervalCreateObstacles

        );

    }

    static createHTMLObstacle() {

        let obstacle = document.createElement('div');
        obstacle.setAttribute('class', 'obstacle');
        obstacle.setAttribute('data-number', ++this.number_obstacles);

        let obstacle_top = document.createElement('div');
        obstacle_top.setAttribute('class', 'obstacle_top');

        let obstacle_bottom = document.createElement('div');
        obstacle_bottom.setAttribute('class', 'obstacle_bottom');

        obstacle.append(obstacle_bottom);
        obstacle.prepend(obstacle_top);

        game_field.HTML_LINK.append(obstacle);


    }

    static createJSObstacle() {

        // попробуй изменить данное создание объекта
        // на иное, более лаконичное и видное
        let new_obstacle = new Obstacle(`[
            data-number="${this.number_obstacles}"
        ]`);

        new_obstacle.setSerialNumber();
        new_obstacle.setImportantProperties();
        new_obstacle.movementOnPlayer();

    }

    // get
    static get intervalCreateObstacles() {

        this.setIntervalCreateObstacles();
        return this.interval_create_obstacles;

    }

    // set 
    static setIntervalCreateObstacles() {

        let window_width = window.screen.availWidth;
        let interval;

        if (window_width > 1600) {

            // personal computer
            interval = 1250;

        } else if (window_width > 1000) {

            // laptop
            interval = 1500;

        } else if (window_width > 478) {

            // tablet
            interval = 1750;

        } else {

            // phone
            interval = 2000;

        }

        this.interval_create_obstacles = interval;

    }

}

class PassObstacle {

    static position_x;
    static position_x1;
    static position_y;
    static position_y1;

    static setCoordinateProperties(current_obstacle) {

        let obstacle_top = current_obstacle.querySelector('.obstacle_top');
        let obstacle_bottom = current_obstacle.querySelector('.obstacle_bottom');

        this.position_x = current_obstacle.offsetLeft;
        this.position_x1 = this.position_x + current_obstacle.offsetWidth;

        this.position_y = obstacle_top.offsetHeight + current_obstacle.offsetTop;
        this.position_y1 = obstacle_bottom.offsetTop + current_obstacle.offsetTop;

    }

}



const player = new Player('#player');
const countdown = new Countdown('#countdown');
const obstacles_counter = new ObstaclesCounter('#obstacles_counter');
const game_field = new GameField('#game_field');

let obstacle;


game_field.HTML_LINK.addEventListener('click', function (event) {

    let element = event.target;

    if (element.className == 'button__start_game') {

        generalGameFunctions.initializationGameField();
        return;

    }

});

const generalGameFunctions = {

    // initialisation
    initializationGameField: function () {

        game_field.updatingField(

            game_field.command__clear,
            game_field.status__play,

        );

    },

    initializationGameElements: function () {

        game_field.updatingGameElement(
            player,
            countdown,
            obstacles_counter
        );

        generalGameFunctions.startingCountdownGame()

    },

    // start countdown
    startingCountdownGame: function () {

        countdown.countdownStartGame();

    },

    // game play
    gamePlay: function () {

        generalGameFunctions.checkingActionsGamer();
        generalGameFunctions.actionsPlayer();

        generalGameFunctions.actionsObstaclesCounter();
        generalGameFunctions.actionsObstacles();


    },

    // actions
    actionsPlayer: function () {

        player.movingToGameField(
            player.command__fall
        );

        // замени функцию на более подходящую !!!
        game_field.HTML_LINK.addEventListener('click', function () {

            if (player.access__fly == true) {

                player.movingToGameField(
                    player.command__fly
                );

            }

        });

    },

    actionsObstacles: function () {

        ObstaclesWrapper.createObstacles();

    },

    actionsObstaclesCounter: function () {

        obstacles_counter.updatingCounterValue();

    },

    // check
    checkingActionsGamer: function () {

        ControlActionGamer.checkingLoseGamer();

    },

}

// const obstacleWrapper = {


// }
