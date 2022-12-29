
// import ====================================================== //

// utilities --------------------------------------------------- //
import miniSyncEngine from "../../utility/miniSyncEngine.js";
import createElementHTML from "../../utility/work_with_html.js";
import { AnimationJS } from "../../utility/work_with_animations.js";


// main ======================================================== //
const circle = {

    // html ---------------------------------------------------- //
    HTML: createElementHTML({ attributes: { id: "circle" } }),

    // scale --------------------------------------------------- //
    scale() {

        // 1. set default values for circle
        this.HTML.style.height = 0;
        this.HTML.style.width = 0;

        // 2. get play field and 
        let play_field = document.getElementById("play_field");

        // 3. get spec values
        let center_play_field = play_field.offsetWidth / 2;
        let circle_filal_value = this.final_value_scale;
        
        // 4. animation scale
        miniSyncEngine.executionDelay(
            () => {
                new AnimationJS({
                    changing_elements: [ this.HTML ],
                    changing_properties: [
                        {
                            name: 'left',
                            unit_of_measurement: 'px',
                            start_value: center_play_field,
                            end_value: center_play_field - (circle_filal_value / 2),
                        },
                        {
                            name: 'width',
                            unit_of_measurement: 'px',
                            start_value: 0,
                            end_value: circle_filal_value,
                        },
                        {
                            name: 'height',
                            unit_of_measurement: 'px',
                            start_value: 0,
                            end_value: circle_filal_value,
                        },
                    ],
                    timing_settings: {
                        timing_function: AnimationJS.TIMING_FUNCTIONS.ease_in,
                        duration: circle.duration_scale,
                    },
                    next_function: function () {
                        play_field.style.backgroundColor = circle.HTML.style.backgroundColor;
                        setTimeout(() => circle.HTML.remove(), 5);
                    }
                }).start();
            },
            circle.duration_scale
        );

    },

    // duration ------------------------------------------------ //
    get duration_scale() {
        if (window.screen.availWidth > 1600) return 1000;
        if (window.screen.availWidth > 1000) return 850;
        if (window.screen.availWidth > 600) return 600;
        return 800;
    },

    // final value scale --------------------------------------- //
    get final_value_scale() {

        let play_field = document.getElementById('play_field');
        let increasing_coefficient = 2;

        if (play_field.offsetHeight > play_field.offsetWidth) {
            return play_field.offsetHeight * increasing_coefficient;
        } else {
            return play_field.offsetWidth * increasing_coefficient;
        }

    },

}


// export ====================================================== //
export default circle;