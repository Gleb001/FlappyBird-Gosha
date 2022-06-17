
// import //
import { collector_animations } from '../../../abstractions/game animations/collector_animations.js';
import { collector_pattern_html_elements } from '../../../abstractions/game patterns/collector_pattern_html_elements.js';

// introduction message class //
class IntroductionMessage extends collector_pattern_html_elements.GameElement {

    // public methods for external interaction (object) //

    // constructor
    constructor({
        teg_value,
        id_name,
        class_name,
        html_value,

        presence_wrapper,
        involved_element,
        insert_command
    }) {

        super({
            teg_value,
            id_name,
            class_name,
            html_value,

            presence_wrapper,
            involved_element,
            insert_command
        });

    }

    // initialisation
    initialisation() {

        this.create();
        this.HTML_LINK.style.opacity = 0;
        
        this.endExecutionCurrentFunction();

    }

    // prepare
    setIntroductionMessage({ parts_message }) {
        this._parts_message = parts_message;
        this._number_current_message = 0;
    }

    // show
    show() {

        this.setHTML_VALUE(
            this._parts_message[this._number_current_message]
        );

        collector_animations.transparency.start({
            execution_command: collector_animations.transparency.COLLECTOR_COMMANDS.appear.name,
            involved_elements: [introduction_message.HTML_LINK],
            duration_animation: 750,
            next_function: function () {

                setTimeout(
                    function() {
                        introduction_message.hide();
                    }, 100
                );

            },

        });

    }

    // hide
    hide() {

        collector_animations.transparency.start({

            execution_command: collector_animations.transparency.COLLECTOR_COMMANDS.disappear.name,
            involved_elements: [introduction_message.HTML_LINK],
            duration_animation: 750,
            next_function: function () {

                if (introduction_message._number_current_message == introduction_message._parts_message.length - 1) {
                    introduction_message.delete();
                    introduction_message.endExecutionCurrentFunction();
                } else {
                    introduction_message._number_current_message++;
                    introduction_message.show();
                }

            }

        });

    }

};

// introduction message object //
const introduction_message = new IntroductionMessage({

    teg_value: 'span',
    id_name: 'introduction_message',
    class_name: 'main_title',
    html_value: null,

    presence_wrapper: false,
    involved_element: '#play_field',
    insert_command: 'prepend'

});

// export //
export { introduction_message };