
// import //
import { collector_components } from '../../../components/collector_components.js';
import { collector_elements } from '../../../elements/collector_elements.js';

// components for the algorithms //
const components_algorithms = {

    introduction_game: {

        // create HTML //
        createHTMLPlayField() {
            collector_components.play_field.createHTML();
            collector_components.play_field.endExecutionCurrentFunction();
        },

        createHTMLIntroductionMessage() {
            collector_elements.texts.introduction_message.createHTML();
            collector_elements.texts.introduction_message.endExecutionCurrentFunction();
        },

        createHTMLGameName() {
            collector_elements.texts.game_name.createHTML();
            collector_elements.texts.game_name.endExecutionCurrentFunction();
        },

        createHTMLSuggestionStartGame() {
            collector_elements.texts.suggestion_start_game.createHTML();
            collector_elements.texts.suggestion_start_game.endExecutionCurrentFunction();
        },

        // animations //

        // narrowing
        narrowingPlayField() {
            collector_components.play_field.ANIMATIONS_SETTINGS.ANIMATIONS.narrowing.start();
        },

        // showing
        showIntroductionMessage() {

            collector_elements.texts.introduction_message.setIntroductionMessage(
                'Hello world',
                'Привет, мир',
                '你好世界',
                'Hallo Welt',
                'Bonjour le monde'
            );
            collector_elements.texts.introduction_message.ANIMATIONS_SETTINGS.ANIMATIONS.appear.start();

        },

        showGameName() {
            collector_elements.texts.game_name.ANIMATIONS_SETTINGS.ANIMATIONS.appear.start();
        },

        showSuggestionStartGame() {
            collector_elements.texts.suggestion_start_game.ANIMATIONS_SETTINGS.ANIMATIONS.appear.start();
        },

        // setter //
        setPlayFieldStatusIntroduction() {

            collector_components.play_field.setClassName(
                collector_components.play_field.statuses.introduction.classes
            );
            collector_components.play_field.setHtmlValue(
                collector_components.play_field.statuses.introduction.html
            );
            collector_components.play_field.HTML_LINK.parentElement.style.cursor = 'auto';

            collector_components.play_field.endExecutionCurrentFunction();

        },

        setPlayFieldStatusExpection() {

            collector_components.play_field.setClassName(
                collector_components.play_field.statuses.expection.classes
            );
            collector_components.play_field.HTML_LINK.parentElement.style.cursor = 'pointer';

            collector_components.play_field.endExecutionCurrentFunction();

        }

    },

    preparation_start_game: {

        // create HTML //
        createHTMLCircle() {
            collector_elements.figures.circle.createHTML();
            collector_elements.figures.circle.endExecutionCurrentFunction();
        },

        createHTMLCounterObstacles() {
            collector_elements.counters.counter_obstacles.createHTML();
            collector_elements.counters.counter_obstacles.endExecutionCurrentFunction();
        },

        createHTMLPlayer() {
            collector_components.player.createHTML();
            collector_components.player.endExecutionCurrentFunction();
        },

        createHTMLCountdown() {
            collector_elements.counters.countdown.createHTML();
            collector_elements.counters.countdown.endExecutionCurrentFunction();
        },

        // animations //

        // stop showing
        stopShowingSuggestionStartGame() {
            collector_elements.texts.suggestion_start_game.stopShow();
        },

        // start game
        animationStartGame() {
            collector_elements.figures.circle.ANIMATIONS_SETTINGS.ANIMATIONS.scale.start();
        },

        // showing
        showCounterObstacles() {
            collector_elements.counters.counter_obstacles.ANIMATIONS_SETTINGS.ANIMATIONS.move_down.start();
        },

        showAndStartDemonstratePlayersFlight() {

            collector_components.player.ANIMATIONS_SETTINGS.ANIMATIONS.moving_to_right.start();
            collector_components.player.startDemonstrationFlight();

        },

        // hidding
        hideResultGamer() {

            collector_elements.texts.result_gamer.deleteHTML();
            collector_elements.texts.result_gamer.endExecutionCurrentFunction();

        },

        hideGameOver() {

            if (collector_elements.texts.game_over.HTML_LINK) {
                collector_elements.texts.game_over.ANIMATIONS_SETTINGS.ANIMATIONS.disappear.start();
            }

            collector_elements.texts.game_over.endExecutionCurrentFunction();

        },

        hideGameName() {

            if (collector_elements.texts.game_name.HTML_LINK) {
                collector_elements.texts.game_name.ANIMATIONS_SETTINGS.ANIMATIONS.disappear.start();
            }

            collector_elements.texts.game_name.endExecutionCurrentFunction();

        },

        // setter //
        setPlayFieldStatusPrepare() {

            collector_components.play_field.setClassName(
                collector_components.play_field.statuses.prepare_game.classes
            );
            collector_components.play_field.HTML_LINK.parentElement.style.cursor = 'auto';

            collector_components.play_field.endExecutionCurrentFunction();

        },

        setPlayFieldStatusExpectionProcessGame() {

            collector_components.play_field.setClassName(
                collector_components.play_field.statuses.expection_process_game.classes
            );
            collector_components.play_field.HTML_LINK.parentElement.style.cursor = 'pointer';

            collector_components.play_field.endExecutionCurrentFunction();

        },

    },

    start_game: {

        // animations //

        // starting
        startCreatingAndMovingObstaclessOnPlayer() {

            // Importent Note !!! //
            // Сначала запускаем автообновление счётчика препятствий
            // и только потом создание препятствий

            collector_components.obstacles_administrator.startAutoUpdatingNumberCurrentObstacle();
            collector_components.obstacles_administrator.startCreatingAndMovingObstacles();

            collector_components.player.endExecutionCurrentFunction();

        },

        // starting //
        startCounterObstacles() {
            collector_elements.counters.counter_obstacles.start();
            collector_elements.counters.counter_obstacles.endExecutionCurrentFunction();
        },

        // checking //
        checkMovementPlayer() {
            collector_components.player.checkMovement();
        },

        // setter //
        setPlayFieldStatusProcessGame() {

            collector_components.play_field.setClassName(
                collector_components.play_field.statuses.process_game.classes
            );
            collector_components.play_field.HTML_LINK.parentElement.style.cursor = 'pointer';

            collector_components.play_field.endExecutionCurrentFunction();

        },

        setPlayFieldStatusGameOver() {

            collector_components.play_field.setClassName(
                collector_components.play_field.statuses.game_over.classes
            );
            collector_components.play_field.HTML_LINK.parentElement.style.cursor = 'auto';

        },

    },

    end_game: {

        // create HTML //
        createHTMLResultGamerAndGameOver() {

            collector_elements.texts.game_over.createHTML();
            collector_elements.texts.result_gamer.createHTML();

            collector_elements.texts.result_gamer.endExecutionCurrentFunction();

        },

        createHTMLSuggestionStartGame() {
            collector_elements.texts.suggestion_start_game.DOM_TREE_SETTINGS.involved_element = '#game_over';
            collector_elements.texts.suggestion_start_game.createHTML();
        },

        // animations //

        // losing fall
        animationLosingFall() {
            collector_components.player.ANIMATIONS_SETTINGS.ANIMATIONS.losing_fall.start();
        },

        // end game
        animationEndGame() {

            collector_elements.figures.circle.createHTML();
            collector_elements.figures.circle.ANIMATIONS_SETTINGS.ANIMATIONS.scale.start();

        },

        // showing
        showGameOver() {
            collector_elements.texts.game_over.ANIMATIONS_SETTINGS.ANIMATIONS.appear.start();
        },

        showResultGamer() {
            collector_elements.texts.result_gamer.ANIMATIONS_SETTINGS.ANIMATIONS.appear.start();
        },

        showSuggestionStartGame() {
            collector_elements.texts.suggestion_start_game.ANIMATIONS_SETTINGS.ANIMATIONS.appear();
        },

        // clear //
        clearPlayField() {

            collector_components.play_field.setHtmlValue(
                collector_components.play_field.statuses.introduction.html
            );

            collector_components.play_field.endExecutionCurrentFunction();

        },

        // setter //
        setPlayFieldStatusExpection() {

            collector_components.play_field.setClassName(
                collector_components.play_field.statuses.expection.classes
            );
            collector_components.play_field.HTML_LINK.parentElement.style.cursor = 'pointer';

            collector_components.play_field.endExecutionCurrentFunction();

        }

    },

};

// export //
export { components_algorithms };