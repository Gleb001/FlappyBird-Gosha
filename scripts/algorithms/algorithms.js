
// import ====================================================== //

// components of algorithm ------------------------------------- //
import components_of_algorithms from "./components_of_algorithms.js";

// sync game engine for set create algorithms ------------------ //
import GameEngine from "../game_engines/game_engine.js";


// main ======================================================== //

// intro game -------------------------------------------------- //
GameEngine.algorithm.add({
    name: "intro_game",
    name_next: "preparation_game",
    components: [
        components_of_algorithms.intro_game.showPlayField,
        components_of_algorithms.intro_game.showGameName,
        components_of_algorithms.intro_game.setPlayFieldExpectionClass,
        components_of_algorithms.intro_game.suggestionMakeAction,
    ],
});

// preparation game -------------------------------------------- //
GameEngine.algorithm.add({
    name: "preparation_game",
    name_next: "start_game",
    components: [
        components_of_algorithms.preparation_game.hideChildrenPlayField,
        components_of_algorithms.preparation_game.animationStartGame,
        components_of_algorithms.preparation_game.showCounterObstacles,
        components_of_algorithms.preparation_game.setPlayFieldExpectionClass,
        components_of_algorithms.preparation_game.showPlayer,
    ],
    trigger: components_of_algorithms.preparation_game.trigger,
});

// start game -------------------------------------------------- //
GameEngine.algorithm.add({
    name: "start_game",
    name_next: "end_game",
    components: [
        components_of_algorithms.start_game.setPlayFieldProcessGameClass,
        components_of_algorithms.start_game.launchObstacles,
        components_of_algorithms.start_game.launchCountObstacles,
    ],
    trigger: components_of_algorithms.start_game.trigger,
});

// end game ---------------------------------------------------- //
GameEngine.algorithm.add({
    name: "end_game",
    name_next: "preparation_game",
    components: [
        components_of_algorithms.end_game.removePlayFieldProcessGameClass,
        components_of_algorithms.end_game.animationLosingFall,
        components_of_algorithms.end_game.animationEndGame,
        components_of_algorithms.end_game.clearPlayField,
        components_of_algorithms.end_game.showResultGamer,
        components_of_algorithms.end_game.setPlayFieldExpectionClass,
        components_of_algorithms.end_game.suggestionMakeAction,
    ],
    trigger: components_of_algorithms.end_game.trigger,
});
