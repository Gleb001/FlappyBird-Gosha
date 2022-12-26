
// import //
import { GameElement } from '../../../abstractions/game patterns/patterns_game_elements.js';

// introduction message class //
class IntroductionMessage {

    // public object methods //

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
const introduction_message = new GameElement({

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

            appear() {

                introduction_message.setHtmlValue(
                    introduction_message._parts_message[introduction_message._number_current_message]
                );

                introduction_message.createAnimationCSS({
                    name_animation: "appear",
                    changing_element: introduction_message.HTML_LINK,
                    timing_settings: {
                        timing_function: "linear",
                        duration: introduction_message.duration_of_reading_message / 1000,
                        synchronous: true
                    },
                    property_settings: {
                        name_property: "opacity",
                        unit_of_measurement: "",
                        start_value: 0,
                        end_value: 1
                    },
                    next_function: function () {
                        introduction_message.ANIMATIONS_SETTINGS.ANIMATIONS.disappear();
                    }
                });

            },

            disappear() {

                introduction_message.createAnimationCSS({
                    name_animation: "disappear",
                    changing_element: introduction_message.HTML_LINK,
                    timing_settings: {
                        timing_function: "linear",
                        duration: introduction_message.duration_of_reading_message / 1000,
                        synchronous: true
                    },
                    property_settings: {
                        name_property: "opacity",
                        unit_of_measurement: "",
                        start_value: 1,
                        end_value: 0
                    },
                    next_function: function () {

                        if (
                            introduction_message._number_current_message == 
                            introduction_message._parts_message.length - 1
                        ) {
                            introduction_message.deleteHTML();
                        } else {
                            introduction_message._number_current_message++;
                            introduction_message.ANIMATIONS_SETTINGS.ANIMATIONS.appear();
                        }

                    }
                });

            },

        }

    },

});

// export //
export { introduction_message };