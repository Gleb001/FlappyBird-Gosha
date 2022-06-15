
// import //
import { collector_animations } from '../../abstractions/game animations/collector_animations.js';
import { collector_pattern_html_elements } from "../../abstractions/game patterns/collector_pattern_html_elements.js";

import { Obstacle } from '../obstacle/obstacle.js';
import { play_field } from '../play field/play_field.js';

// player class //
class Player extends collector_pattern_html_elements.GameComponent {

    // public methods for external interaction (object) //

    // constructor
    constructor({
        teg_value,
        id_name,
        class_name,
        html_value,

        presence_wrapper,
        involved_element,
        insert_command
    }) {

        super({
            teg_value,
            id_name,
            class_name,
            html_value,

            presence_wrapper,
            involved_element,
            insert_command
        });

    }

    // initialisation 
    initialisation() {

        this.create();

        this.HTML_LINK.style.top =
            play_field.HTML_LINK.offsetHeight / 2 -
            player.HTML_LINK.offsetHeight / 2 + 'px';
        this.HTML_LINK.style.left = -100 + 'px';

        this.endExecutionCurrentFunction();

    }

    // show
    show() {

        collector_animations.move.start({

            execution_command: collector_animations.move.COLLECTOR_COMMANDS.to_right.name,
            involved_elements: [player.HTML_LINK],
            start_position: player.HTML_LINK.offsetLeft,
            final_position: play_field.HTML_LINK.offsetWidth / 2 - player.HTML_LINK.offsetWidth / 2,
            duration_animation: 2000,
            next_function: null

        });

    }

    // fly
    fly() {

        if (player.HTML_LINK.classList.contains('player_fly')) { return };

        player.setCLASS_NAME(Player.status.fly.class);

        collector_animations.actions_player.start({

            execution_command: collector_animations.actions_player.COLLECTOR_COMMANDS.fly.name,
            involved_elements: [player.HTML_LINK],
            start_position: player.HTML_LINK.offsetTop,
            final_position: player.HTML_LINK.offsetTop + Player.approachHeight,
            duration_animation: Player.durationFly,
            next_function: player.fall

        });

    }

    // fall
    fall() {

        player.setCLASS_NAME(Player.status.fall.class);

        collector_animations.actions_player.start({

            execution_command: collector_animations.actions_player.COLLECTOR_COMMANDS.fall.name,
            involved_elements: [player.HTML_LINK],
            start_position: player.HTML_LINK.offsetTop,
            final_position: play_field.HTML_LINK.offsetHeight - player.HTML_LINK.offsetHeight,
            duration_animation: 1000,
            next_function: null

        });

    }

    losingFall() {

        if (
            player.HTML_LINK.offsetTop ==
            play_field.HTML_LINK.offsetHeight - player.HTML_LINK.offsetHeight
        ) {
            player.endExecutionCurrentFunction();
            return
        };

        collector_animations.transform.start({

            execution_command: collector_animations.transform.COLLECTOR_COMMANDS.rotation_counterclockwise.name,
            involved_elements: [player.HTML_LINK],
            start_position: 0,
            final_position: 360,
            duration_animation: 750,
            next_function: this.endExecutionCurrentFunction

        });

    }

    // demonstration flight
    startDemonstrationFlight() {

        this.demonstrationFlight = setInterval(

            function () {

                let center_of_the_play_field =
                    play_field.HTML_LINK.offsetHeight / 2 - player.HTML_LINK.offsetHeight / 2;

                if (player.HTML_LINK.offsetTop >= center_of_the_play_field) {
                    player.fly();
                }

            },
            10

        );

    }

    stopDemonstrationFlight() {
        clearInterval(this.demonstrationFlight);
    }

    // check
    checkMovement() {
        trackingGamerActions.start();
    }

    // end check
    endCheckMovement() {
        trackingGamerActions.end();
    }




    // private properties for the internal mechanism (class) //
    // with default values //
    static status = {

        fly: {
            class: 'player_fly',
        },

        fall: {
            class: 'player_fall',
        }

    };


    // private methods for the internal mechanism (class) //

    // get
    static get approachHeight() {

        if (window.screen.availHeight > 1000) {
            return 70;
        }

        if (window.screen.availHeight > 800) {
            return 65;
        }

        if (window.screen.availHeight > 600) {
            return 60;
        }

        return 55;

    }
    static get durationFly() {

        if (window.screen.availHeight > 1000) {
            return 250;
        }

        if (window.screen.availHeight > 800) {
            return 250;
        }

        if (window.screen.availHeight > 600) {
            return 250;
        }

        return 250;

    }

}

// player object //
const player = new Player({

    teg_value: 'div',
    id_name: 'player',
    class_name: 'player_fall',
    html_value: null,

    presence_wrapper: false,
    involved_element: '#play_field',
    insert_command: 'prepend'

});

// control action gamer (abstract) object //
const trackingGamerActions = {

    // public methods for external interaction //

    // start
    start() {

        this._checking_gamer_actions = setInterval(

            function () {

                trackingGamerActions._checkingCollisionsFloor();
                trackingGamerActions._checkingCollisionsObstacle();

                if (trackingGamerActions._game_over) {
                    trackingGamerActions._game_over = false;
                    player.endExecutionCurrentFunction();
                }

            }, 5

        );

    },

    end() {
        clearInterval(this._checking_gamer_actions);
    },



    // private properties for the internal mechanism //
    // with default values //
    _game_over: false,
    _checking_gamer_actions: null,


    // private methods for the internal mechanism //

    // check
    _checkingCollisionsFloor() {

        if (
            player.HTML_LINK.offsetTop + player.HTML_LINK.offsetHeight >=
            play_field.HTML_LINK.offsetHeight
        ) {
            this._game_over = true;
        }

    },

    _checkingCollisionsObstacle() {

        // Obstacle.setNumberCurrentAndPassedObstacle();
        let current_obstacle = Obstacle.CurrentObstacle;
        if (!current_obstacle) { return };

        let obstacle_top = current_obstacle.querySelector('.obstacle_top');
        let obstacle_bottom = current_obstacle.querySelector('.obstacle_bottom');

        let first_expression = player.HTML_LINK.offsetLeft <=
            (current_obstacle.offsetLeft + current_obstacle.offsetWidth)
            &&
            (player.HTML_LINK.offsetLeft + player.HTML_LINK.offsetWidth) >=
            current_obstacle.offsetLeft;

        let second_expression = player.HTML_LINK.offsetTop <=
            (obstacle_top.clientHeight - player.HTML_LINK.offsetHeight * 0.75) ||
            player.HTML_LINK.offsetHeight + player.HTML_LINK.offsetTop >=
            (obstacle_bottom.offsetTop - player.HTML_LINK.offsetHeight * 0.75);

        if (first_expression && second_expression) {
            this._game_over = true;
        }

    },

}

// export //
export { player, trackingGamerActions };


// Note //

// n.1
// Очерк с идеей:
// Попробуй добавить умный объект, который будет
// проверять положение player на игровом поле и, если
// проверяемый объект не перемещается (стоит на месте),
// то он падает.
// Данная абстракция убьёт сразу двух зайцев:
// 1) код будет чище - не придётся везде пихать функцию падения
// 2) забыл... :)

// n.2
// collector_animations.transform.start({
//     execution_command: collector_animations.transform.COLLECTOR_COMMANDS.rotation_clockwise.name,
//     involved_elements: [player.HTML_LINK],
//     start_position: -50,
//     final_position: 50,
//     duration_animation: 500,
//     next_function: null
// });

// collector_animations.transform.start({
//     execution_command: collector_animations.transform.COLLECTOR_COMMANDS.rotation_counterclockwise.name,
//     involved_elements: [player.HTML_LINK],
//     start_position: 0,
//     final_position: -50,
//     duration_animation: 500,
//     next_function: null
// });

// n.3
// avtomatic fall player (abstract) object (Abstract game objects/avtomatic fall player)
// const avtomaticFallPlayer = {

//     interval_checking_status: 10,

//     checkStatusPlayer: function () {

//         setInterval(

//             function () {

//                 if(player.direction_movement == player.command__fall) {

//                     player.movingToGameField(
//                         player.command__fall
//                     );

//                 }

//             },
//             this.interval_checking_status

//         );

//     }

// };


// n.5
// Попробуй заменить интервалы на промисы
// Код будет чище выглядеть, браузер не будет
// жрать много памяти у игрока

// n.6
// if (
//     (player.position_x <= passObstacle.position_xw &&
//         player.position_xw >= passObstacle.position_x) &&
//     (player.position_y < passObstacle.position_y ||
//         player.position_yh > passObstacle.position_yh)
// ) {
// }