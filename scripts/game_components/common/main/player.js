
// import ====================================================== //

// utility ----------------------------------------------------- //
import obstacle_settings from "./obstacle.js";
import createElementHTML from "../../../utility/work_with_html.js";
import { AnimationCSS, AnimationJS } from "../../../utility/work_with_animations.js";

// elements ---------------------------------------------------- //
import play_field from "./play_field.js";
import miniSyncEngine from "../../../utility/miniSyncEngine.js";


// main ======================================================== //
const player = {

    // html ---------------------------------------------------- //
    HTML: createElementHTML({
        tag_name: "div",
        attributes: { id: "player" }
    }),

    // animations ---------------------------------------------- //
    ANIMATIONS: {

        // durations
        durations: {
            // fly
            get fly() {
                return obstacle_settings.duration_moving / 15;
            },
            // fall
            get fall() {
                return obstacle_settings.duration_moving / 2.25;
            },
        },

        // fall
        get fall() {

            player.HTML.className = player.statuses.fall;

            return new AnimationJS({
                changing_elements: [player.HTML],
                changing_properties: [
                    {
                        name: 'top',
                        unit_of_measurement: 'px',
                        start_value: player.HTML.offsetTop,
                        end_value: play_field.HTML.offsetHeight - player.HTML.offsetHeight,
                    },
                ],
                timing_settings: {
                    timing_function: AnimationJS.TIMING_FUNCTIONS.linear,
                    duration: this.durations.fall
                },
            });

        },

        // fly
        get fly() {

            if (!player.HTML.classList.contains(player.statuses.fall)) return null;

            player.ANIMATIONS.fall.end();
            player.HTML.className = player.statuses.fly;

            return new AnimationJS({
                changing_elements: [player.HTML],
                changing_properties: [
                    {
                        name: 'top',
                        unit_of_measurement: 'px',
                        start_value: player.HTML.offsetTop,
                        end_value: player.HTML.offsetTop - player.HTML.offsetHeight,
                    },
                ],
                timing_settings: {
                    timing_function: AnimationJS.TIMING_FUNCTIONS.linear,
                    duration: this.durations.fly
                },
                next_function: function () {
                    player.ANIMATIONS.fall.start();
                },
            });

        },

        // losing fall
        losing_fall() {

            player.HTML.className = player.statuses.losing_fall;

            let duration_losing_fall = 450;
            miniSyncEngine.executionDelay(
                () => {
                    new AnimationJS({
                        changing_elements: [player.HTML],
                        changing_properties: [
                            {
                                name: 'transform',
                                unit_of_measurement: 'deg',
                                start_value: 0,
                                end_value: 360,
                                function_value: 'rotate',
                            },
                        ],
                        timing_settings: {
                            timing_function: AnimationJS.TIMING_FUNCTIONS.linear,
                            duration: duration_losing_fall
                        },
                    }).start();
                },
                duration_losing_fall
            );

        }

    },

    // statuses ------------------------------------------------ //
    statuses: {
        fly: 'player_fly',
        fall: 'player_fall',
        losing_fall: 'losing_fall',
    },

    // size ---------------------------------------------------- //
    get size() {

        // 1. get size window
        let window_width = window.screen.width;
        let height_window = window.screen.height;

        // 2. get check size
        let check_size = window_width;
        if (window_width < height_window) check_size = height_window;

        // 3. get devide value
        let devide_value = 20;
        if (window_width < 1300) devide_value = 17.5;
        if (window_width < 1024) devide_value = 13;

        // 3. return size
        return check_size / devide_value;

    },

    // start deamonstration flight ----------------------------- //
    show() {

        // 1. set size player
        this.HTML.style.width = this.size + "px";
        this.HTML.style.height = this.size + "px";

        // 2. player fall
        player.ANIMATIONS.fall.start();

        // 3. move right player
        new AnimationCSS({
            name_animation: "move_right_player",
            changing_elements: [player.HTML],
            timing_settings: {
                timing_function: "linear",
                duration: 2000,
            },
            changing_properties: [
                {
                    name: "left",
                    unit_of_measurement: "px",
                    start_value: player.HTML.offsetLeft,
                    end_value: (play_field.HTML.offsetWidth / 2 -
                        player.HTML.offsetWidth / 2)
                },
            ],
        }).start();

        // 4. start demostration flight
        let demonstration_flight = setInterval(

            function () {

                // 2.1 check presence player and current status play_field
                if (
                    !player.HTML ||
                    !play_field.HTML.classList.contains(play_field.statuses.expection)
                ) return clearInterval(demonstration_flight);

                // 2.2 check player >= center play field -> player.fly()
                let center_of_the_play_field = window.screen.availHeight / 2 - 70;
                if (player.HTML.offsetTop >= center_of_the_play_field) {
                    let animation_fly = player.ANIMATIONS.fly;
                    if (animation_fly) animation_fly.start();
                }

            }, player.ANIMATIONS.durations.fly + 75

        );

    },

};


// export ====================================================== //
export default player;