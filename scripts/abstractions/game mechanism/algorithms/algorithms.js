
// import abstractions
import { components_algorithms } from "./components_algorithms.js";

// the main algorithmic constructions of the game
const algorithms = {

    introduction_game: [
        components_algorithms.introduction_game.initialisationPlayField,
        components_algorithms.introduction_game.showFrameworkPlayField,
        components_algorithms.introduction_game.initialisationIntroductionMessage,
        components_algorithms.introduction_game.showIntroductionMessage,
        components_algorithms.introduction_game.initialisationGameName,
        components_algorithms.introduction_game.showGameName,
        components_algorithms.introduction_game.setPlayFieldStatusExpection,
        components_algorithms.introduction_game.initialisationSuggestionStartGame,
        components_algorithms.introduction_game.showSuggestionStartGame,
    ],

    preparation_start_game: [
        components_algorithms.preparation_start_game.setPlayFieldStatusPrepare,
        components_algorithms.preparation_start_game.stopShowingSuggestionStartGame,
        components_algorithms.preparation_start_game.hideResultGamer,
        components_algorithms.preparation_start_game.animationStartGame,
        components_algorithms.preparation_start_game.hideGameNameOrGameOver,
        components_algorithms.preparation_start_game.initializationCounterObstacles,
        components_algorithms.preparation_start_game.showCounterObstacles,
        components_algorithms.preparation_start_game.startObstacleCounter,
        components_algorithms.preparation_start_game.initializationPlayer,
        components_algorithms.preparation_start_game.showAndStartDemonstratePlayersFlight,
        components_algorithms.preparation_start_game.setPlayFieldStatusExpectionProcessGame,
    ],

    start_game: [
        components_algorithms.start_game.setPlayFieldStatusProcessGame,
        components_algorithms.start_game.stopDemonstrationFlight,
        components_algorithms.start_game.trackingGamerActions,
        components_algorithms.start_game.startCreatingAndMovingObstaclesOnPlayer,
        components_algorithms.start_game.checkMovementPlayer,
        components_algorithms.start_game.setPlayFieldStatusGameOver,
    ],

    end_game: [
        components_algorithms.end_game.turnOffAsyncFunction,
        components_algorithms.end_game.animationLosingFall,
        components_algorithms.end_game.animationEndGame,
        components_algorithms.end_game.clearPlayField,
        components_algorithms.end_game.initialisationResultGamerAndGameOver,
        components_algorithms.end_game.showGameOver,
        components_algorithms.end_game.showResultGamer,
        components_algorithms.end_game.setPlayFieldStatusExpection,
        components_algorithms.end_game.initialisationSuggestionStartGame,
        components_algorithms.end_game.showSuggestionStartGame,
    ],

}

// export
export { algorithms };



// Note //

// n.1
// есть три вида сущности в данном проекте
// 1) абстракции (сущности, которые не находят своё отражение в игре,
// однако являются вспомогательным механизмом/надстройкой над уже
// существующими элементами)
// 2) элементы (сущности, которые дополняют интерфейс игры, но не являются
// основополагающими сущностями, т.е можно обойтись без них)
// 3) компоненты (противоположная элементу сущность, которая является
// фундаментом игрового интерфейса, т.е он составляет непосредственно
// мехинику игры)

// n.2
// general game function (abstract) object
// коробка игровых функций
// Её задача: содержание всех игровых функций
// алгоритма игры без чёткой структуры,
// т.е содержит составные части игрового
// алгоритма

// n.3
// switch to the following algoritmic construction //
// connecting link //
// autoSwitchToNextAlgoritmicConstruction() {
// },