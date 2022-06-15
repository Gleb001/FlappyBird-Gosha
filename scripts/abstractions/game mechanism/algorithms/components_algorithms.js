
// import //
import { collector_elements } from '../../../elements/collector_elements.js';
import { collector_components } from '../../../components/collector_components.js';

// components for the algorithms //
const components_algorithms = {

    introduction_game: {

        // initalisation //
        initialisationPlayField() {
            collector_components.play_field.initialisation();
        },

        initialisationIntroductionMessage() {
            collector_elements.texts.introduction_message.initialisation();
        },

        initialisationGameName() {
            collector_elements.texts.game_name.initialisation();
        },

        initialisationSuggestionStartGame() {
            collector_elements.texts.suggestion_start_game.initialisation();
        },

        // show //
        showFrameworkPlayField() {
            collector_components.play_field.showFramework();
        },

        showIntroductionMessage() {

            collector_elements.texts.introduction_message.setIntroductionMessage({
                parts_message: [
                    'Hello world',
                    'Привет, мир',
                    '你好世界',
                    'Hallo Welt',
                    'Bonjour le monde'
                    // 'I present to you my game',
                    // 'called'
                ]
            });
            collector_elements.texts.introduction_message.show();

        },

        showGameName() {
            collector_elements.texts.game_name.show();
        },

        showSuggestionStartGame() {
            collector_elements.texts.suggestion_start_game.show();
        },

        // set //
        setPlayFieldStatusExpection() {

            collector_components.play_field.setCLASS_NAME(
                collector_components.play_field.status.expection.class
            );

            collector_components.play_field.endExecutionCurrentFunction();

        }

    },

    preparation_start_game: {

        // set //
        setPlayFieldStatusPrepare() {

            collector_components.play_field.setCLASS_NAME(
                collector_components.play_field.status.prepare_game.class
            );

            collector_components.play_field.endExecutionCurrentFunction();

        },

        setPlayFieldStatusExpectionProcessGame() {

            collector_components.play_field.setCLASS_NAME(
                collector_components.play_field.status.expection_process_game.class
            );

        },

        // stop //
        stopShowingSuggestionStartGame() {
            collector_elements.texts.suggestion_start_game.stopShow();
        },

        // animation start game //
        animationStartGame() {

            collector_elements.figures.circle.initialisation();
            collector_elements.figures.circle.show(
                collector_elements.figures.circle.show_command.start_game
            );

        },

        // hide //
        hideResultGamer() {

            if (collector_elements.texts.result_gamer.HTML_LINK != null) {
                collector_elements.texts.result_gamer.delete();
            }

            collector_components.player.endExecutionCurrentFunction();

        },

        hideGameNameOrGameOver() {

            if (collector_elements.texts.game_over.HTML_LINK != null) {
                collector_elements.texts.game_over.hide();
                return;
            }

            if (collector_elements.texts.game_name.HTML_LINK != null) {
                collector_elements.texts.game_name.hide();
                return;
            }

        },

        // initialisation //
        initializationCounterObstacles() {
            collector_elements.counters.counter_obstacles.initialisation();
        },

        initializationCountdown() {
            collector_components.player.initialisation();
        },

        initializationPlayer() {
            collector_components.player.initialisation();
        },

        initializationCountdown() {
            collector_elements.counters.countdown.initialisation();
        },

        // show //
        showCounterObstacles() {
            collector_elements.counters.counter_obstacles.show();
        },

        // show and start demonstrate the player's flight // 
        showAndStartDemonstratePlayersFlight() {
            collector_components.player.show();
            collector_components.player.startDemonstrationFlight();
            collector_components.player.endExecutionCurrentFunction();
        },

        // start //
        startCountdown() {
            collector_elements.counters.countdown.prepare({
                number_of_countdown: 3,
                value_final_phrase: 'GO'
            });
            collector_elements.counters.countdown.show();
        },

        startObstacleCounter() {
            collector_elements.counters.counter_obstacles.start();
        },

        // change //
        changeBackColorFramework() {
            collector_components.play_field.changeBackColorFramework();
        },

    },

    start_game: {

        // set //
        setPlayFieldStatusProcessGame() {

            collector_components.play_field.setCLASS_NAME(
                collector_components.play_field.status.process_game.class
            );

            collector_components.play_field.endExecutionCurrentFunction();

        },

        setPlayFieldStatusGameOver() {

            collector_components.play_field.setCLASS_NAME(
                collector_components.play_field.status.game_over.class
            );

        },

        // stop //
        stopDemonstrationFlight() {
            collector_components.player.stopDemonstrationFlight();
            collector_components.player.endExecutionCurrentFunction();
        },

        // tracking player actions //
        trackingGamerActions() {

            window.addEventListener('click', PlayerFly);
            window.addEventListener('keydown', PlayerFly);

            function PlayerFly(event) {

                let element = event.target;

                if (
                    document.querySelector('.player_fall') && document.querySelector('.js-play_field__process_game') &&
                    (element.classList.contains('js-play_field__process_game') || event.code == 'Space')
                ) {
                    collector_components.player.fly();
                }

            }

            collector_components.player.endExecutionCurrentFunction();

        },

        // start //
        startCreatingAndMovingObstaclesOnPlayer() {
            collector_components.Obstacle.startCreatingAndMovingObstaclesOnPlayer();
            collector_components.player.endExecutionCurrentFunction();
        },

        // check //
        checkMovementPlayer() {
            collector_components.player.checkMovement();
        },


    },

    end_game: {

        // animations //
        animationLosingFall() {
            collector_components.player.losingFall();
        },

        animationEndGame() {

            collector_elements.figures.circle.initialisation();
            collector_elements.figures.circle.show(
                collector_elements.figures.circle.show_command.end_game
            );

        },

        // turn off //
        turnOffAsyncFunction() {

            collector_components.Obstacle.endCreatingAndMovingObstaclesOnPlayer();
            collector_components.player.endCheckMovement();
            // collector_elements.counters.counter_obstacles.end();

            collector_components.player.endExecutionCurrentFunction();

        },

        // clear //
        clearPlayField() {

            collector_components.play_field.setHTML_VALUE(
                collector_components.play_field.status.game_over.html
            );

            collector_components.play_field.endExecutionCurrentFunction();

        },

        // initialisations //
        initialisationResultGamerAndGameOver() {

            collector_elements.texts.game_over.initialisation();
            collector_elements.texts.result_gamer.initialisation();

            collector_elements.texts.result_gamer.endExecutionCurrentFunction();

        },

        initialisationSuggestionStartGame() {
            collector_elements.texts.suggestion_start_game.INVOLVED_ELEMENT = '#game_over';
            collector_elements.texts.suggestion_start_game.initialisation();
        },

        // show //
        showGameOver() {
            collector_elements.texts.game_over.show();
        },

        showResultGamer() {
            collector_elements.texts.result_gamer.show(collector_components.Obstacle.NumberPassedObstacle);
        },

        showSuggestionStartGame() {
            collector_elements.texts.suggestion_start_game.show();
        },

        // set //
        setPlayFieldStatusExpection() {

            collector_components.play_field.setCLASS_NAME(
                collector_components.play_field.status.expection.class
            );

            collector_components.play_field.endExecutionCurrentFunction();

        }

    },

};

// export //
export { components_algorithms };



// Note //

// n.1
// Напиши функцию, которая будет проигрывать
// сразу две и более функции одновременно

// n.2
// Попробуй как-нибудь упростить и самое главное
// упорядочить такие моменты в компонентах и элементах
// как наличие ссылки на html объект 