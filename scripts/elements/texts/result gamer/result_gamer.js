
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
        class_name: 'result_gamer_text',
        start_styles: 'opacity: 0',
        attributes: [

            {
                name: 'disabled',
                value: ''
            },
            {
                name: 'value',
                value: 0
            }

        ],

    },

    DOM_TREE_SETTINGS: {

        involved_element: '.game_over_text__wrapper',
        insert_command: 'prepend'

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
                    timing_function: {
                        name: result_gamer.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                        coefficient: 1
                    },
                    changing_element: result_gamer.HTML_LINK,
                    duration: 1000,
                    synchronous: true,

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
                    timing_function: {
                        name: result_gamer.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                        coefficient: 1
                    },
                    changing_element: result_gamer.HTML_LINK,
                    duration: 500,
                    next_function: function () {
                        result_gamer.deleteHTML();
                    },

                });

            },

        }

    },

});

// export //
export { result_gamer };