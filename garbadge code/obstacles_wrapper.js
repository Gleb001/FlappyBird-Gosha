'use strict'

// import
import { Obstacle } from '../scripts/components/obstacle/obstacle.js';
import { player } from '../scripts/components/player/player.js';
import { play_field } from '../scripts/components/play field/play_field.js';

// obstacle wrapper (abstract) object
const obstaclesWrapper = {

    // initial properties //
    number_new_obstacle: 1,
    number_current_obstacle: 1,
    number_pass_obstacle: 0,

    // create obstacles metods //

    // start
    startCreateObstacles: function () {

        setInterval(

            this.createObstacles,
            this.intervalCreateObstacles

        );

    },

    // create
    createObstacles: function () {

        obstaclesWrapper.createHTMLObstacle();
        obstaclesWrapper.createJSObstacle();

    },

    createHTMLObstacle: function () {

        let obstacle = document.createElement('div');
        obstacle.setAttribute('class', 'obstacle');
        obstacle.setAttribute('data-number', this.number_new_obstacle);

        let obstacle_top = document.createElement('div');
        obstacle_top.setAttribute('class', 'obstacle_top');

        let obstacle_bottom = document.createElement('div');
        obstacle_bottom.setAttribute('class', 'obstacle_bottom');

        obstacle.append(obstacle_bottom);
        obstacle.prepend(obstacle_top);

        game_field.HTML_LINK.append(obstacle);

    },

    createJSObstacle: function () {

        let new_obstacle = new Obstacle(`[
            data-number="${this.number_new_obstacle++}"
        ]`);

        new_obstacle.movementOnPlayer();

    },

    // interval
    get intervalCreateObstacles() {

        let window_width = window.screen.availWidth;

        if (window_width > 1600) {

            return 1250;

        } else if (window_width > 1000) {

            return 1500;

        } else if (window_width > 478) {

            return 1750;

        } else {

            return 2000;

        }

    },


    // current obstacle methods //
    get currentObstacle() {

        let current_obstacle = game_field.HTML_LINK.querySelector(`[
            data-number="${this.number_current_obstacle}"
        ]`);

        if (current_obstacle == null) { return }

        return current_obstacle;

    },

    
    // pass obstacle number methods //
    setPassObstacleNumber: function() {

        let current_obstacle = this.currentObstacle;

        let position_player = player.position_left;
        let position_obstacle = current_obstacle.offsetLeft + current_obstacle.offsetWidth;

        if (position_player > position_obstacle) {
            this.number_pass_obstacle++;
            this.number_current_obstacle++;
        }

    },

    get passObstacleNumber() {

        this.setPassObstacleNumber();
        return this.number_pass_obstacle;

    }

}

// export
export { obstaclesWrapper };
