
// import //
import { collector_components } from '../../../components/collector_components.js';
import { collector_elements } from '../../../elements/collector_elements.js';

// components for the algorithms //
const components_algorithms = {

    async_functions_game: {

        reactionOnExpectionInGame() {
            collector_elements.texts.suggestion_make_action.reactionOnExpectionPlayField();
        },

        changeCursorDependingOnClassPlayField() {
            collector_components.play_field.changeCursorDependingOnClassPlayField();
        }

    },

    sync_functions_game: {

        introduction_game: {

            // animations //

            // showing
            showPlayField() {

                collector_components.play_field.createHTML();

                if (window.screen.availWidth > 1000) {
                    collector_components.play_field.ANIMATIONS_SETTINGS.ANIMATIONS.narrowing.start();
                }

            },

            showGameName() {

                collector_elements.texts.game_name.createHTML();
                collector_elements.texts.game_name.ANIMATIONS_SETTINGS.ANIMATIONS.appear.start();

            },

            // setter //
            setPlayFieldStatusIntroduction() {

                collector_components.play_field.setClassName(
                    collector_components.play_field.statuses.introduction_game.class
                );
                collector_components.play_field.setHtmlValue(
                    collector_components.play_field.statuses.introduction_game.html
                );

            },

            setPlayFieldStatusExpection() {

                collector_components.play_field.setClassName(
                    collector_components.play_field.statuses.expection_prepare_game.class
                );

            }

        },

        preparation_start_game: {

            // animations //

            // start game
            animationStartGame() {

                collector_elements.figures.circle.createHTML();
                collector_elements.figures.circle.ANIMATIONS_SETTINGS.ANIMATIONS.scale.start();

            },

            // showing
            showCounterObstacles() {
                collector_elements.counters.counter_obstacles.createHTML();
                collector_elements.counters.counter_obstacles.ANIMATIONS_SETTINGS.ANIMATIONS.move_down.start();
            },

            showAndStartDemonstratePlayersFlight() {

                collector_components.player.createHTML();
                collector_components.player.ANIMATIONS_SETTINGS.ANIMATIONS.moving_to_right.start();
                collector_components.player.ANIMATIONS_SETTINGS.ANIMATIONS.fall.start();
                collector_components.player.startDemonstrationFlight();

            },

            // hidding
            hideGameOverTextAndResultGamer() {

                if (collector_elements.texts.result_gamer.HTML_LINK) {
                    collector_elements.texts.result_gamer.ANIMATIONS_SETTINGS.ANIMATIONS.disappear.start();
                }

                if (collector_elements.texts.game_over_text.HTML_LINK) {
                    collector_elements.texts.game_over_text.ANIMATIONS_SETTINGS.ANIMATIONS.disappear.start();
                }

            },

            hideGameName() {

                if (collector_elements.texts.game_name.HTML_LINK) {
                    collector_elements.texts.game_name.ANIMATIONS_SETTINGS.ANIMATIONS.disappear.start();
                }

            },

            // setter //
            setPlayFieldStatusPrepare() {

                collector_components.play_field.setClassName(
                    collector_components.play_field.statuses.prepare_game.class
                );

            },

            setPlayFieldStatusExpectionProcessGame() {

                collector_components.play_field.setClassName(
                    collector_components.play_field.statuses.expection_process_game.class
                );

            },

        },

        start_game: {

            // animations //

            // starting
            startCreatingAndMovingObstaclesOnPlayer() {

                // Importent Note !!! //
                // Сначала запускаем автообновление счётчика препятствий
                // и только потом создание препятствий

                collector_components.obstacles_administrator.startAutoUpdatingNumberCurrentObstacle();
                collector_components.obstacles_administrator.startCreatingAndMovingObstacles();

            },

            // starting //
            startCounterObstacles() {
                collector_elements.counters.counter_obstacles.start();
            },

            // setter //
            setPlayFieldStatusProcessGame() {

                collector_components.play_field.setClassName(
                    collector_components.play_field.statuses.process_game.class
                );

            },

            // check //
            checkMovementPlayer() {
                collector_components.player.checkMovement();
            },

        },

        end_game: {

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
            showGameOverTextAndResultGamer() {

                collector_elements.texts.game_over_text.createHTML();
                collector_elements.texts.result_gamer.createHTML();

                collector_elements.texts.result_gamer.ANIMATIONS_SETTINGS.ANIMATIONS.appear.start();
                collector_elements.texts.game_over_text.ANIMATIONS_SETTINGS.ANIMATIONS.appear.start();

            },

            // clear //
            clearPlayField() {

                collector_components.play_field.setHtmlValue(
                    collector_components.play_field.statuses.introduction_game.html
                );

            },

            // setter //
            setPlayFieldStatusExpection() {

                collector_components.play_field.setClassName(
                    collector_components.play_field.statuses.expection_prepare_game.class
                );

            },

            setPlayFieldStatusGameOver() {

                collector_components.play_field.setClassName(
                    collector_components.play_field.statuses.game_over.class
                );

            },

        },

    },

};

// export //
export { components_algorithms };