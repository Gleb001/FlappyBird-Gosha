
// import //
import { patterns_game_elements } from '../../../abstractions/game patterns/patterns_game_elements.js';
import { obstacles_administrator } from '../../../components/obstacle/obstacle.js';

// game name class //
class ResultGamer extends patterns_game_elements.GameElement {

    // public object methods //

    // constructor
    constructor({ ...group_objects_with_settings }) {
        super(group_objects_with_settings);
    }

}

// play field object //
const result_gamer = new ResultGamer({

    HTML_SETTINGS: {

        ID_NAME: 'result_gamer',

        tag_name: 'input',
        class_name: 'main_text',
        start_styles: 'opacity: 0',
        attributes: [
            ['disabled', ''],
            ['value', 0]
        ],

    },

    DOM_TREE_SETTINGS: {

        involved_element: '#game_over',
        insert_command: 'append'

    },

    ANIMATIONS_SETTINGS: {

        ANIMATIONS: {

            get appear() {

                result_gamer.HTML_LINK.value = obstacles_administrator.number_current_obstacle - 1;

                return result_gamer.createAnimation({

                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 0,
                            final_value: 1,
                            unit_of_measurement: '',
                        },

                    ],
                    changing_element: result_gamer.HTML_LINK,
                    duration: 500,
                    timing_function: result_gamer.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                    next_function: function () {
                        result_gamer.endExecutionCurrentFunction();
                    }

                });

            },

            get disappear() {

                return result_gamer.createAnimation({

                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 1,
                            final_value: 0,
                            unit_of_measurement: '',
                        },

                    ],
                    changing_element: result_gamer.HTML_LINK,
                    duration: 500,
                    timing_function: result_gamer.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                    next_function: function () {

                        result_gamer.delete();
                        result_gamer.endExecutionCurrentFunction();

                    },

                });

            },

        }

    },

});

// export //
export { result_gamer };