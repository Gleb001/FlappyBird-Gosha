'use strict'

// import
import { obstaclesWrapper } from './obstacles_wrapper.js';

// pass obstacle (abstract) object
const passObstacle = {

    // default start properties
    position_x: 0,
    position_xw: 0,

    position_y: 0,
    position_yh: 0,

    
    // set
    setCoordinateProperties() {

        let obstacle = obstaclesWrapper.currentObstacle;
        if (obstacle == null) { return }

        let obstacle_top = obstacle.querySelector('.obstacle_top');
        let obstacle_bottom = obstacle.querySelector('.obstacle_bottom');

        this.position_x = obstacle.offsetTop;
        this.position_xw = obstacle.offsetTop + obstacle.offsetWidth;

        this.position_y = obstacle_top.offsetHeight + obstacle.offsetTop;
        this.position_yh = obstacle_bottom.offsetTop + obstacle.offsetTop;

    },

}

// export
export { passObstacle };
