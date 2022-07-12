
// import //
import { patterns_game_elements } from '../../../abstractions/game patterns/patterns_game_elements.js';

// game name class //
class GameName extends patterns_game_elements.GameElement {

    // public object methods //

    // constructor
    constructor({ ...group_objects_with_settings }) {
        super(group_objects_with_settings);
    }

}

// play field object //
const game_name = new GameName({

    HTML_SETTINGS: {

        ID_NAME: 'game_name',

        tag_name: 'div',
        class_name: 'main_title',
        start_styles: 'opacity: 0',
        html_value: 'Flappy Gosha',

    },

    DOM_TREE_SETTINGS: {

        presence_wrapper: true,
        involved_element: '#play_field',
        insert_command: 'prepend'

    },

    ANIMATIONS_SETTINGS: {

        ANIMATIONS: {

            get appear() {

                return game_name.createAnimation({

                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 0,
                            final_value: 1,
                            unit_of_measurement: '',
                        },

                    ],
                    changing_element: game_name.HTML_LINK,
                    duration: 1000,
                    timing_function: game_name.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                    next_function: function () {
                        game_name.endExecutionCurrentFunction();
                    }

                });

            },

            get disappear() {

                let game_name__wrapper = document.querySelector(`.${game_name.HTML_SETTINGS.ID_NAME}__wrapper`);

                return game_name.createAnimation({

                    
                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 1,
                            final_value: 0,
                            unit_of_measurement: '',
                        },

                    ],
                    changing_element: game_name.HTML_LINK,
                    duration: 1000,
                    timing_function: game_name.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                    next_function: function () {
                        game_name__wrapper.remove();
                    },

                });

            },

        },

    },

});

// export //
export { game_name };