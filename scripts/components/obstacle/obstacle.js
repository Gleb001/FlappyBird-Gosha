
// import //
import { collector_animations } from "../../abstractions/game animations/collector_animations.js";
import { collector_pattern_html_elements } from "../../abstractions/game patterns/collector_pattern_html_elements.js";

// obstacle classes //
class Obstacle extends collector_pattern_html_elements.GameComponent {

    // public methods for external interaction (object) //

    // constructor
    constructor({
        teg_value,
        id_name,
        class_name,
        attribute_value,
        html_value,

        presence_wrapper,
        involved_element,
        insert_command
    }) {

        super({
            teg_value,
            id_name,
            class_name,
            attribute_value,
            html_value,

            presence_wrapper,
            involved_element,
            insert_command
        });

    }

    // moving
    movingOnPlayer() {

        // This code fragment needs to be corrected, that is
        // bring in the appropriate type of animation call.
        // The reason the code looks like this and not otherwise 
        // is because the animation cannot be played by more than
        // one object.
        // The solution, perhaps, lies in the use of an asynchronous
        // function.

        let play_field = document.querySelector('#play_field');
        let obstacle = this;

        let start_value = play_field.offsetWidth + obstacle.HTML_LINK.offsetWidth;
        let final_value = -obstacle.HTML_LINK.offsetWidth;
        let change_distance = final_value - start_value;

        this.HTML_LINK.style.left = start_value + 'px';

        let start_animation = performance.now();

        window.requestAnimationFrame(function animate(timestamp) {

            let time_fraction = (timestamp - start_animation) / Obstacle._durationMoving;
            if (time_fraction > 1) time_fraction = 1;


            let replacement_value = time_fraction * change_distance;
            let new_value = start_value + replacement_value;

            obstacle.HTML_LINK.style.left = new_value + 'px';


            if (time_fraction < 1) {
                window.requestAnimationFrame(animate);
            } else {
                obstacle.delete();
            }

        });

    }

    // set
    setHeightInsideObstacles() {

        this.obstacle_top = this.HTML_LINK.querySelector('.obstacle_top');
        this.obstacle_bottom = this.HTML_LINK.querySelector('.obstacle_bottom');

        let obstacle_top__height = (Math.random() * (Obstacle._max_height - Obstacle._min_height)) + Obstacle._min_height;

        if (obstacle_top__height - Obstacle._past_obstacle_top__height > 15) {
            obstacle_top__height -= 7;
        }

        this.obstacle_top.style.height = obstacle_top__height + '%';
        this.obstacle_bottom.style.height = (100 - (obstacle_top__height + Obstacle.PassHeight)) + '%';
        Obstacle._past_obstacle_top__height = obstacle_top__height;

    }




    // private properties for the internal mechanism //
    // with default values //
    static _max_height = 65;
    static _min_height = 28;
    static _pass_height = 30;
    static _past_obstacle_top__height = 0;

    static _number_new_obstacle = 1;
    static number_current_obstacle = 1;
    static number_passed_obstacle = 0;


    // private methods for the internal mechanism (class) //

    // methods creating new obstacles
    static startCreatingAndMovingObstaclesOnPlayer() {

        this._number_new_obstacle = 1;
        this.number_current_obstacle = 1;
        this.number_passed_obstacle = 0;

        obstacleMaker.start();

    }
    static endCreatingAndMovingObstaclesOnPlayer() {
        obstacleMaker.end();
    }

    // delete obstacles
    static deleteObstacles() {

        let array_obstacles = document.querySelectorAll('.obstacle');

        for (let index = 0; index > array_obstacles.length - 1; index++) {

            let obstacle = array_obstacles[index];
            obstacle.remove();

        }

    }

    // set
    static setNumberCurrentAndPassedObstacle() {

        let player = document.getElementById('player');
        let current_obstacle = document.getElementById(`obstacle_${this.number_current_obstacle}`);
        if (!current_obstacle) { return };

        if (player.offsetLeft > (current_obstacle.offsetLeft + current_obstacle.offsetWidth)) {
            this.number_current_obstacle++;
            this.number_passed_obstacle++;
        }

    }

    // get

    // height
    static get PassHeight() {

        if (window.screen.availHeight > 1000) {
            return 24;
        }

        if (window.screen.availHeight > 800) {
            return 26;
        }

        if (window.screen.availHeight > 650) {
            return 30;
        }

        return 32;

    }

    // -duration
    static get _durationMoving() {

        if (window.screen.availWidth > 1600) { return 3750 };

        if (window.screen.availWidth > 1000) { return 3750 };

        if (window.screen.availWidth > 478) { return 3300 };

        return 3400;

    }

    // -number
    static get NumberPassedObstacle() {
        
        this.setNumberCurrentAndPassedObstacle();
        return this.number_passed_obstacle;

    }
    static get NumberCurrentObstacle() {

        this.setNumberCurrentAndPassedObstacle();
        return this.number_current_obstacle;

    }

    // -obstacle
    static get CurrentObstacle() {

        let current_obstacle = document.getElementById(`obstacle_${this.NumberCurrentObstacle}`);
        return current_obstacle;

    }

}

// controller for creating obstacles (abstract addition) object //
const obstacleMaker = {

    // public methods for external interaction //

    // start create
    start() {

        this._creating_obstacle = setInterval(

            function () {

                obstacleMaker._createNewObstacle();
                obstacleMaker._setHeightInsideObstacles();
                obstacleMaker._movingObstacleOnPlayer();

            },
            this._intervalCreateObstacles

        );

    },

    end() {
        clearInterval(this._creating_obstacle);
    },



    // private properties for the internal mechanism //
    // with default values //
    _new_obstacle: null,
    _creating_obstacle: null,


    // private methods for the internal mechanism (class) //

    // get
    get _intervalCreateObstacles() {

        if (window.screen.availWidth > 1600) { return 850 };

        if (window.screen.availWidth > 1000) { return 900 };

        if (window.screen.availWidth > 478) { return 1200 };

        return 1300;

    },

    // create
    _createNewObstacle() {

        this._new_obstacle = new Obstacle({

            teg_value: 'div',
            id_name: `obstacle_${Obstacle._number_new_obstacle++}`,
            class_name: 'obstacle',
            html_value:
                `
                <div class="obstacle_top"></div>
                <div class="obstacle_bottom"></div>
            `,

            presence_wrapper: false,
            involved_element: '#play_field',
            insert_command: 'append'

        });

        this._new_obstacle.create();

    },

    // set
    _setHeightInsideObstacles() {
        this._new_obstacle.setHeightInsideObstacles();
    },

    // moving
    _movingObstacleOnPlayer() {
        this._new_obstacle.movingOnPlayer();
    },

};

// export
export { Obstacle };



// Note //

// n.1 -- решено
// Сможешь сделать? :)
// Продумай как всё же будет лучше оформить методы по работе с
// внутренними препятствиями:
// 1) оставить как есть - тогда методы принадлежат каждому созданному
// obstacle-у;
// 2) поменять владение/полномочия - данные методы принадлежат только
// классу, создающему obstacle-ы
// Удачи, жду решение!