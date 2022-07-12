
// import //
import { patterns_game_elements } from "../../abstractions/game patterns/patterns_game_elements.js";

import {player} from '../player/player.js'

// play field class //
class PlayField extends patterns_game_elements.GameComponent {

    // public object properies //
    // with default values //
    statuses = {

        introduction: {

            classes: [
                'js-play_field__introduction'
            ],
            html:
                `
                <span id="game_author" class="main_under_title">
                    © Lichagin Gleb
                </span>
            `

        },

        expection: {
            classes: [
                'js-play_field__expection'
            ],
        },

        prepare_game: {
            classes: [
                'js-play_field__prepare'
            ],
        },

        expection_process_game: {
            classes: [
                'js-play_field__expection_process_game',
            ],
        },

        prepare_game: {
            classes: [
                'js-play_field__expection_process_game'
            ],
        },

        process_game: {
            classes: [
                'js-play_field__process_game'
            ],
        },

        game_over: {
            classes: [
                'js-play_field__game_over'
            ],
        },

    };

    // public object methods //

    // constructor
    constructor({ ...group_objects_with_settings }) {
        super(group_objects_with_settings);
    }

    // getter
    get narrowing_value() {

        if (window.screen.availWidth > 1600) return 20;

        if (window.screen.availWidth > 1000) return 25;

        return 0;

    };

};

// play field object //
const play_field = new PlayField({

    HTML_SETTINGS: {

        ID_NAME: 'play_field',

        tag_name: 'section',
        html_value:
            `
            <span id="game_author" class="main_under_title">
                © Lichagin Gleb
            </span>
        `,

    },

    DOM_TREE_SETTINGS: {

        presence_wrapper: true,
        involved_element: 'body',
        insert_command: 'prepend'

    },

    ANIMATIONS_SETTINGS: {

        ANIMATIONS: {

            get narrowing() {

                let play_field__wrapper = document.querySelector(
                    `.${play_field.HTML_SETTINGS.ID_NAME}__wrapper`
                );

                return play_field.createAnimation({

                    changing_properties: [

                        {
                            name: 'width',
                            start_value: 100,
                            final_value: 100 - play_field.narrowing_value,
                            unit_of_measurement: 'vw',
                        },

                    ],
                    changing_element: play_field__wrapper,
                    duration: 400,
                    timing_function: play_field.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.ease_out,
                    next_function: function () {
                        play_field.endExecutionCurrentFunction();
                    }

                });

            },

        }

    },

});

// export //
export { play_field };