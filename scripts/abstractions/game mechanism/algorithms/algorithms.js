
// import //
import { components_algorithms } from "./components_algorithms.js";

// the main algorithmic constructions of the game //
const algorithms = {

    introduction_game: [
        components_algorithms.introduction_game.createHTMLPlayField,
        components_algorithms.introduction_game.narrowingPlayField,
        components_algorithms.introduction_game.setPlayFieldStatusIntroduction,
        components_algorithms.introduction_game.createHTMLIntroductionMessage,
        components_algorithms.introduction_game.showIntroductionMessage,
        components_algorithms.introduction_game.createHTMLGameName,
        components_algorithms.introduction_game.showGameName,
        components_algorithms.introduction_game.setPlayFieldStatusExpection,
        components_algorithms.introduction_game.createHTMLSuggestionStartGame,
        components_algorithms.introduction_game.showSuggestionStartGame,
    ],

    preparation_start_game: [
        components_algorithms.preparation_start_game.setPlayFieldStatusPrepare,
        components_algorithms.preparation_start_game.stopShowingSuggestionStartGame,
        components_algorithms.preparation_start_game.hideResultGamer,
        components_algorithms.preparation_start_game.createHTMLCircle,
        components_algorithms.preparation_start_game.animationStartGame,
        components_algorithms.preparation_start_game.hideGameOver,
        components_algorithms.preparation_start_game.hideGameName,
        components_algorithms.preparation_start_game.createHTMLCounterObstacles,
        components_algorithms.preparation_start_game.showCounterObstacles,
        components_algorithms.preparation_start_game.createHTMLPlayer,
        components_algorithms.preparation_start_game.setPlayFieldStatusExpectionProcessGame,
        components_algorithms.preparation_start_game.showAndStartDemonstratePlayersFlight,
    ],

    start_game: [
        components_algorithms.start_game.setPlayFieldStatusProcessGame,
        components_algorithms.start_game.startCounterObstacles,
        components_algorithms.start_game.startCreatingAndMovingObstaclessOnPlayer,
        components_algorithms.start_game.checkMovementPlayer,
        components_algorithms.start_game.setPlayFieldStatusGameOver,
    ],

    end_game: [
        components_algorithms.end_game.animationLosingFall,
        components_algorithms.end_game.animationEndGame,
        components_algorithms.end_game.clearPlayField,
        components_algorithms.end_game.createHTMLResultGamerAndGameOver,
        components_algorithms.end_game.showGameOver,
        components_algorithms.end_game.showResultGamer,
        components_algorithms.end_game.setPlayFieldStatusExpection,
        components_algorithms.end_game.createHTMLSuggestionStartGame,
        components_algorithms.end_game.showSuggestionStartGame,
    ],

}

// export //
export { algorithms };