
// import ====================================================== //

// game elements ----------------------------------------------- //
import play_field from "../game_components/main/play_field.js";
import circle from "../animation_elements/circle.js";
import player from "../game_components/main/player.js";
import obstacle_settings from "../game_components/main/obstacle.js";
import { suggestion_make_action } from "../game_components/additional/suggestion_make_action.js";
import counter_obstacles from "../game_components/main/counter_obstacles.js";

// utility ----------------------------------------------------- //
import { AnimationCSS } from "../utility/work_with_animations.js";
import createElementHTML from "../utility/work_with_html.js";

// game engine ------------------------------------------------- //
import GameEngine from "../game_engines/game_engine.js";


// main ======================================================== //
const components_of_algorithms = {

    intro_game: {
        // play field -------------------------------------- //
        showPlayField() {

            // 1. insert html play field
            let container_game = document.querySelector(".container_game");
            container_game.append(play_field.HTML);

            // 2. show play field
            if (window.screen.availWidth > 1000) {
                new AnimationCSS({
                    name_animation: "narrowing_play_field",
                    changing_elements: [play_field.HTML],
                    timing_settings: {
                        duration: 750,
                        timing_function: "ease-out",
                        synchronous: true,
                    },
                    changing_properties: [
                        {
                            name: "width",
                            unit_of_measurement: "vw",
                            start_value: 100,
                            end_value: 100 - play_field.narrowing_value
                        },
                    ],
                }).start();
            }

        },
        setPlayFieldExpectionClass() {
            play_field.HTML.classList.add(play_field.statuses.expection);
        },
        // game name --------------------------------------- //
        showGameName() {

            // 1. create game name
            let game_name = createElementHTML({
                attributes: {
                    id: "game_name",
                    class: "main_title",
                    style: "opacity: 0;",
                },
                inner_value: "Flappy Gosha",
            });

            // 2. create wrapper for the game element
            let game_name_wrapper = document.createElement("div");
            game_name_wrapper.classList.add("game_name__wrapper");

            // 3. insert game name
            game_name_wrapper.prepend(game_name);
            play_field.HTML.prepend(game_name_wrapper);

            // 4. show game name
            game_name.style.animation = "appear 1000ms linear forwards";

            // 5. pause synchronous game engine
            GameEngine.pause();
            setTimeout(() => { GameEngine.startAfterPause(); }, 1000);

        },
        // suggestion make an action ----------------------- //
        suggestionMakeAction() {
            setTimeout(() => {
                suggestion_make_action.ANIMATIONS.show();
            }, 1000);
        },
    },

    preparation_game: {
        // trigger ----------------------------------------- //
        trigger() {
            return !play_field.HTML.classList.contains(
                play_field.statuses.expection
            );
        },
        // play field -------------------------------------- //
        hideChildrenPlayField() {

            // 1. get all the children of the play field
            // except the last one
            let children_play_field = Array.from(play_field.HTML.children);
            children_play_field.pop();

            // 2. hide the children of the playing field
            for (
                let index = 0;
                index < children_play_field.length;
                index++
            ) {
                let child = children_play_field[index];
                child.style.animation = "1s linear disappear forwards";
            }

            // 3. remove hidden children of the playing field
            setTimeout(function () {
                children_play_field.forEach(child => child.remove());
            }, 1000);

        },
        setPlayFieldExpectionClass() {
            play_field.HTML.classList.add(play_field.statuses.expection);
        },
        // animation circle -------------------------------- //
        animationStartGame() {

            // 1. set default values for circle
            circle.HTML.style.backgroundColor = "white";

            // 2. create circle and insert circle
            play_field.HTML.prepend(circle.HTML);

            // 3. animation scale circle
            circle.scale();

        },
        // counter obstacles ------------------------------- //
        showCounterObstacles() {

            // 1. set default values
            counter_obstacles.HTML.style.top = "-100px";
            counter_obstacles.HTML.value = 0;
            counter_obstacles.HTML.style.right = counter_obstacles.position_right + "px";

            // 2. insert counter obstacles
            play_field.HTML.prepend(counter_obstacles.HTML);

            // 2. show counter obstacles
            new AnimationCSS({
                name_animation: "move_down_counter_obstacles",
                changing_elements: [counter_obstacles.HTML],
                timing_settings: {
                    duration: 300,
                    timing_function: "linear",
                    synchronous: true,
                },
                changing_properties: [
                    {
                        name: "top",
                        unit_of_measurement: "px",
                        start_value: counter_obstacles.HTML.offsetTop,
                        end_value: 0,
                    }
                ],
            }).start();

        },
        // player ------------------------------------------ //
        showPlayer() {

            // 1. set default values for player
            player.HTML.style.top = (window.screen.height / 2 - 70) + "px";
            player.HTML.style.left = "-150px";

            // 2. create player
            play_field.HTML.prepend(player.HTML);

            // 3. show player
            player.show();

        },
    },

    start_game: {
        // trigger ----------------------------------------- //
        trigger() {
            return !play_field.HTML.classList.contains(
                play_field.statuses.expection
            );
        },
        // play field -------------------------------------- //
        setPlayFieldProcessGameClass() {
            play_field.HTML.classList.add(play_field.statuses.process_game);
        },
        // obstacles administrator ------------------------- //
        launchObstacles() {

            // 1. get a settings obstacle
            let width_obstacle = obstacle_settings.width;
            let duration_animation = obstacle_settings.duration_moving;
            let name_animation = "moving_obstacle";

            // 2. create obstacle wrapper
            let obstacle_wrapper = document.createElement("div");
            obstacle_wrapper.classList.add("obstacle_wrapper");
            play_field.HTML.append(obstacle_wrapper);

            // 3. create animation css file
            AnimationCSS.createAnimationCSSFile(
                [
                    {
                        name: "left",
                        unit_of_measurement: "px",
                        start_value: play_field.HTML.offsetWidth + width_obstacle,
                        end_value: -(width_obstacle + 20),
                    }
                ],
                name_animation
            );

            // 3. launch obstacles
            let creating_obstacles = setInterval(() => {

                // 3.1 check class play field
                if (!play_field.HTML.classList.contains(
                    play_field.statuses.process_game
                )) clearInterval(creating_obstacles);

                // 3.2 create new obstacle
                let new_obstacle = createElementHTML({
                    attributes: {
                        class: `obstacle`,
                        style: `
                            width: ${width_obstacle}px;
                            animation:
                                ${name_animation}
                                ${duration_animation}ms
                                linear
                                forwards;
                        `,
                    },
                    inner_value: obstacle_settings.inner_html
                });

                // 3.3 insert new obstacle and start moving obstalce
                obstacle_wrapper.append(new_obstacle);

                // 3.4 remove new_obstacle
                setTimeout(() => new_obstacle.remove(), duration_animation);

            }, obstacle_settings.interval_create);

        },
        // launch count obstacles -------------------------- //
        launchCountObstacles() {
            counter_obstacles.start();
        },
    },

    end_game: {
        // trigger ----------------------------------------- //
        trigger() {

            return (_collisionPlayerWithObstacle() || _collisionPlayerToFloor());

            function _collisionPlayerToFloor() {
                return (
                    play_field.HTML.offsetHeight ==
                    player.HTML.offsetHeight + player.HTML.offsetTop
                );
            };
            function _collisionPlayerWithObstacle() {

                // obstacle
                let current_obstacle = counter_obstacles.current_obstacle;
                if (!current_obstacle) return false;

                let obstacle_top = current_obstacle.querySelector('.obstacle_top');
                let obstacle_bottom = current_obstacle.querySelector('.obstacle_bottom');
                let x_end_position_obstacle = current_obstacle.offsetLeft + current_obstacle.offsetWidth;

                // player
                let x_position_player = player.HTML.offsetLeft + player.HTML.offsetWidth;

                // pixel
                let pixel = 15;

                let first_expression =
                    player.HTML.offsetLeft - pixel <= x_end_position_obstacle &&
                    x_position_player - pixel >= current_obstacle.offsetLeft;

                let second_expression =
                    player.HTML.offsetTop - pixel <= (obstacle_top.clientHeight - player.HTML.offsetHeight * 0.38) ||
                    (player.HTML.offsetHeight + player.HTML.offsetTop) - pixel >= (obstacle_bottom.offsetTop - player.HTML.offsetHeight * 0.6);

                if (first_expression && second_expression) return true;

            };

        },
        // play field -------------------------------------- //
        setPlayFieldExpectionClass() {
            play_field.HTML.classList.add(play_field.statuses.expection);
        },
        removePlayFieldProcessGameClass() {
            play_field.HTML.classList.remove(play_field.statuses.process_game);
        },
        showResultGamer() {

            // 1. create score
            let score_player = createElementHTML({
                attributes: {
                    id: "result_gamer",
                    style: "opacity: 0;",
                },
                inner_value:
                `
                    <p class="counter_obstacles_text">
                        ${counter_obstacles.score_player}
                    </p>
                    <p class="main_title">your score</p>
                `,
            });

            // 2. insert game name
            play_field.HTML.prepend(score_player);

            // 3. show game name
            score_player.style.animation = "appear 1000ms linear forwards";

        },
        clearPlayField() {

            let children_play_field = Array.from(play_field.HTML.children);

            children_play_field.forEach(element => {
                if (element.id != "game_author") element.remove();;
            });

        },
        // player ------------------------------------------ //
        animationLosingFall() {
            player.ANIMATIONS.losing_fall();
        },
        // animation circle -------------------------------- //
        animationEndGame() {

            // 1. set default values for circle
            circle.HTML.style.backgroundColor = "#78C4D1";
            circle.HTML.style.zIndex = 1;

            // 2. create circle and insert circle
            play_field.HTML.prepend(circle.HTML);

            // 3. animation scale circle
            circle.scale();

        },
        // suggestion make an action ----------------------- //
        suggestionMakeAction() {
            setTimeout(() => {
                suggestion_make_action.ANIMATIONS.show();
            }, 1000);
        },
    },

};


// export ====================================================== //
export default components_of_algorithms;