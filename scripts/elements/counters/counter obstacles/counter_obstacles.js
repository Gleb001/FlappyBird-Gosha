
// import //
import { patterns_game_elements } from '../../../abstractions/game patterns/patterns_game_elements.js';

import { obstacles_administrator } from '../../../components/obstacle/obstacle.js';

// counter obstacles class //
class counterObstacles extends patterns_game_elements.GameElement {

    // constructor //
    constructor({ ...group_objects_with_settings }) {
        super(group_objects_with_settings);
    }

    // start
    start() {

        let play_field = document.getElementById('play_field');

        let end_counting = setInterval(

            function () {

                counter_obstacles.HTML_LINK.value = obstacles_administrator.number_current_obstacle - 1;
                
                if (play_field.classList.contains('js-play_field__game_over')) {
                    clearInterval(end_counting);
                }

            }, 10

        );
    }

}

// counter ostacles object //
const counter_obstacles = new counterObstacles({

    HTML_SETTINGS: {

        ID_NAME: 'counter_obstacles',

        tag_name: 'input',
        class_name: 'counter_obstacles_text',
        start_styles: `top: -100px`,
        attributes: [

            {
                name: 'disabled',
                value: ''
            },
            {
                name: 'value',
                value: '0'
            }

        ]

    },

    DOM_TREE_SETTINGS: {

        involved_element: '#play_field',
        insert_command: 'prepend'

    },

    ANIMATIONS_SETTINGS: {

        ANIMATIONS: {

            get move_down() {

                return counter_obstacles.createAnimation({

                    changing_properties: [

                        {
                            name: 'top',
                            start_value: counter_obstacles.HTML_LINK.offsetTop,
                            final_value: 0,
                            unit_of_measurement: 'px',
                        }

                    ],
                    changing_element: counter_obstacles.HTML_LINK,
                    duration: 300,
                    timing_function: counter_obstacles.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                    next_function: function () {
                        counter_obstacles.endExecutionCurrentFunction();
                    }

                });

            },

        }

    },

});

// export //
export { counter_obstacles };