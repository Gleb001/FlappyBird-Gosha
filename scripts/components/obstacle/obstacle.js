
// import //
import { patterns_game_elements } from "../../abstractions/game patterns/patterns_game_elements.js";
import { player } from "../player/player.js";
import { play_field } from "../play field/play_field.js";

// pattern obstacle //
class Obstacle extends patterns_game_elements.GameComponent {

    // public object properties //
    // with default values //
    max_height = 65;
    min_height = 28;

    // public object methods //

    // constructor
    constructor({ ...group_objects_with_settings }) {
        super(group_objects_with_settings);
    }

    // setter
    setHeightParameters() {

        let obstacle_top = this.HTML_LINK.querySelector('.obstacle_top');
        let obstacle_bottom = this.HTML_LINK.querySelector('.obstacle_bottom');
        let obstacle_top__height = (Math.random() * (this.max_height - this.min_height)) +
            this.min_height;

        if (obstacles_administrator.past_obstacle_top__height - obstacle_top__height > 15) {
            obstacle_top__height += 7;
        } else if (obstacle_top__height - obstacles_administrator.past_obstacle_top__height > 15) {
            obstacle_top__height -= 7;
        }

        obstacle_top.style.height = obstacle_top__height + '%';
        obstacle_bottom.style.height = (100 - (obstacle_top__height + this.pass_height)) + '%';

        obstacles_administrator.past_obstacle_top__height = obstacle_top__height;

    }

    // getter
    get pass_height() {
        return (player.height * 3.5) / (window.screen.availHeight * 0.01);
    }



    // private object methods //

    // getter
    static get obstacle_width() {
        return player.width + 30;
    }

    static get obstacle_left() {
        return play_field.width + this.obstacle_width;
    }

}

// obstacles administrator //
const obstacles_administrator = {

    // public properties //
    // with default values //
    number_obstacles: 0,
    number_current_obstacle: 1,

    past_obstacle_top__height: 0,

    // public methods //

    // start
    startCreatingAndMovingObstacles() {

        this.number_obstacles = 0;

        let creating_obstacles = setInterval(

            function () {

                let presence_player = player.HTML_LINK;
                let presence_class_game_over = play_field.HTML_LINK.classList.contains(
                    play_field.statuses.game_over.class
                );

                if (presence_class_game_over || !presence_player) {

                    clearInterval(creating_obstacles);

                } else {

                    let new_obstacle = obstacles_administrator._createNewObstacle();

                    new_obstacle.createHTML();
                    new_obstacle.setHeightParameters();
                    new_obstacle.ANIMATIONS_SETTINGS.ANIMATIONS.moving_to_left.start();

                }

            },
            this.interval_create_obstacles

        );

    },

    startAutoUpdatingNumberCurrentObstacle() {

        this.number_current_obstacle = 1;

        let update_number_current_obstacle = setInterval(

            function () {

                let current_obstacle = obstacles_administrator.current_obstacle;
                if (!current_obstacle) return;

                if (player.left > (current_obstacle.offsetLeft + current_obstacle.offsetWidth)) {
                    obstacles_administrator.number_current_obstacle++;
                }

                if (play_field.HTML_LINK.classList.contains('js-play_field__game_over')) {
                    clearInterval(update_number_current_obstacle);
                }

            }, 100

        );

    },

    // delete
    deleteObstacles() {

        let array_obstacles = document.querySelectorAll('.obstacle');

        for (let index = 0; index > array_obstacles.length - 1; index++) {

            let obstacle = array_obstacles[index];
            obstacle.remove();

        }

    },

    // getter
    get interval_create_obstacles() {

        let distance = 4 * player.width;
        let speed_obstacle = (play_field.width + (2 * Obstacle.obstacle_width) + 30) / this.duration_moving_obstacle;
        let time_interval = distance + (2 * Obstacle.obstacle_width + 30) / speed_obstacle;

        return time_interval;

    },

    get duration_moving_obstacle() {

        if (window.screen.availWidth > 1600) return 4300;

        if (window.screen.availWidth > 1000) return 4100;

        if (window.screen.availWidth > 768) return 3900;

        if (window.screen.availWidth > 478) return 3900;

        return 3700;

    },

    get current_obstacle() {

        let current_obstacle = document.getElementById(`obstacle_${this.number_current_obstacle
            }`);
        return current_obstacle;

    },



    // private methods //

    // create
    _createNewObstacle() {

        let new_obstacle = new Obstacle({

            HTML_SETTINGS: {

                ID_NAME: `obstacle_${++obstacles_administrator.number_obstacles}`,

                tag_name: 'div',
                class_name: 'obstacle',
                start_styles:
                    `
                    width: ${Obstacle.obstacle_width}px;
                    left: ${Obstacle.obstacle_left}px;
                `,
                html_value:
                    `
                    <div class="obstacle_top"></div>
                    <div class="obstacle_bottom"></div>
                `,

            },

            DOM_TREE_SETTINGS: {

                involved_element: '#play_field',
                insert_command: 'append'

            },

            ANIMATIONS_SETTINGS: {

                ANIMATIONS: {

                    get moving_to_left() {

                        return new_obstacle.createAnimation({

                            changing_properties: [

                                {
                                    name: 'left',
                                    start_value: Obstacle.obstacle_left,
                                    final_value: -(Obstacle.obstacle_width + 20),
                                    unit_of_measurement: 'px',
                                },

                            ],
                            timing_function: {
                                name: new_obstacle.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                                coefficient: 1
                            },
                            changing_element: new_obstacle.HTML_LINK,
                            duration: obstacles_administrator.duration_moving_obstacle,
                            next_function: function () {
                                new_obstacle.deleteHTML();
                            },

                        });

                    }

                },

            },

        });

        return new_obstacle;

    },

};

// export
export { obstacles_administrator };