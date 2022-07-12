
// import //
import { patterns_game_elements } from '../../../abstractions/game patterns/patterns_game_elements.js';

// introduction message class //
class IntroductionMessage extends patterns_game_elements.GameElement {

    // public object methods //

    // constructor
    constructor({ ...group_objects_with_settings }) {
        super(group_objects_with_settings);
    }

    // setter
    setIntroductionMessage(...parts_message) {
        this._parts_message = parts_message;
        this._number_current_message = 0;
    }

    // getter
    get duration_of_reading_message() {

        let message = this._parts_message[this._number_current_message];
        let duration_read_letter = 40;
        let number_letter_in_the_message = message.length;

        return duration_read_letter * number_letter_in_the_message

    }

};

// introduction message object //
const introduction_message = new IntroductionMessage({

    HTML_SETTINGS: {

        ID_NAME: 'introduction_message',

        tag_name: 'span',
        class_name: 'main_title',
        start_styles: 'opacity: 0',

    },

    DOM_TREE_SETTINGS: {

        involved_element: '#play_field',
        insert_command: 'prepend'

    },

    ANIMATIONS_SETTINGS: {

        ANIMATIONS: {

            get appear() {

                introduction_message.setHtmlValue(
                    introduction_message._parts_message[introduction_message._number_current_message]
                );

                return introduction_message.createAnimation({

                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 0,
                            final_value: 1,
                            unit_of_measurement: '',
                        },

                    ],
                    changing_element: introduction_message.HTML_LINK,
                    duration: introduction_message.duration_of_reading_message,
                    timing_function: introduction_message.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                    next_function: function () {

                        setTimeout(
                            function () {
                                introduction_message.ANIMATIONS_SETTINGS.ANIMATIONS.disappear.start();
                            }, 100
                        );

                    },

                });

            },

            get disappear() {

                return introduction_message.createAnimation({

                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 1,
                            final_value: 0,
                            unit_of_measurement: '',
                        },

                    ],
                    changing_element: introduction_message.HTML_LINK,
                    duration: introduction_message.duration_of_reading_message,
                    timing_function: introduction_message.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                    next_function: function () {

                        if (introduction_message._number_current_message == introduction_message._parts_message.length - 1) {
                            introduction_message.deleteHTML();
                            introduction_message.endExecutionCurrentFunction();
                        } else {
                            introduction_message._number_current_message++;
                            introduction_message.ANIMATIONS_SETTINGS.ANIMATIONS.appear.start();
                        }

                    },

                });

            },

        }

    },

});

// export //
export { introduction_message };