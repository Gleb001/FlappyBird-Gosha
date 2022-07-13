
// import //
import { patterns_game_elements } from '../../../abstractions/game patterns/patterns_game_elements.js';

// circle class //
class Circle extends patterns_game_elements.GameElement {

    // public object methods //

    // constructor
    constructor({ ...group_objects_with_settings }) {
        super(group_objects_with_settings);
    }

    // getter
    get background_color() {

        let play_field = document.getElementById('play_field');

        if (play_field.classList.contains(
            'js-play_field__expection_process_game'
        )) {
            return 'white';
        }

        if (play_field.classList.contains(
            'js-play_field__game_over'
        )) {
            return '#78C4D1';
        }

    }

    get duration_scale() {

        if (window.screen.availWidth > 1600) return 700;

        if (window.screen.availWidth > 1000) return 650;

        if (window.screen.availWidth > 600) return 600;

        return 800;

    }

    get final_value_scale() {

        let play_field = document.getElementById('play_field');
        let increasing_coefficient = 1.7

        if (play_field.offsetHeight > play_field.offsetWidth) {
            return play_field.offsetHeight * increasing_coefficient;
        } else {
            return play_field.offsetWidth * increasing_coefficient;
        }

    }

}

// circle object //
const circle = new Circle({

    HTML_SETTINGS: {

        ID_NAME: 'circle',

        tag_name: 'div',

    },

    DOM_TREE_SETTINGS: {

        involved_element: '#play_field',
        insert_command: 'prepend'

    },

    ANIMATIONS_SETTINGS: {

        ANIMATIONS: {

            get scale() {

                let play_field = document.getElementById('play_field');

                circle.HTML_LINK.style.backgroundColor = circle.background_color;

                return circle.createAnimation({

                    changing_properties: [

                        {
                            name: 'width',
                            start_value: 0,
                            final_value: circle.final_value_scale,
                            unit_of_measurement: 'px',
                        },
                        {
                            name: 'height',
                            start_value: 0,
                            final_value: circle.final_value_scale,
                            unit_of_measurement: 'px',
                        },
                        {
                            name: 'left',
                            start_value: play_field.offsetWidth / 2,
                            final_value: play_field.offsetWidth / 2 + (-circle.final_value_scale / 2),
                            unit_of_measurement: 'px',
                        },


                    ],
                    changing_element: circle.HTML_LINK,
                    duration: circle.duration_scale,
                    timing_function: circle.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.ease_in,
                    next_function: function () {

                        play_field.style.backgroundColor = circle.background_color;

                        setTimeout(
                            function () {
                                circle.deleteHTML();
                            },
                            100
                        );

                        circle.endExecutionCurrentFunction();

                    },

                });

            },

        }

    },

});

// export //
export { circle };