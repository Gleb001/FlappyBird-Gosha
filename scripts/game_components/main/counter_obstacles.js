
// imports ===================================================== //

// utilities --------------------------------------------------- //
import createElementHTML from "../../utility/work_with_html.js";

// components -------------------------------------------------- //
import play_field from "./play_field.js";


// main ======================================================== //
const counter_obstacles = {

    // current obstacle ---------------------------------------- //
    current_obstacle: null,
    score_player: 0,

    // html ---------------------------------------------------- //
    HTML: createElementHTML({
        tag_name: "input",
        attributes: {
            id: "counter_obstacles",
            class: "counter_obstacles_text",
            disabled: "",
            value: 0,
        },
    }),

    // position relative to the right corner ------------------- //
    get position_right() {

        let width_window = window.screen.width;

        if (width_window > 1600) return 57;
        if (width_window > 1200) return 47;
        return 28;

    },

    // start counting ------------------------------------------ //
    start() {

        // 1. get score and player
        this.score_player = 0;
        let player_element = document.getElementById("player");

        new Promise((resolve) => {

            // 2. wait first obstacle
            let wait_current_obstacle = setInterval(() => {

                // 2.1 get first obstacle
                this.current_obstacle = document.querySelector(".obstacle");

                // 2.2 check current obstacle
                if (this.current_obstacle) {
                    clearInterval(wait_current_obstacle);
                    resolve();
                };

            }, 30);

        }).then(() => {

            // 3. start update counter obstacles
            let id_interval = setInterval(() => {

                // 3.1 check class play_field
                if (
                    !play_field.HTML.classList.contains(
                        play_field.statuses.process_game
                    ) ||
                    !this.current_obstacle
                ) clearInterval(id_interval);

                // 3.2 update counter value and change current_obstacle
                if (
                    player_element.offsetLeft > (
                        this.current_obstacle.offsetLeft +
                        this.current_obstacle.offsetWidth
                    )
                ) {
                    this.HTML.value = ++ this.score_player;
                    this.current_obstacle = this.current_obstacle.nextElementSibling;
                }

            }, 30);

        });

    },

};


// exports ===================================================== //
export default counter_obstacles;