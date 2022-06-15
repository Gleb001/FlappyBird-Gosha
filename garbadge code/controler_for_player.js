
// import components
import { player } from './player.js';
import { play_field } from '../play field/play_field.js';

// import abstractions
import { GameEngine } from '../game mechanism/game_engine.js';
import { algorithmicConstructionsOfGame } from '../game mechanism/algorithmic_constructions.js';
import { passObstacle } from '../obstacle/pass_obstacle.js';

// control action gamer (abstract) object (Abstract game objects/control action gamer)
const controlerActionsGamer = {

    // getting start //
    start() {

        let game_over = new Promise(function (resolve) {

            player.setSizesAndPositions();
            player.setCoordinateProperties();
            passObstacle.setCoordinateProperties();

            controlerActionsGamer.checkingCollisionsFloor();
            controlerActionsGamer.checkingCollisionsObstacle();

            if (controlerActionsGamer._game_over == true) {
                resolve();
            }

        });

        game_over.then(

            function () {

                player.HTML_LINK.getElementsByClassName.backgroundColor = 'red';

                // GameEngine.start(
                //     algorithmicConstructionsOfGame.end_game
                // );

            }
            
        );

    },

    // check //
    checkingCollisionsFloor() {

        if (player.position_yh >= game_field.height) {
            this._game_over = true;
        }

    },

    checkingCollisionsObstacle() {

        if (
            (player.position_x <= passObstacle.position_xw &&
                player.position_xw >= passObstacle.position_x) &&
            (player.position_y < passObstacle.position_y ||
                player.position_yh > passObstacle.position_yh)
        ) {
            this._game_over = true;
        }

    },

}

// export
export { controlerActionsGamer }


// Note //

// n.1
// Попробуй заменить интервалы на промисы
// Код будет чище выглядеть, браузер не будет
// жрать много памяти у игрока

// n.2
// // properties used by the controler action gamer // 
// _game_over,