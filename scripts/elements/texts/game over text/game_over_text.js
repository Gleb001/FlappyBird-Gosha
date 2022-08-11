
// import //
import { patterns_game_elements } from '../../../abstractions/game patterns/patterns_game_elements.js';

// game name class //
class GameOver extends patterns_game_elements.GameElement {

    // public object methods //

    // constructor
    constructor({ ...group_objects_with_settings }) {
        super(group_objects_with_settings);
    }

}


// play field object //
const game_over_text = new GameOver({

    HTML_SETTINGS: {

        ID_NAME: 'game_over_text',

        tag_name: 'div',
        class_name: 'main_title',
        start_styles: 'opacity: 0',
        html_value: 'your score',

    },

    DOM_TREE_SETTINGS: {

        presence_wrapper: true,
        involved_element: '#play_field',
        insert_command: 'prepend'

    },

    ANIMATIONS_SETTINGS: {

        ANIMATIONS: {

            get appear() {

                return game_over_text.createAnimation({

                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 0,
                            final_value: 1,
                            unit_of_measurement: '',
                        },

                    ],
                    timing_function: {
                        name: game_over_text.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                        coefficient: 1
                    },
                    changing_element: game_over_text.HTML_LINK,
                    duration: 1000,
                    synchronous: true,

                });

            },

            get disappear() {

                if(!game_over_text.HTML_LINK) return;

                let game_over_text__wrapper = document.querySelector(`.${game_over_text.HTML_SETTINGS.ID_NAME}__wrapper`);

                return game_over_text.createAnimation({

                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 1,
                            final_value: 0,
                            unit_of_measurement: '',
                        },

                    ],
                    timing_function: {
                        name: game_over_text.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                        coefficient: 1
                    },
                    changing_element: game_over_text.HTML_LINK,
                    duration: 500,
                    next_function: function () {

                        if (!game_over_text__wrapper) return;

                        game_over_text__wrapper.remove();

                    },

                });

            },

        }

    },

});

// export
export { game_over_text };