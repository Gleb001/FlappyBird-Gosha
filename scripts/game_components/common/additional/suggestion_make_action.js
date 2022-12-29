
// imports ===================================================== //

// play field -------------------------------------------------- //
import play_field from "../main/play_field.js";

// utilities --------------------------------------------------- //
import createElementHTML from "../../../utility/work_with_html.js";
import { AnimationJS } from "../../../utility/work_with_animations.js";


// main ======================================================== //

// suggestion make an action ----------------------------------- //
const suggestion_make_action = {

    // inner value
    get inner_value() {

        if (window.screen.width > 1024) {
            return `
                <div class="suggestion_make_action">
                    <img
                        src="../../../../images/suggestion_make_action/click_mouse.svg"
                        alt="click"
                    >
                </div>
                <div class="suggestion_make_action">
                    <img
                        src="../../../../images/suggestion_make_action/button_space.svg"
                        alt="button space"
                    >
                </div>
            `;
        } else {
            return `
                <div class="suggestion_make_action">
                    <img
                        src="../../../../images/suggestion_make_action/click_arm.svg"
                        alt="tap"
                    >
                </div>
            `;
        }

    },

    ANIMATIONS: {
        show() {

            // 1. check play field class (status)
            if (!play_field.HTML.classList.contains(
                play_field.statuses.expection
            )) return;

            // 2. create and insert suggestion element
            let suggestion_element = createElementHTML({
                tag_name: "span",
                attributes: {
                    id: "suggestion_make_action__wrapper",
                    style: "left: -175px"
                },
                inner_value: suggestion_make_action.inner_value
            });
            play_field.HTML.prepend(suggestion_element);

            // 3. moving the element to the right
            new AnimationJS({
                changing_elements: [suggestion_element],
                changing_properties: [
                    {
                        name: "left",
                        unit_of_measurement: "px",
                        start_value: suggestion_element.offsetLeft,
                        end_value: 15,
                    },
                ],
                timing_settings: {
                    duration: 900,
                    timing_function: AnimationJS.TIMING_FUNCTIONS.bounce_end,
                },
            }).start();

            // 4. catching a player's action
            let id_interval = setInterval(() => {

                if (play_field.HTML.classList.contains(
                    play_field.statuses.expection
                )) return;

                clearInterval(id_interval);
                this.hide();

            }, 70);

        },
        hide() {

            // 1. get suggestion element
            let suggestion_element = document.getElementById(
                "suggestion_make_action__wrapper"
            );

            // 2. hide suggestion element
            if (suggestion_element) {
                new AnimationJS({
                    changing_elements: [suggestion_element],
                    changing_properties: [
                        {
                            name: "left",
                            unit_of_measurement: "px",
                            start_value: suggestion_element.offsetLeft,
                            end_value: -suggestion_element.offsetWidth,
                        },
                    ],
                    timing_settings: {
                        duration: 500,
                        timing_function: AnimationJS.TIMING_FUNCTIONS.bounce_start,
                    },
                    next_function: () => {
                        suggestion_element.remove();
                    }
                }).start();
            }

        },
    },

};


// export ====================================================== //
export default suggestion_make_action;