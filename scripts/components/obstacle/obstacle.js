
// import //
import { patterns_game_elements } from "../../abstractions/game patterns/patterns_game_elements.js";

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
            obstacle_top__height += 10;
        } else if (obstacle_top__height - obstacles_administrator.past_obstacle_top__height > 15) {
            obstacle_top__height -= 10;
        } 

        obstacle_top.style.height = obstacle_top__height + '%';
        obstacle_bottom.style.height = (100 - (obstacle_top__height + this.pass_height)) + '%';

        obstacles_administrator.past_obstacle_top__height = obstacle_top__height;

    }

    // getter
    get pass_height() {

        let player = document.getElementById('player');

        return (player.offsetHeight * 3.5) / (window.screen.availHeight * 0.01);

    }

}

// obstacles administrator //
const obstacles_administrator = {

    // public properties //
    // with default values //
    new_obstacle: null,
    number_obstacles: 0,
    number_current_obstacle: 1,

    past_obstacle_top__height: 0,

    // public methods //

    // start
    startCreatingAndMovingObstacles() {

        this.number_obstacles = 0;

        let play_field = document.getElementById('play_field');

        let creating_obstacles = setInterval(

            function () {

                obstacles_administrator._createNewObstacle();
                obstacles_administrator._setHeightObstacle();
                obstacles_administrator._movingObstacle();

                if (play_field.classList.contains('js-play_field__game_over')) {
                    clearInterval(creating_obstacles);
                }

            },
            this.interval_create_obstacles

        );

    },

    startAutoUpdatingNumberCurrentObstacle() {

        this.number_current_obstacle = 1;

        let player = document.getElementById('player');
        let play_field = document.getElementById('play_field');

        let update_number_current_obstacle = setInterval(

            function () {

                let current_obstacle = obstacles_administrator.current_obstacle;
                if (!current_obstacle) return;

                if (player.offsetLeft > (current_obstacle.offsetLeft + current_obstacle.offsetWidth)) {
                    obstacles_administrator.number_current_obstacle++;
                }

                if (play_field.classList.contains('js-play_field__game_over')) {
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

        let player = document.getElementById('player');
        let play_field = document.getElementById('play_field');

        let distance = 2 * player.offsetWidth;
        let speed_obstacle = (play_field.offsetWidth + (2 * this._getWidthObstacle()) + 30) / this.duration_moving_obstacle;
        let time_interval = distance + (2 * this._getWidthObstacle() + 30) / speed_obstacle;

        return time_interval;

    },

    get duration_moving_obstacle() {

        if (window.screen.availWidth > 1600) return 4000;

        if (window.screen.availWidth > 1000) return 3800;

        if (window.screen.availWidth > 768) return 3600;

        if (window.screen.availWidth > 478) return 3400;

        return 3400;

    },

    get current_obstacle() {

        let current_obstacle = document.getElementById(`obstacle_${this.number_current_obstacle
            }`);
        return current_obstacle;

    },



    // private methods //

    // create
    _createNewObstacle() {

        this.new_obstacle = new Obstacle({

            HTML_SETTINGS: {

                ID_NAME: `obstacle_${++obstacles_administrator.number_obstacles}`,

                tag_name: 'div',
                class_name: 'obstacle',
                start_styles: `width: ${obstacles_administrator._getWidthObstacle()}px`,
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

                        let play_field = document.querySelector('#play_field');
                        let obstacle = obstacles_administrator.new_obstacle;

                        return obstacle.createAnimation({

                            changing_properties: [

                                {
                                    name: 'left',
                                    start_value: play_field.offsetWidth + obstacle.HTML_LINK.offsetWidth,
                                    final_value: -(obstacle.HTML_LINK.offsetWidth + 20),
                                    unit_of_measurement: 'px',
                                },

                            ],
                            changing_element: obstacle.HTML_LINK,
                            duration: obstacles_administrator.duration_moving_obstacle,
                            timing_function: obstacle.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                            next_function: function () {
                                obstacle.deleteHTML();
                            },

                        });

                    }

                },

            },

        });

        this.new_obstacle.createHTML();

    },

    // setter
    _setHeightObstacle() {
        this.new_obstacle.setHeightParameters();
    },

    // getter
    _getWidthObstacle() {

        let player = document.getElementById('player');

        return player.offsetWidth + 30;

    },

    // moving
    _movingObstacle() {
        this.new_obstacle.ANIMATIONS_SETTINGS.ANIMATIONS.moving_to_left.start();
    },

};

// export
export { obstacles_administrator };