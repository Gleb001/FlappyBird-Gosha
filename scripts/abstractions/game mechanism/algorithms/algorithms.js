

// import //
import { components_algorithms } from "./components_algorithms.js";

// the main algorithmic constructions of the game //
const algorithms = {

    asyncronous: [
        components_algorithms.async_functions_game.reactionOnExpectionInGame,
        components_algorithms.async_functions_game.changeCursorDependingOnClassPlayField,
    ],

    syncronous: {

        introduction_game: {
            components: [
                components_algorithms.sync_functions_game.introduction_game.showPlayField,
                components_algorithms.sync_functions_game.introduction_game.setPlayFieldStatusIntroduction,
                components_algorithms.sync_functions_game.introduction_game.showGameName,
                components_algorithms.sync_functions_game.introduction_game.setPlayFieldStatusExpection
            ],
            name_next_algorithm: 'preparation_start_game'
        },
        preparation_start_game: {
            components: [
                components_algorithms.sync_functions_game.preparation_start_game.setPlayFieldStatusPrepare,
                components_algorithms.sync_functions_game.preparation_start_game.hideGameOverTextAndResultGamer,
                components_algorithms.sync_functions_game.preparation_start_game.hideGameName,
                components_algorithms.sync_functions_game.preparation_start_game.animationStartGame,
                components_algorithms.sync_functions_game.preparation_start_game.showCounterObstacles,
                components_algorithms.sync_functions_game.preparation_start_game.setPlayFieldStatusExpectionProcessGame,
                components_algorithms.sync_functions_game.preparation_start_game.showAndStartDemonstratePlayersFlight
            ],
            name_next_algorithm: 'start_game'
        },
        start_game: {
            components: [
                components_algorithms.sync_functions_game.start_game.setPlayFieldStatusProcessGame,
                components_algorithms.sync_functions_game.start_game.startCounterObstacles,
                components_algorithms.sync_functions_game.start_game.startCreatingAndMovingObstaclesOnPlayer,
                components_algorithms.sync_functions_game.start_game.checkMovementPlayer
            ],
            name_next_algorithm: 'end_game'
        },
        end_game: {
            components: [
                components_algorithms.sync_functions_game.end_game.setPlayFieldStatusGameOver,
                components_algorithms.sync_functions_game.end_game.animationLosingFall,
                components_algorithms.sync_functions_game.end_game.animationEndGame,
                components_algorithms.sync_functions_game.end_game.clearPlayField,
                components_algorithms.sync_functions_game.end_game.showGameOverTextAndResultGamer,
                components_algorithms.sync_functions_game.end_game.setPlayFieldStatusExpection
            ],
            name_next_algorithm: 'preparation_start_game'
        }

    },

}

// export //
export { algorithms };
