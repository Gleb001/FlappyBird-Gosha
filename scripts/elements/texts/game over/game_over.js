
// import //
import { patterns_game_elements } from '../../../abstractions/game patterns/patterns_game_elements.js';

// game name class //
class GameOver extends patterns_game_elements.GameElement {

    // constructor //
    constructor({ ...group_objects_with_settings }) {
        super(group_objects_with_settings);
    }

}

// play field object //
const game_over = new GameOver({

    HTML_SETTINGS: {

        ID_NAME: 'game_over',

        tag_name: 'div',
        class_name: 'main_title',
        start_styles: 'opacity: 0',
        html_value: 'Game over',

    },

    DOM_TREE_SETTINGS: {

        presence_wrapper: true,
        involved_element: '#play_field',
        insert_command: 'prepend'

    },

    ANIMATIONS_SETTINGS: {

        ANIMATIONS: {

            get appear() {

                return game_over.createAnimation({

                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 0,
                            final_value: 1,
                            unit_of_measurement: '',
                        },

                    ],
                    changing_element: game_over.HTML_LINK,
                    duration: 500,
                    timing_function: game_over.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                    next_function: function () {
                        game_over.endExecutionCurrentFunction();
                    }

                });

            },

            get disappear() {

                let game_over__wrapper = document.querySelector(`.${game_over.HTML_SETTINGS.ID_NAME}__wrapper`);

                return game_over.createAnimation({

                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 1,
                            final_value: 0,
                            unit_of_measurement: '',
                        },

                    ],
                    changing_element: game_over.HTML_LINK,
                    duration: 500,
                    timing_function: game_over.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                    next_function: function () {
                        game_over__wrapper.remove();
                    },

                });

            },

        }

    },

});

// export
export { game_over };