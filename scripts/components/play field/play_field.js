
// import //
import { patterns_game_elements } from "../../abstractions/game patterns/patterns_game_elements.js";

// play field class //
class PlayField extends patterns_game_elements.GameComponent {

    // public object properies //
    // with default values //
    statuses = {

        introduction_game: {

            class: 'js-play_field__introduction',
            html:
                `
                <span id="game_author" class="main_under_title">
                    © Lichagin Gleb
                </span>
            `

        },

        expection_prepare_game: {
            class: 'js-play_field__expection_prepare_game',
        },

        expection_process_game: {
            class: 'js-play_field__expection_process_game'
        },

        prepare_game: {
            class: 'js-play_field__prepare_game',
        },

        process_game: {
            class: 'js-play_field__process_game',
        },

        game_over: {
            class: 'js-play_field__game_over',
        },

    };

    // public object methods //

    // constructor
    constructor({ ...group_objects_with_settings }) {
        super(group_objects_with_settings);
    };

    // change
    changeCursorDependingOnClassPlayField() {

        let expection_classes = [
            play_field.statuses.expection_prepare_game.class,
            play_field.statuses.expection_process_game.class,
            play_field.statuses.process_game.class
        ];

        for (
            let index = expection_classes.length - 1;
            index >= 0;
            index--
        ) {

            let expection_class = expection_classes[index];

            if (play_field.HTML_LINK.classList.contains(expection_class)) {
                play_field.HTML_LINK.parentElement.style.cursor = 'pointer';
                return;
            }

            play_field.HTML_LINK.parentElement.style.cursor = 'auto';

        }

    };

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
                    timing_function: {
                        name: play_field.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.ease_out,
                        coefficient: 1
                    },
                    changing_element: play_field__wrapper,
                    duration: 400,
                    synchronous: true

                });

            },

        }

    },

});

// export //
export { play_field };